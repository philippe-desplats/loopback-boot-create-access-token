/**
/* Script name : index.js
/* Description : Module for generating an access token with an administrator account with all access.
/* Author : Redek Project
**/

'use strict';

// IMPORTS
// ----------------------------------------------------------------------------
	const INITBOT = require('./util/func');
	const CONFIGURATIONS = require('./config');

// MODULE
// ----------------------------------------------------------------------------
	module.exports = function (app, cb) {
		// => Preparing to display information in the console.
			console.log("\n== CREATING ACCESS TOKEN ==".cyan);
		// => Create default user
			INITBOT(app, cb);
	};

// EXPORTS
// ----------------------------------------------------------------------------
	/**
	 * Set new configurations.
	 * @param {configurations.initialConfig} config
	 */
	module.exports.configurations = (config) => {
		console.log("[loopback-boot-create-access-token] Warning : ".yellow + "You have just created your own configurations.");
		CONFIGURATIONS.set(config);
	};