import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV.toUpperCase();

export default {
    env: process.env.NODE_ENV,
    port: parseInt(process.env[`${env}_PORT`], 10) || 9000,
    host: process.env[`${env}_HOST`] || 'localhost',
};
