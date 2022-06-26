import { defineConfig } from 'cypress'

export default defineConfig({
  viewportHeight: 720,
  viewportWidth: 1080,
  chromeWebSecurity: false,
  blockHosts: ['http://api.network.com', 'https://api.soul-network.com'],
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config)
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.spec.*',
  },
})
