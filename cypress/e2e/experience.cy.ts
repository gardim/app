/// <reference types="cypress" />

import { lightGreenColors, darkGreenColors } from '../../src/utils/colors';
type ViewportPreset =
	| 'iphone-6'
	| 'iphone-7'
	| 'iphone-8'
	| 'iphone-x'
	| 'ipad-2'
	| 'ipad-mini'
	| 'macbook-11'
	| 'macbook-13'
	| 'macbook-15'
	| 'macbook-16'
	| 'samsung-note9'
	| 'samsung-s10';

const sizes: ViewportPreset[] = [
	'macbook-16',
	'macbook-13',
	'ipad-2',
	'iphone-x',
	'samsung-s10',
	'samsung-note9',
];
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

			cy.get('[data-testid="Add Plant"]').click({ force: true });

			cy.contains('Método de Identificação').should('be.visible');

			cy.contains('Identificar por imagem').should('be.visible');

			cy.contains('Identificar por texto').should('be.visible');

			cy.get('[data-testid="back icon"]').click({
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

			cy.get('[data-testid="Add Plant"]').click({ force: true });

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

			cy.get('div[data-testid="close badge"]').first().click({ force: true });

			cy.contains('Adicionar da galeria').click({ force: true });

			cy.fixture('placeholder-image.png').then((fileContent) => {
				cy.get('input[type=file]').attachFile({
					fileContent,
					fileName: 'placeholder-image.png',
					mimeType: 'image/png',
				});
			});

			cy.get('[data-testid="Method Continue"]').should('be.visible');
		});

		it('verifies text method screen', () => {
			cy.viewport(size);
			cy.visit('/');

			cy.get('[data-testid="Add Plant"]').click({ force: true });

			cy.contains('Método de Identificação').should('be.visible');

			cy.contains('Identificar por texto').should('be.visible').click({ force: true });

			cy.get('[data-testid="search-bar"]').click().type('planta ');

			cy.get('[data-testid="chip-container"]').should('be.visible');

			cy.get('[data-testid="Method Continue"]').should('be.visible');
		});

		it('changes theme', () => {
			cy.viewport(size);
			cy.visit('/');

			cy.contains('Adicione sua primeira planta')
				.should('be.visible')
				.should('have.css', 'color', lightGreenColors.colors.onBackground);

			cy.get('[data-testid="Appbar Menu"]').click();

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

			cy.get('[data-testid="Appbar Menu"]').click();

			cy.contains('Preferences').should('be.displayed');

			cy.get('body').click(0, 0);

			cy.contains('Preferences').should('not.be.displayed');
		});
	});
});
