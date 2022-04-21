import User from 'models/User';

describe('test model', () => {
  it('should return the table name', async () => {
    expect(User.tableName).toBe('users');
  });
});
