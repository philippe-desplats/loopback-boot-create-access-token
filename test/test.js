/**
/* Script name : test.js
/* Description : Unit test script.
/* Author : Redek Project
**/

'use strict';

// IMPORTS
// ----------------------------------------------------------------------------
	const EXPECT = require('chai').expect;
	const CONFIGURATION = require('../lib/config');

// TESTS
// ----------------------------------------------------------------------------
	describe('Configuration unit test :', () => {
		it('Should recover exactly the initial configuration present in `config.js`.', () => {
			// => Get data.
				let initialConfiguration = CONFIGURATION.get();
			// => Check data.
				EXPECT(initialConfiguration).to.deep.equal(CONFIGURATION.initialConfig);
		});

		it('Should modify only part of the data and return the merge of the initial configuration and the new configurations.', () => {
			// => Get initial data.
				let configurationAfterModification = CONFIGURATION.get();
			// => Set new data.
				CONFIGURATION.set({
					showDebug: false,
					defaultRoleUser: {
						name: 'admin',
						user: {
							username: 'Admin'
						}
					}
				});
			// => Get actual data.
				let configurations = CONFIGURATION.get();
			// => Creating the configuration we need to retrieve after modification.
				configurationAfterModification.showDebug = false;
				configurationAfterModification.defaultRoleUser.name = 'admin';
				configurationAfterModification.defaultRoleUser.user.username = 'Admin';
			// => Check data.
				EXPECT(configurations).to.deep.equal(configurationAfterModification);
		});
	});