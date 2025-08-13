// Simple deployment test script
// Run with: node test-deployment.js

const https = require('https');
const http = require('http');

const BACKEND_URL = process.env.BACKEND_URL || 'https://laravel-backend.onrender.com';
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://react-frontend.onrender.com';

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = client.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function testBackend() {
  console.log('🧪 Testing Backend...');
  
  try {
    // Test health endpoint
    const healthResponse = await makeRequest(`${BACKEND_URL}/api/health`);
    console.log('✅ Health endpoint:', healthResponse.status);
    
    // Test status endpoint
    const statusResponse = await makeRequest(`${BACKEND_URL}/api/status`);
    console.log('✅ Status endpoint:', statusResponse.status);
    
    // Test greet endpoint
    const greetResponse = await makeRequest(`${BACKEND_URL}/api/greet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'Test User' })
    });
    console.log('✅ Greet endpoint:', greetResponse.status);
    
    if (greetResponse.status === 200) {
      const data = JSON.parse(greetResponse.data);
      console.log('✅ Greeting response:', data.greeting);
    }
    
  } catch (error) {
    console.error('❌ Backend test failed:', error.message);
  }
}

async function testFrontend() {
  console.log('\n🧪 Testing Frontend...');
  
  try {
    const response = await makeRequest(FRONTEND_URL);
    console.log('✅ Frontend accessible:', response.status);
    
    if (response.status === 200) {
      console.log('✅ Frontend is serving content');
    }
    
  } catch (error) {
    console.error('❌ Frontend test failed:', error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting deployment tests...\n');
  
  await testBackend();
  await testFrontend();
  
  console.log('\n✨ Tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testBackend, testFrontend };
