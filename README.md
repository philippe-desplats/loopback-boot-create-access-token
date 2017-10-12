<p align="center">
    <a href="https://www.redekproject.fr/" target="_blank">
        <img alt="Redek Project" src="http://www.redekproject.fr/public_data/images/Logo%20medium.png" width="300">
    </a>
</p>

<p align="center">
    Loopback 3 Starter Script
</p>

<h1 align="center">Loopback Boot Script : Create access token</h1>

This module is exclusively designed for [Strongloop Loopback](http://loopback.io/getting-started/).
It provides model and method testing thanks to an access token with quick access.

## Getting started

### Install
```js
npm install --save loopback-boot-create-access-token
```

### Usage
Modify `server.js` file by adding `BOOTOPTIONS` as below. This change will run the module startup script, and then start the scripts in the `server/boot` directory.

```js
// app.start = function () { ... }

const BOOTOPTIONS = {
    'appRootDir': __dirname,
    'bootDirs': [
        '../node_modules/loopback-boot-create-access-token/lib/index.js'
    ]
};
boot(app, BOOTOPTIONS, function (err) {
    if (err) throw err;
    
    // start the server if `$ node server.js`
    if (require.main === module)
        app.start();
});
```

In order to take full advantage of the access token, you will need to create a new ACL rule that allows the new user to access any type of method. To do this type command : `lb acl` or `apic loopback:acl` or `slc loopback:acl`. Then choose the options as below :

- **Select the template to apply the ACL entry :** *(all existing models)*
- **Select ACL scope :** *All methods and properties*
- **Select type of access :** *All (match all types)*
- **Select the role :** *other*
- **Enter the role name :** *{The name of the role you chose or the default (superadmin)}*
- **Select the right to apply :** *Explicitly grant access*



### Configuration
The initial configuration is set to work with the basic user model *(User)*. This configuration will create a `superadmin` role and a `DeveloperAdmin` user.

| Key                                | Type    | Default value                                                                                  | Description                                                                                        |
|------------------------------------|---------|------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| showDebug                          | boolean | true                                                                                           | Display additional console log                                                      |
| userModelName                      | string  | User                                                                                           | Name of the user model to manage users                                                             |
| defaultRoleUser                    | object  |                                                                                                | An object contains all the information about the role and the user to create                       |
| defaultRoleUser.name               | string  | superadmin                                                                                     | Name of the role that will allow you to have all the access after the configuration of the ACLs.   |
| defaultRoleUser.description        | string  | Role having all access and no restrictions (Provider : loopback-boot-create-access-token).     | Description of the role for better visibility in the database.                                     |
| defaultRoleUser.user               | object  |                                                                                                | An object containing the administrator user                                                        |
| defaultRoleUser.user.username      | string  | DeveloperAdmin                                                                                 | Username that you will use to log in                                                               |
| defaultRoleUser.user.email         | string  | developer.admin@domain.com                                                                     | Email address that you will use to log in                                                          |
| defaultRoleUser.user.emailVerified | boolean | true                                                                                           | Allows you to creates a user without sending a validation email                                    |
| defaultRoleUser.user.password      | string  | @dminD€v                                                                                       | Password you will use to log in                                                                    |

The configuration is customizable by modifying `server.js` and add/modifying items as the following example:
```js
var loopback = require('loopback');
var boot = require('loopback-boot');
var bootCreateAccessToken = require('loopback-boot-create-access-token');

// => Configuration
bootCreateAccessToken.configurations({
    showDebug: false,
    userModelName: "Account",
    defaultRoleUser: {
        name: "admin",
        user: {
            username: "RedekProject",
            email: "contact@redekproject.fr",
            emailVerified: true,
            password: "l00pb@ck@d!n",
            firstName: "Philippe",
            lastName: "Desplats"
        }
    }
});
```

## Testing
Run the unit tests
```js
npm test
```

## Author
- **DESPLATS Philippe** - *Full-stack developer* - [Redek Project](https://github.com/RedekProject/)

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/RedekProject/loopback-boot-create-access-token/blob/master/LICENSE) file for details.