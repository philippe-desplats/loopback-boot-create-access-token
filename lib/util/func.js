/**
/* Script name : func.js
/* Description : All the functions used in the module.
/* Author : Redek Project
**/

'use strict';

// IMPORTS
// ----------------------------------------------------------------------------
	const COLORS = require('COLORS');
	const CONFIGURATIONS = require('../config');
	const LOG = require('./debug');

// CREATE DEFAULT ROLE AND USER ADMIN
// ----------------------------------------------------------------------------
	module.exports = (app, cb) => {
		// => Get configurations.
			const config = CONFIGURATIONS.get();
		// => Get `User`, `AccessToken`, `Role` and `RoleMapping` models.
			let User = app.models[config.userModelName];
			let Role = app.models.Role;
			let RoleMapping = app.models.RoleMapping;
			let AccessToken = app.models.AccessToken;
		// => Creating the role and user administrator by default.
			LOG('\tCreating the role and user administrator by default :'.bold);
			Role.findOrCreate(
				{ where: { name: config.defaultRoleUser.name }},
				{
					name: config.defaultRoleUser.name,
					description: config.defaultRoleUser.description
				},
				(err, createdRole, created) => {
					if (err) throw err;

					// => Show created information.
						if (created) {
							LOG("\t\t✔ ".green + "The default role `" + COLORS.cyan(config.defaultRoleUser.name) + "` was successfully created.");
						} else {
							LOG("\t\t● ".yellow + "The default role `" + COLORS.cyan(config.defaultRoleUser.name) + "` does not need to update.");
						}
					// => Creating default admin user.
						User.findOrCreate(
							{ where: { username: config.defaultRoleUser.user.username }},
							config.defaultRoleUser.user,
							(err, createdUser, created) => {
								if (err) throw err;

								// => Show created information.
									if (created) {
										LOG("\t\t✔ ".green + "The default user `" + COLORS.cyan(config.defaultRoleUser.user.username) + "` was successfully created.");
									} else {
										LOG("\t\t● ".yellow + "The default user `" + COLORS.cyan(config.defaultRoleUser.user.username) + "` does not need to update.");
									}
								// => Assign user to role.
									RoleMapping.findOrCreate(
										{ where: { principalId: createdUser.id }},
										{
											principalType: RoleMapping.USER,
											principalId: createdUser.id,
											roleId: createdRole.id
										},
										(err, createdRoleM, created) => {
											if (err) throw err;

											// => Show created information.
												if (created) {
													LOG("\t\t✔ ".green + "The default user `" + COLORS.cyan(config.defaultRoleUser.user.username) + "` has been assigned to the `" + COLORS.cyan(config.defaultRoleUser.name) + "` role.");
												} else {
													LOG("\t\t● ".yellow + "The default user `" + COLORS.cyan(config.defaultRoleUser.user.username) + "` has already been assigned to the `" + COLORS.cyan(config.defaultRoleUser.name) + "` role.");
												}
											// => Log in with the administrator account to retrieve the login.
												LOG("\n\tCreation of the access token :".bold);
												let tabCount = config.showDebug ? '\t\t' : '\t';
												console.log(COLORS.yellow(tabCount) + "Connecting with user `" + COLORS.cyan(config.defaultRoleUser.user.username) + "`...");
												User.login({
													username: config.defaultRoleUser.user.username,
													password: config.defaultRoleUser.user.password
												}, (err, accessToken) => {
													if (err) throw err;

													// => Deletion of all old access tokens besides the one that is already generated.
														AccessToken.find({
															where: {
																id: { neq: accessToken.id },
																userId: accessToken.userId
															}
														}, (err, models) => {
															if (err) throw err;

															// => Creating a loop to delete each token one by one.
																models.forEach(model => {
																	model.destroy();
																});
															// => Displaying access token.
																console.log(COLORS.green(tabCount + "✔ ") + "Successful login, here is generated token : " + COLORS.yellow(accessToken.id));
																console.log("== END CREATING ACCESS TOKEN ==\n".cyan);
																process.nextTick(cb);
														});
												});
										}
									)
							}
						)
				}
			)
	}