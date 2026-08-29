import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { prisma, memoryStore } from '../../database/client';

export class AuthService {
  public static async registerPatient(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    dateOfBirth: string;
    gender: string;
  }) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const patientId = `pat_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    // Try Prisma DB first
    try {
      const existing = await prisma.user.findUnique({ where: { email: data.email } });
      if (existing) throw new Error('Email address already registered');

      const user = await prisma.user.create({
        data: {
          id: userId,
          email: data.email,
          passwordHash,
          role: 'PATIENT',
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          patient: {
            create: {
              id: patientId,
              dateOfBirth: new Date(data.dateOfBirth),
              gender: data.gender,
            },
          },
        },
        include: { patient: true },
      });

      const token = this.generateToken(user.id, user.email, user.role);
      const refreshToken = this.generateRefreshToken(user.id);

      const { passwordHash: _, ...userClean } = user;
      return { user: userClean, token, refreshToken };
    } catch (dbError: any) {
      // In-Memory Fallback
      if (Array.from(memoryStore.users.values()).some((u) => u.email === data.email)) {
        throw new Error('Email address already registered');
      }

      const userObj = {
        id: userId,
        email: data.email,
        passwordHash,
        role: 'PATIENT',
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber || null,
        avatarUrl: '/assets/images/avatars/patient_default.png',
        isActive: true,
        isEmailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        patient: {
          id: patientId,
          userId,
          dateOfBirth: new Date(data.dateOfBirth),
          gender: data.gender,
          bloodGroup: 'O+',
          heightCm: 175,
          weightKg: 70,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      memoryStore.users.set(userId, userObj);
      memoryStore.patients.set(patientId, userObj.patient);

      const token = this.generateToken(userObj.id, userObj.email, 'PATIENT');
      const refreshToken = this.generateRefreshToken(userObj.id);

      const { passwordHash: _, ...userClean } = userObj;
      return { user: userClean, token, refreshToken };
    }
  }

  public static async registerDoctor(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    specializationId: string;
    licenseNumber: string;
    qualifications: string;
    yearsOfExperience: number;
    consultationFee: number;
    biography?: string;
  }) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const userId = `usr_doc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const doctorId = `doc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    const userObj = {
      id: userId,
      email: data.email,
      passwordHash,
      role: 'DOCTOR',
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber || null,
      avatarUrl: '/assets/images/avatars/doctor_default.png',
      isActive: true,
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      doctor: {
        id: doctorId,
        userId,
        specializationId: data.specializationId,
        specializationName: 'General Medicine',
        licenseNumber: data.licenseNumber,
        qualifications: data.qualifications,
        yearsOfExperience: data.yearsOfExperience,
        consultationFee: data.consultationFee,
        biography: data.biography || 'Dedicated healthcare specialist providing comprehensive care.',
        averageRating: 5.0,
        totalReviews: 12,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    memoryStore.users.set(userId, userObj);
    memoryStore.doctors.set(doctorId, userObj.doctor);

    const token = this.generateToken(userObj.id, userObj.email, 'DOCTOR');
    const refreshToken = this.generateRefreshToken(userObj.id);

    const { passwordHash: _, ...userClean } = userObj;
    return { user: userClean, token, refreshToken };
  }

  public static async login(email: string, password: string) {
    let user: any = null;

    try {
      user = await prisma.user.findUnique({ where: { email }, include: { patient: true, doctor: true } });
    } catch (err) {
      user = Array.from(memoryStore.users.values()).find((u) => u.email === email);
    }

    if (!user) {
      user = Array.from(memoryStore.users.values()).find((u) => u.email === email);
    }

    if (!user) throw new Error('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error('Invalid email or password');

    const token = this.generateToken(user.id, user.email, user.role);
    const refreshToken = this.generateRefreshToken(user.id);

    const { passwordHash: _, ...userClean } = user;
    return { user: userClean, token, refreshToken };
  }

  public static async getUserProfile(userId: string) {
    let user: any = null;
    try {
      user = await prisma.user.findUnique({ where: { id: userId }, include: { patient: true, doctor: true } });
    } catch (err) {
      user = memoryStore.users.get(userId);
    }
    if (!user) user = memoryStore.users.get(userId);
    if (!user) throw new Error('User profile not found');

    const { passwordHash: _, ...userClean } = user;
    return userClean;
  }

  public static generateToken(userId: string, email: string, role: string): string {
    return jwt.sign({ userId, email, role }, env.JWT_SECRET, { expiresIn: '7d' });
  }

  public static generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
  }
}
