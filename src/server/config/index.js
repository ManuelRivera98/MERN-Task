import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  dev: process.env.NODE_ENV !== 'production',
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbLocalHost: process.env.DB_LOCAL_HOST,
  authJsonWebTokenSecret: process.env.AUTH_JSON_WEB_TOKEN_SECRET,
  backendUrl: process.env.BACKEND_URL || 'http://localhost:4000',
  apiKeyTokenAdmin: process.env.API_KEY_TOKEN_ADMIN,
  apiKeyTokenPublic: process.env.API_KEY_TOKEN_PUBLIC,
  invalidIdMessage: 'Invalid Id.',
};

export default config;
