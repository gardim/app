/// <reference types="cypress" />

import { lightGreenColors, darkGreenColors } from '../../src/utils/colors';

const sizes = ['macbook-16', 'macbook-13', 'ipad-2', 'iphone-x', 'samsung-s10', 'samsung-note9'];
sizes.forEach((size) => {
	describe(`basic behavior on ${size} screen`, () => {
		it('verifies home screen', () => {
			cy.viewport(size);
			cy.visit('/');

			cy.contains('Adicione sua primeira planta').should('be.visible');
		});

		it('verifies method identification screen', () => {
			cy.viewport(size);
			cy.visit('/');

			cy.get('div[data-testid="fab-content"]').click({ force: true });

			cy.contains('Método de Identificação').should('be.visible');

			cy.contains('Identificar por imagem').should('be.visible');

			cy.contains('Identificar por texto').should('be.visible');

			cy.get('[data-testid="surface"] > :nth-child(1) > [data-testid="icon-button"]').click({
				force: true,
			});

			cy.contains('Adicione sua primeira planta').should('be.visible');
		});

		it('verifies image method screen', () => {
			cy.viewport(size);
			cy.visit('/', {
				onBeforeLoad(win) {
					cy.stub(win.console, 'log').as('consoleLog');
				},
			});

			cy.get('div[data-testid="fab-content"]').click({ force: true });

			cy.contains('Método de Identificação').should('be.visible');

			cy.contains('Identificar por imagem').should('be.visible').click({ force: true });

			cy.contains('Tirar foto').click({ force: true });

			cy.fixture('placeholder-image.png').then((fileContent) => {
				cy.get('input[type=file]').attachFile({
					fileContent,
					fileName: 'placeholder-image.png',
					mimeType: 'image/png',
				});
			});

			cy.get('div[data-testid="iconIcon"]').first().click({ force: true });

			cy.contains('Adicionar da galeria').click({ force: true });

			cy.fixture('placeholder-image.png').then((fileContent) => {
				cy.get('input[type=file]').attachFile({
					fileContent,
					fileName: 'placeholder-image.png',
					mimeType: 'image/png',
				});
			});

			cy.get(
				'[style="flex: 1 1 0%; place-content: center; flex-direction: column; align-items: center;"] > [data-testid="fab-container"] > [data-testid="fab"]'
			).click({ force: true });

			cy.get('@consoleLog').should('be.calledWith', 'click');
		});

		it('verifies text method screen', () => {
			cy.viewport(size);
			cy.visit('/', {
				onBeforeLoad(win) {
					cy.stub(win.console, 'log').as('consoleLog');
				},
			});

			cy.get('div[data-testid="fab-content"]').click({ force: true });

			cy.contains('Método de Identificação').should('be.visible');

			cy.contains('Identificar por texto').should('be.visible').click({ force: true });

			cy.get('[data-testid="search-bar"]').click().type('planta ');

			cy.get('[data-testid="chip-container"]').should('be.visible');

			cy.get(':nth-child(2) > [data-testid="fab-container"] > [data-testid="fab"]').click({
				force: true,
			});

			cy.get('@consoleLog').should('be.calledWith', 'click');
		});

		it('changes theme', () => {
			cy.viewport(size);
			cy.visit('/');

			cy.contains('Adicione sua primeira planta')
				.should('be.visible')
				.should('have.css', 'color', lightGreenColors.colors.onBackground);

			cy.get('div[data-testid="icon-button"]').click();

			cy.contains('Dark Theme').should('be.visible').click();

			cy.contains('Adicione sua primeira planta').should(
				'have.css',
				'color',
				darkGreenColors.colors.onBackground
			);
		});

		it('interacts with drawer', () => {
			cy.viewport(size);
			cy.visit('/');

			cy.contains('Preferences').should('not.be.displayed');

			cy.get('div[data-testid="icon-button"]').click();

			cy.contains('Preferences').should('be.displayed');

			cy.get('body').click(0, 0);

			cy.contains('Preferences').should('not.be.displayed');
		});
	});
});
