const crypto = require('crypto');

const jwt = {
  sign: (payload, secret) => {
    const header = JSON.stringify({ alg: 'HS256', typ: 'JWT' });
    const base64Header = Buffer.from(header).toString('base64').replace(/=+$/, '');
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64').replace(/=+$/, '');
    const signature = crypto.createHmac('sha256', secret).update(`${base64Header}.${base64Payload}`).digest('base64').replace(/=+$/, '');
    return `${base64Header}.${base64Payload}.${signature}`;
  },
  verify: (token, secret) => {
    const [header, payload, signature] = token.split('.');
    const expectedSignature = crypto.createHmac('sha256', secret).update(`${header}.${payload}`).digest('base64').replace(/=+$/, '');
    return signature === expectedSignature;
  }
};

module.exports = jwt;
