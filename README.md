**Pipitit**

![Pipitit Logo](https://github.com/hyperether/pipitit-android-sdk/blob/master/Pipitit_Logo_450x100.png)

Pipitit allows you to send Push, SMS, Email and WebSocket notifications to your customers.

Register multiple applications and get application key for each one of them. This way Pipitit allows you to target your clients on application premises.

Track the status of each Campaign. Our dashboard allows you to track not only Campaign status, but the status of each message in specific Campaign.


**Node.JS SDK**

Installation
---------------
Installing using npm (node package manager):
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm install pipitit

## Dependencies

Required Dependencies:
* [request](https://github.com/mikeal/request)

Dev Dependencies (for running tests):
* [nock](https://github.com/flatiron/nock)
* [mocha](http://visionmedia.github.com/mocha/)

**Usage**
        var pipitit = require('pipitit');
        
        var pipit = pipitit.init({authId: '123', auth_secret: '123'});