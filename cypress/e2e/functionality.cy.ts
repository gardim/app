/// <reference types="cypress" />

describe('main functionalities', () => {
	it('requests data from plant api', () => {
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

		cy.fixture('plantid-request.json').then((json) => {
			cy.intercept('*identify', {
				statusCode: 200,
				body: json,
			});
		});

		cy.get(
			'[style="flex: 1 1 0%; place-content: center; flex-direction: column; align-items: center;"] > [data-testid="fab-container"] > [data-testid="fab"]'
		).click({ force: true });

		cy.get('@consoleLog').should('be.calledWith', false);
	});

	it('requests data from trefle api', () => {
		cy.visit('/', {
			onBeforeLoad(win) {
				cy.stub(win.console, 'log').as('consoleLog');
			},
		});

		cy.get('div[data-testid="fab-content"]').click({ force: true });

		cy.contains('Método de Identificação').should('be.visible');

		cy.contains('Identificar por texto').should('be.visible').click({ force: true });

		cy.get('[data-testid="search-bar"]').click().type('beach ');
		cy.get('[data-testid="search-bar"]').click().type('strawberry ');

		cy.get('[data-testid="chip-container"]').contains('beach').should('be.visible');
		cy.get('[data-testid="chip-container"]').contains('strawberry').should('be.visible');

		cy.fixture('trefle-request.json').then((json) => {
			cy.intercept('*trefle', {
				statusCode: 200,
				body: json,
			});
		});
		const stub = cy.stub();
		cy.on('window:alert', stub);

		cy.get(':nth-child(2) > [data-testid="fab-container"] > [data-testid="fab"]')
			.click({
				force: true,
			})
			.then(() => {
				cy.get('@consoleLog').should('be.calledWith', 'Beach strawberry');

				expect(stub.getCall(0)).to.be.calledWith('Beach strawberry');
			});
	});
});
