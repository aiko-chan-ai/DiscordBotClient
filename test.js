const fs = require('fs');
const crypto = require('crypto');

// Step 1: Generate RSA Private Key
const privateKey = crypto.generateKeyPairSync('rsa', {
	modulusLength: 2048,
	privateKeyEncoding: {
		type: 'pkcs8',
		format: 'pem',
	},
	publicKeyEncoding: {
		type: 'spki',
		format: 'pem',
	},
});

// Save the private key to a file
console.log('private_key.pem', privateKey.privateKey);

// Step 2: Generate Self-Signed Certificate
const { privateKey: privateKeyPEM, publicKey } = privateKey;
const certificate = crypto.createSign('SHA256');
certificate.update('self-signed certificate');

const sign = crypto.createSign('SHA256');
sign.update(certificate.sign(privateKeyPEM, 'base64'));
const pem = sign.sign(privateKeyPEM, 'base64');

// Save the self-signed certificate to a file
console.log('certificate.pem', publicKey + '\n' + pem);

console.log('Private key and certificate generated successfully.');
