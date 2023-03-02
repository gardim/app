/// <reference types="cypress" />

describe('main functionalities', () => {
	it('requests data from plant api', () => {
		cy.visit('/', {
			onBeforeLoad(win) {
				cy.stub(win.console, 'log').as('consoleLog');
			},
		});

		cy.get('[data-testid="Adicione sua primeira planta"]').click({ force: true });

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

		cy.fixture('plantid-request.json').then((json) => {
			cy.intercept('*identify', {
				statusCode: 200,
				body: json,
			});
		});

		cy.get('[data-testid="Continuar"]').click({ force: true });

		cy.contains('Hydrangea').click({ force: true });

		cy.get('[data-testid="Resultado Continuar"]').click({ force: true });

		cy.contains('Nome').should('be.visible');

		cy.get('[data-testid="input-nome"]').type('Blumenau');

		cy.get('[data-testid="Nome Continuar"]')
			.click({
				force: true,
			})
			.then(() => {
				cy.get('@consoleLog').should('be.calledWith', 'click');
			});
	});

	it('requests data from trefle api', () => {
		cy.visit('/', {
			onBeforeLoad(win) {
				cy.stub(win.console, 'log').as('consoleLog');
			},
		});

		cy.get('[data-testid="Adicione sua primeira planta"]').click({ force: true });

		cy.contains('Método de Identificação').should('be.visible');

		cy.contains('Identificar por texto').should('be.visible').click({ force: true });

		cy.get('[data-testid="search-bar"]').click().type('strawberry ');
		cy.get('[data-testid="search-bar"]').click().type('beach ');

		cy.get('[data-testid="chip-container"]').contains('strawberry').should('be.visible');

		cy.fixture('trefle-request.json').then((json) => {
			cy.intercept('*trefle', {
				statusCode: 200,
				body: json,
			});
		});

		cy.get('[data-testid="Continuar"]').click({
			force: true,
		});

		cy.contains('Beach strawberry').click({ force: true });

		cy.fixture('trefle-species-request.json').then((json) => {
			cy.intercept('*trefle?id=263319', {
				statusCode: 200,
				body: json,
			});
		});

		cy.get('[data-testid="Resultado Continuar"]').click({
			force: true,
		});

		cy.contains('Nome').should('be.visible');

		cy.get('[data-testid="input-nome"]').type('Blumenau');

		cy.get('[data-testid="Nome Continuar"]')
			.click({
				force: true,
			})
			.then(() => {
				cy.get('@consoleLog').should('be.calledWith', 'click');
			});
	});
});
