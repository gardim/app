/// <reference types="cypress" />
import 'cypress-localstorage-commands';

const plant =
	'{' +
	'"id":"183086",' +
	'"name":"Blumenau",' +
	'"code":"000000",' +
	'"common_name":"Beach strawberry",' +
	'"scientific_name":"Sorbus aucuparia",' +
	'"edible_parts":null,' +
	'"ph_maximum":7.5,' +
	'"ph_minimum":5.5,' +
	'"light_minimum":5,' +
	'"light_maximum":9,' +
	'"atmospheric_humidity_minimum":5,' +
	'"atmospheric_humidity_maximum":5,' +
	'"temperature_minimum":-1,' +
	'"temperature_maximum":27,' +
	'"soil_humidity_minimum":5,' +
	'"soil_humidity_maximum":5' +
	'}';

describe('main functionalities', () => {
	it('requests data from plant api', () => {
		cy.fixture('weatherstack-request.json').then((json) => {
			cy.intercept('*weather', {
				statusCode: 200,
				body: json,
			});
		});

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

		cy.fixture('plantid-request.json').then((json) => {
			cy.intercept('*identify', {
				statusCode: 200,
				body: json,
			});
		});

		cy.get('[data-testid="Method Continue"]').click({ force: true });

		cy.contains('Hydrangea').click({ force: true });

		cy.get('[data-testid="Result Continue"]').click({ force: true });

		cy.contains('Nome').should('be.visible');

		cy.get('[data-testid="input-nome"]').type('Blumenau');

		cy.get('[data-testid="Name Continue"]').click({
			force: true,
		});

		cy.contains('Código').should('be.visible');

		cy.get('[data-testid="code-field"]').type('000000');

		cy.get('[data-testid="Code Continue"]').click({ force: true });

		cy.contains('Suas Plantas').should('be.visible');

		cy.contains('Blumenau').should('be.visible');

		cy.contains('Sua planta foi salva com sucesso!').should('be.visible');
	});

	it('requests data from trefle api', () => {
		cy.fixture('weatherstack-request.json').then((json) => {
			cy.intercept('*weather', {
				statusCode: 200,
				body: json,
			});
		});

		cy.visit('/', {
			onBeforeLoad(win) {
				cy.stub(win.console, 'log').as('consoleLog');
			},
		});

		cy.get('[data-testid="Add Plant"]').click({ force: true });

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

		cy.get('[data-testid="Method Continue"]').click({
			force: true,
		});

		cy.contains('Beach strawberry').click({ force: true });

		cy.fixture('trefle-species-request.json').then((json) => {
			cy.intercept('*trefle?id=263319', {
				statusCode: 200,
				body: json,
			});
		});

		cy.get('[data-testid="Result Continue"]').click({
			force: true,
		});

		cy.contains('Nome').should('be.visible');

		cy.get('[data-testid="input-nome"]').type('Blumenau');

		cy.get('[data-testid="Name Continue"]').click({
			force: true,
		});

		cy.contains('Código').should('be.visible');

		cy.get('[data-testid="code-field"]').type('000000');

		cy.get('[data-testid="Code Continue"]').click({ force: true });

		cy.contains('Suas Plantas').should('be.visible');

		cy.contains('Blumenau').should('be.visible');

		cy.contains('Sua planta foi salva com sucesso!').should('be.visible');
	});

	it('verifies saved plant', () => {
		cy.setLocalStorage('@183086', plant);

		cy.fixture('weatherstack-request.json').then((json) => {
			cy.intercept('*weather', {
				statusCode: 200,
				body: json,
			});
		});

		cy.visit('/');

		cy.contains('Blumenau').should('be.visible').click({ force: true });
		cy.contains('Oops! Parece que você não tem nada habilitado para essa planta').should(
			'be.visible'
		);
	});

	it('edits saved plant name', () => {
		cy.setLocalStorage('@183086', plant);

		cy.fixture('weatherstack-request.json').then((json) => {
			cy.intercept('*weather', {
				statusCode: 200,
				body: json,
			});
		});

		cy.visit('/');

		cy.contains('Blumenau').should('be.visible').click({ force: true });
		cy.contains('Oops! Parece que você não tem nada habilitado para essa planta').should(
			'be.visible'
		);
		cy.contains('Configurações').should('be.visible').click({ force: true });

		cy.contains('Editar').should('be.visible').click({ force: true });
		cy.get('[data-testid="input-nome"]').type('Jujuba');
		cy.contains('Done').click({ force: true });
		cy.get('[data-testid="back icon"]').click({
			force: true,
		});
		cy.contains('Jujuba').should('be.visible');
	});

	it('deletes saved plant', () => {
		cy.setLocalStorage('@183086', plant);

		cy.fixture('weatherstack-request.json').then((json) => {
			cy.intercept('*weather', {
				statusCode: 200,
				body: json,
			});
		});

		cy.visit('/');

		cy.contains('Blumenau').should('be.visible').click({ force: true });
		cy.contains('Oops! Parece que você não tem nada habilitado para essa planta').should(
			'be.visible'
		);

		cy.contains('Configurações').should('be.visible').click({ force: true });
		cy.contains('Apagar').should('be.visible').click({ force: true });
		cy.contains('Prosseguir').should('be.visible').click({ force: true });
		cy.contains('Adicione sua primeira planta').should('be.visible');
	});

	it('saves plant without code', () => {
		cy.fixture('weatherstack-request.json').then((json) => {
			cy.intercept('*weather', {
				statusCode: 200,
				body: json,
			});
		});

		cy.visit('/', {
			onBeforeLoad(win) {
				cy.stub(win.console, 'log').as('consoleLog');
			},
		});

		cy.get('[data-testid="Add Plant"]').click({ force: true });

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

		cy.get('[data-testid="Method Continue"]').click({
			force: true,
		});

		cy.contains('Beach strawberry').click({ force: true });

		cy.fixture('trefle-species-request.json').then((json) => {
			cy.intercept('*trefle?id=263319', {
				statusCode: 200,
				body: json,
			});
		});

		cy.get('[data-testid="Result Continue"]').click({
			force: true,
		});

		cy.contains('Nome').should('be.visible');

		cy.get('[data-testid="input-nome"]').type('Blumenau');

		cy.get('[data-testid="Name Continue"]').click({
			force: true,
		});

		cy.contains('Código').should('be.visible');

		cy.contains('aqui').click({ force: true });

		cy.contains('Suas Plantas').should('be.visible');

		cy.contains('Blumenau').should('be.visible');

		cy.contains('Sua planta foi salva com sucesso!').should('be.visible');
	});
});
