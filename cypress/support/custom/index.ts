export default _chai => {
	function assertDisplayed() {
		const subject = this._obj;

		const bottom = Cypress.$(cy.state('window')).height();
		const width = Cypress.$(cy.state('window')).width();
		const rect = subject[0].getBoundingClientRect();

		this.assert(
			rect.top < bottom && rect.right <= width && rect.left >= 0,
			'expected #{this} to be displayed',
			'expected #{this} to not be displayed',
			this._obj
		);
	}

	_chai.Assertion.addMethod('displayed', assertDisplayed);
};