import {
  calculateTokenLocation,
  isSafePosition,
  getGridCoordinates,
} from '../../../shared/src/utils/boardUtils.js';

describe('TEST SUITE 3: Board Utility & Track Math', () => {
  test('Correctly identifies safe star positions on main track', () => {
    expect(isSafePosition(1)).toBe(true);
    expect(isSafePosition(9)).toBe(true);
    expect(isSafePosition(14)).toBe(true);
    expect(isSafePosition(2)).toBe(false);
  });

  test('Calculates token location for RED player step counts', () => {
    expect(calculateTokenLocation('RED', 0)).toEqual({ status: 'BASE', position: 0 });
    expect(calculateTokenLocation('RED', 1)).toEqual({ status: 'ACTIVE', position: 1 });
    expect(calculateTokenLocation('RED', 53)).toEqual({ status: 'HOME_PATH', position: 0 });
    expect(calculateTokenLocation('RED', 57)).toEqual({ status: 'HOME', position: 5 });
  });

  test('Maps grid coordinates correctly for rendering engine', () => {
    const baseCoords = getGridCoordinates('RED', 'BASE', 0, 0);
    expect(baseCoords).toHaveProperty('x');
    expect(baseCoords).toHaveProperty('y');

    const homeCoords = getGridCoordinates('RED', 'HOME', 5);
    expect(homeCoords).toEqual({ x: 7, y: 7 });
  });
});
