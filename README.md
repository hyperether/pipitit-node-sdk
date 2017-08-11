**Pipitit**
[![npm version](https://badge.fury.io/js/pipitit-node.png)](https://badge.fury.io/js/pipitit-node)  [![Build Status](https://secure.travis-ci.org/plivo/plivo-node.png?branch=master)](http://travis-ci.org/plivo/plivo-node) 

![Pipitit Logo](https://github.com/hyperether/pipitit-android-sdk/blob/master/Pipitit_Logo_450x100.png)

Pipitit allows you to send Push, SMS, Email and WebSocket notifications to your customers.

Register multiple applications and get application key for each one of them. This way Pipitit allows you to target your clients on application premises.

Track the status of each Campaign. Our dashboard allows you to track not only Campaign status, but the status of each message in specific Campaign.


**Node.JS SDK**

Installation
---------------
Installing using npm (node package manager):
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm install pipitit-node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Dependencies

Required Dependencies:
* [request](https://github.com/mikeal/request)

Dev Dependencies (for running tests):
* [nock](https://github.com/flatiron/nock)
* [mocha](http://visionmedia.github.com/mocha/)

## Initialisation
        var pipitit = require('pipitit-node');
        
        var pipit = pipitit.init({
            authId: '<your AUTH ID>', 
            auth_secret: '<your AUTH SECRET>'
        });
        
## Usage

        pipit.app_create({name: 'test_app'}, function(status, response){
            if (status != 200 ){
                console.log('ERROR! Didn't create application.');
                console.log('Status:', status);
                console.log('Response:', response);
            } else {
                console.log('YEA! Successfully created application.');
                console.log('Status:', status);
                console.log('Response:', response);
            }
        })
        
## Tests
To run tests:
`npm test`
or
`mocha --reporter spec`

## License
-------
*pipitit-node* is licensed under the MIT License.