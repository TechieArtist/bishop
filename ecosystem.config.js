module.exports = {
  apps: [{
    name: 'chatbot',
    script: './index.js',
    env: {
      NODE_ENV: 'production',
      PORT: 3000 // This is the port number your application listens on
    }
  }]
};
