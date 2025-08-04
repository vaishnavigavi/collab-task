export const environment = {
  production: true,
  firebase: {
    apiKey: 'demo-api-key',
    authDomain: 'demo-collab-task.firebaseapp.com',
    projectId: 'demo-collab-task',
    storageBucket: 'demo-collab-task.appspot.com',
    messagingSenderId: '1234567890',
    appId: '1:1234567890:web:abcdef123456'
  },
  apiUrl: process.env['API_URL'] || 'https://web-production-b6c94.up.railway.app'
}; 