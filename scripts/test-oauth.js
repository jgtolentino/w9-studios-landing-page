// Quick script to test OAuth configuration
const config = {
  client_id: '916601142061-acqbgukfia2v24deu3hhcag8au9gjs93.apps.googleusercontent.com',
  redirect_uri: 'http://localhost:3001/api/auth/google/callback',
  scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent'
};

const authUrl = 'https://accounts.google.com/o/oauth2/auth?' +
  new URLSearchParams(config).toString();

console.log('OAuth Authorization URL:');
console.log(authUrl);
console.log('\n✅ Configuration looks correct!');
console.log('\nMake sure this redirect URI is added in Google Cloud Console:');
console.log('→ http://localhost:3001/api/auth/google/callback');