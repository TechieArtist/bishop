module.exports = {
  apps : [{
    name: 'myapp',
    script: 'index.js',
    env: {
      PORT: 3000,
      // other environment variables like OPENAI_API_KEY can be specified here as well
    }
  }]
};
