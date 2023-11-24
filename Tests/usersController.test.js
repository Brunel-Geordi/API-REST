const request = require('supertest');
const app = require('../index');

describe('User Routes', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/user/create')
      .send({
        email: 'testmail@mail.com',
        username: 'testuser',
        password: 'testpassword',
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Utilisateur créer avec succes' });
  });

  it('should authenticate a user', async () => {
    const response = await request(app)
      .get('/user')
      .query({
        username: 'testuser',
        password: 'testpassword',
      });

    expect(response.status).toBe(200);
    // Ajoutez d'autres assertions si nécessaire.
  });

  it('should not authenticate a user with incorrect credentials', async () => {
    const response = await request(app)
      .get('/user')
      .query({
        username: 'testuser',
        password: 'incorrectpassword',
      });

    expect(response.status).toBe(401);
  });
});
