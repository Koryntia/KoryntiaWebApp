import request from 'supertest';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { NextApiHandler } from 'next';
import UserSignee from '@/models/user-model';
import { POST } from '@/app/api/user/route';

const handler: NextApiHandler = async (req, res) => {
  await POST(req, res);
};

const server = createServer(handler);

describe('POST /api/user', () => {
  beforeAll(async () => {
    const mongoUri = 'mongodb://localhost:27017/testdb';
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await UserSignee.deleteMany({});
  });

  it('should create a new user if not exists', async () => {
    const userData = { signeeWalletAddress: '0x123' };

    const response = await request(server)
      .post('/api/user')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully');
  });

  it('should return 204 if user already exists', async () => {
    const userData = { signeeWalletAddress: '0x123' };
    const existingUser = new UserSignee(userData);
    await existingUser.save();

    const response = await request(server)
      .post('/api/user')
      .send(userData);

    expect(response.status).toBe(204);
  });
});
