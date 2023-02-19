/// <reference types="cypress" />

import { lightGreenColors, darkGreenColors } from '../../src/utils/colors';


const sizes = ['macbook-16', 'macbook-13' , 'ipad-2' , 'iphone-x' , 'samsung-s10' , 'samsung-note9'];
sizes.forEach((size) => {

	describe(`basic behavior on ${size} screen`, () => {

		
		it('works', () => {
			cy.viewport(size); 
			cy.visit('/');
			cy.contains('Open up App.js to start working on your app!')
				.should('be.visible');
		});
	
		it('changes theme', () => {
			cy.viewport(size); 
			cy.visit('/');
			
			cy.contains('Open up App.js to start working on your app!')
				.should('be.visible')
				.should('have.css', 'color', lightGreenColors.colors.onBackground);
	
			cy.get('div[data-testid="icon-button"]').click();
	
			cy.contains('Dark Theme')
				.should('be.visible')
				.click();
	
			cy.contains('Open up App.js to start working on your app!')
				.should('have.css', 'color', darkGreenColors.colors.onBackground);
	
		});
	
		it('interacts with drawer', () => {
			cy.viewport(size); 
			cy.visit('/');
			
			cy.contains('Preferences')
				.should('not.be.displayed');
	
			cy.get('div[data-testid="icon-button"]').click();
	
			cy.contains('Preferences')
				.should('be.displayed');
	
	
			cy.get('body').click(0, 0);
				
			cy.contains('Preferences')
				.should('not.be.displayed');
		});

	});
});