/// <reference types="cypress" />

describe('template spec', () => {
	it('works', () => {
		cy.visit('/');
		cy.contains('Open up App.js to start working on your app!')
			.should('be.visible');
	});
});