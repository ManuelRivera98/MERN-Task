// DEBUG=app:* node src/server/scripts/seedApiKey.js

require('@babel/polyfill');

require('@babel/register')({
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
});

const colors = require('colors/safe');
const crypto = require('crypto');
// eslint-disable-next-line import/no-extraneous-dependencies
const debug = require('debug')('app:scripts:api-key');
// Services
const MongoLib = require('../lib/mongo').default;
// Schema
const apiKeySchema = require('../utils/schemas/apiKeys').default;

const adminScopes = [
  'login:auth',
  'signup:auth',
  'read:users',
  'read:user',
  'update:users',
  'delete:users',

];

const publicScopes = [
  'login:auth',
  'signup:auth',
  'read:user',
];
function generateRandomToken() {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('hex');
}

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes,
  },
  {
    token: generateRandomToken(),
    scopes: publicScopes,
  },
];

async function seedApiKey() {
  try {
    const mongoDB = new MongoLib();

    const promises = apiKeys.map(async (apiKey) => {
      await mongoDB.create('api-keys', apiKeySchema, apiKey);
    });

    await Promise.all(promises);
    debug(colors.green(`${promises.length} api keys have been created successfully.`));
    return process.exit(0);
  } catch (error) {
    debug(colors.red(error));
    process.exit(1);
  }
}

seedApiKey();
