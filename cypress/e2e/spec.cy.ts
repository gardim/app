/// <reference types="cypress" />

import { lightGreenColors, darkGreenColors } from '../../src/utils/colors';

describe('template spec', () => {
	it('works', () => {
		cy.visit('/');
		cy.contains('Open up App.js to start working on your app!')
			.should('be.visible');
	});

	it('changes theme', () => {
		cy.visit('/');
		
		cy.contains('Open up App.js to start working on your app!')
			.should('be.visible')
			.should('have.css', 'color', lightGreenColors.colors.onBackground);

		cy.get('img[alt=""]').click();

		cy.contains('Preferences')
			.should('be.visible');

		cy.contains('Dark Theme')
			.should('be.visible')
			.click();

		cy.contains('Open up App.js to start working on your app!')
			.should('have.css', 'color', darkGreenColors.colors.onBackground);
	});
});