import fs from 'fs';

const url = 'https://uguvemllaweahpiqltky.supabase.co/rest/v1/products?select=id,name';
const options = {
    headers: {
        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVndXZlbWxsYXdlYWhwaXFsdGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjI3NjEsImV4cCI6MjA4NzI5ODc2MX0.EIggaFZWvR2y-1Uk_sjte0YL433e8nsToa7R3BTdogw',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVndXZlbWxsYXdlYWhwaXFsdGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjI3NjEsImV4cCI6MjA4NzI5ODc2MX0.EIggaFZWvR2y-1Uk_sjte0YL433e8nsToa7R3BTdogw'
    }
};

try {
    const res = await fetch(url, options);
    const data = await res.json();
    fs.writeFileSync('products_out.json', JSON.stringify(data, null, 2));
    console.log('Success, wrote', data.length, 'products to products_out.json');
} catch (e) {
    console.error(e);
}
