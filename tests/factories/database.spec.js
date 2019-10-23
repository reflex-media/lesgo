import User from 'Models/User';

describe('test model', () => {
  it('should be able to execute a query', async () => {
    await User.findOne().then(user => {
      expect(user.name).not.toBe('');
      expect(user.email).not.toBe('');
      expect(user.email_verified_at).not.toBe('');
      expect(user.remember_token).not.toBe('');
      expect(user.created_at).not.toBe('');
      expect(user.updated_at).not.toBe('');
    });
  });
});

afterAll(() => {
  User.sequelize.close();
});
