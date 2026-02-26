const https = require('https');

const email = process.argv[2] || 'admin@sevenhills.com';
const password = process.argv[3] || 'wrong_password_test';

const data = JSON.stringify({
    email: email,
    password: password
});

const options = {
    hostname: 'uguvemllaweahpiqltky.supabase.co',
    port: 443,
    path: '/auth/v1/token?grant_type=password',
    method: 'POST',
    headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVndXZlbWxsYXdlYWhwaXFsdGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjI3NjEsImV4cCI6MjA4NzI5ODc2MX0.EIggaFZWvR2y-1Uk_sjte0YL433e8nsToa7R3BTdogw',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

console.log(`Sending direct network request to Supabase...`);
console.log(`POST https://${options.hostname}${options.path}`);
console.log(`Payload: { "email": "${email}", "password": "***" }`);

const req = https.request(options, (res) => {
    console.log(`\nHTTP STATUS CODE RETURNED BY SUPABASE: ${res.statusCode}`);
    res.on('data', (d) => {
        console.log('RAW RESPONSE FROM SUPABASE:');
        console.log(d.toString());
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
