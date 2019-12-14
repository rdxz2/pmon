let spa;
let pmonidentity;
let pmonapi;
let reporting;

switch (process.env.NODE_ENV) {
  case 'production':
    spa = 'http://localhost:3000/#';
    pmonidentity = 'http://localhost:5000';
    pmonapi = 'https://localhost:5001';
    reporting = 'http://localhost:5002';
    break;
  case 'development':
    spa = 'http://localhost:3000/#';
    pmonidentity = 'http://localhost:5000';
    pmonapi = 'https://localhost:5001';
    reporting = 'http://localhost:5002';
    break;
  default:
    throw new Error('hosting environment not recognized');
}

export const SERVER_ADDRESSES = { spa, pmonidentity, pmonapi, reporting };
