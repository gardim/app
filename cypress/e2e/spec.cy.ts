/// <reference types="cypress" />

import { lightGreenColors, darkGreenColors } from '../../src/utils/colors';


const sizes = ['macbook-16', 'macbook-13' , 'ipad-2' , 'iphone-x' , 'samsung-s10' , 'samsung-note9'];
sizes.forEach((size) => {

	describe(`basic behavior on ${size} screen`, () => {

		
		it('interacts with screen', () => {


			cy.viewport(size); 
			cy.visit('/', {
				onBeforeLoad(win) {
					cy.stub(win.console, 'log').as('consoleLog');
				}});

			cy.contains('Adicione sua primeira planta')
				.should('be.visible');

			cy.get('div[data-testid="fab-content"]').click({force: true});

			cy.contains('Método de Identificação')
				.should('be.visible');

			cy.contains('Identificar por imagem')
				.should('be.visible')
				.click({force: true});

			cy.get('@consoleLog').should('be.calledWith', 'image');

			cy.contains('Buscar manualmente')
				.should('be.visible')
				.click({force: true});

			cy.get('@consoleLog').should('be.calledWith', 'search');

		});
	
		it('changes theme', () => {
			cy.viewport(size); 
			cy.visit('/');
			
			cy.contains('Adicione sua primeira planta')
				.should('be.visible')
				.should('have.css', 'color', lightGreenColors.colors.onBackground);
	
			cy.get('div[data-testid="icon-button"]').click();
	
			cy.contains('Dark Theme')
				.should('be.visible')
				.click();
	
			cy.contains('Adicione sua primeira planta')
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