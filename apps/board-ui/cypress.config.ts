import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    supportFile: 'apps/board-ui/cypress/support/e2e.ts',
    specPattern: 'apps/board-ui/cypress/e2e/**/*.cy.ts',
    video: false,
    screenshotOnRunFailure: false,
  },
}); 