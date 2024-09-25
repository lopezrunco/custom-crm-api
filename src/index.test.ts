import mongoose from 'mongoose';
import { getDbConnectionString } from './utils/getDBConnectionString';
const app = require('./index');

jest.mock('./config/logging');

describe('server initialization', () => {
  const originalConnect = mongoose.connect;

  beforeAll(async () => {
    jest.spyOn(mongoose, 'connect').mockImplementation(async () => Promise.resolve(mongoose));
    await mongoose.connect(getDbConnectionString());
  });

  afterAll(async () => {
    mongoose.connect = originalConnect;
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  });

  it('should initialize the express app', () => {
    expect(app).toBeDefined();
  });
});
