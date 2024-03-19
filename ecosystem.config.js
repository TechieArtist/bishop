module.exports = {
  apps: [{
    name: 'chatbot',
    script: './index.js',
     env: {
      NODE_ENV: 'production',
      OPENAI_API_KEY: 'OPEN_API_KEY',
      // any other environment variables you need
    }
  }]
};
