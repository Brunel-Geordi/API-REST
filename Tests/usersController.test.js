const request = require('supertest');
const app = require('../controllers/users.controller');
// const sequelize = require("../setup/database");
 // Mettez le chemin correct vers votre fichier d'application

describe('User Routes', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/create')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Utilisateur créer avec succes' });
  });

  it('should authenticate a user', async () => {
    const response = await request(app)
      .get('/')
      .query({
        username: 'testuser',
        password: 'testpassword',
      });

    expect(response.status).toBe(200);
    // Ajoutez d'autres assertions si nécessaire.
  });

  it('should not authenticate a user with incorrect credentials', async () => {
    const response = await request(app)
      .get('/')
      .query({
        username: 'testuser',
        password: 'incorrectpassword',
      });

    expect(response.status).toBe(401);
    // Ajoutez d'autres assertions si nécessaire.
  });
});
