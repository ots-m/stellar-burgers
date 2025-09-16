import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    env: {
      BURGER_API_URL: 'https://norma.nomoreparties.space/api'
    },
    setupNodeEvents(on, config) {
      return config;
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true
  }
});
