/**
/* Script name : config.js
/* Description : Configuration file
/* Author : Redek Project
**/

'use strict';

// CONFIGURATIONS VARIABLES
// ----------------------------------------------------------------------------
	let initialConfig = {
		showDebug: true,
		userModelName: 'User',
		defaultRoleUser: {
			name: 'superadmin',
			description: 'Role having all access and no restrictions (Provider : loopback-boot-create-access-token).',
			user: {
				username: 'DeveloperAdmin',
				email: 'developer.admin@domain.com',
				emailVerified: true,
				password: '@dminD€v'
			}
		}
	};

// CONFIGURATIONS METHODS
// ----------------------------------------------------------------------------
	/**
	 * Get create access token configurations.
	 * @returns {initialConfig}
	 */
	let get = () => {
		return initialConfig;
	}

	/**
	 * Set new create access token configurations.
	 * @param {initialConfig} config 
	 */
	let set = (config) => {
		initialConfig = Object.assign(initialConfig, config);
	}

// EXPORTS
// ----------------------------------------------------------------------------
	module.exports = {
		initialConfig,
		get,
		set
	}