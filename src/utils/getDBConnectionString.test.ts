import { getDbConnectionString } from './getDBConnectionString'; // Adjust the path as necessary

describe('getDbConnectionString utility', () => {
  beforeEach(() => {
    // Clear environment variables before each test
    delete process.env.DB_USER;
    delete process.env.DB_PASSWORD;
    delete process.env.DB_HOST;
    delete process.env.DB_PORT;
    delete process.env.DB_NAME;
  });

  it('should return a connection string for MongoDB SRV with user and password', () => {
    process.env.DB_USER = 'user';
    process.env.DB_PASSWORD = 'password';
    process.env.DB_HOST = 'host.mongodb.com';
    process.env.DB_NAME = 'myDatabase';

    const connectionString = getDbConnectionString();
    
    expect(connectionString).toBe('mongodb+srv://user:password@host.mongodb.com');
  });

  it('should return a connection string for MongoDB with host, port, and name', () => {
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '27017';
    process.env.DB_NAME = 'myDatabase';

    const connectionString = getDbConnectionString();

    expect(connectionString).toBe('mongodb://localhost:27017/myDatabase');
  });

  it('should throw an error if required environment variables are missing', () => {
    expect(() => getDbConnectionString()).toThrow(
      'Database connection parameters are missing or incomplete.'
    );
  });

  it('should throw an error if only partial required variables are provided', () => {
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '27017';

    expect(() => getDbConnectionString()).toThrow(
      'Database connection parameters are missing or incomplete.'
    );
  });
});
