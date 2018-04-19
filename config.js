// import dotenv from 'dotenv';
// dotenv.config();
require('dotenv').config();

const ENV = process.env.NODE_ENV.toUpperCase();

module.exports = {
    env: process.env.NODE_ENV,
    port: parseInt(process.env[`${ENV}_PORT`], 10) || 9000,
    host: process.env[`${ENV}_HOST`] || 'localhost',
};
