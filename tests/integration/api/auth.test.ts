import request from 'supertest';
import { createApp } from '../../../server/src/app.js';

describe('TEST SUITE 4: REST API Integration Endpoints', () => {
  const app = createApp();

  test('GET /health returns 200 OK and status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('timestamp');
  });

  test('GET /api/v1/leaderboard/global returns empty or initial rankings', async () => {
    const res = await request(app).get('/api/v1/leaderboard/global');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
