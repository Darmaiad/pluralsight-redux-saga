import dotenv from 'dotenv';

dotenv.config();

const ENV = process.env.NODE_ENV.toUpperCase();

export default {
    env: process.env.NODE_ENV,
    port: parseInt(process.env[`${ENV}_PORT`], 10) || 9000,
    host: process.env[`${ENV}_HOST`] || 'localhost',
};
