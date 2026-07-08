import { getProfileUserData } from '../src/hooks/useProfile';

describe('getProfileUserData', () => {
  it('uses the stored username when available', () => {
    expect(
      getProfileUserData({ userName: 'Alice', email: 'alice@example.com' })
    ).toEqual({
      name: 'Alice',
      email: 'alice@example.com',
    });
  });

  it('falls back to alternative name fields for older saved data', () => {
    expect(
      getProfileUserData({ name: 'Bob', email: 'bob@example.com' })
    ).toEqual({
      name: 'Bob',
      email: 'bob@example.com',
    });
  });
});
