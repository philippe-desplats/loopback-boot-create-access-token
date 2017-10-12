/**
/* Script name : debug.js
/* Description : Debug taking verifying that the user's configuration.
/* Author : Redek Project
**/

'use strict';

// IMPORTS
// ----------------------------------------------------------------------------
	const CONFIGURATIONS = require('../config');

// DEBUGGER
// ----------------------------------------------------------------------------
	module.exports = (message) => {
		// => Get configurations.
			const config = CONFIGURATIONS.get();
		// => Display log.
			if (config.showDebug)
				console.log(message);
	}