module.exports = {
  apps: [{
    name: 'chatbot',
    script: './index.js',
     env: {
      NODE_ENV: 'production',
      OPENAI_API_KEY: 'your_actual_openai_api_key_here',
      // any other environment variables you need
    }
  }]
};
