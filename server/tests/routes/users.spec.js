const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../server/app');

const request = supertest(app);

describe('/api/users routes:', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    const url = 'mongodb+srv://admin:admin@cluster0.e88f2.mongodb.net/test?retryWrites=true&w=majority';
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
  test('GET: /api/users', async (done) => {
    await request
      .get('/api/users')
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual({
          name: 'User Route', data: []
        });
        done();
      });
  });
  test('POST: /api/users/ - should not exist (yet)', async (done) => {
    await request
      .post('/api/users')
      .send({})
      .then(res => {
        expect(res.statusCode).toBe(404);
        done();
      });
  });
});
