var assert = require('assert');
var nock = require('nock');
var pipitit = require('../lib/pipitit');

describe('Pipipit SDK Tests', function() {
  describe('Initialisation Tests', function() {
    it('init - fail - config is not provided.', function () {
      assert.throws(
        function () {
          var r = pipitit.init();
        }
      );
    });

    it('init - fail - config is not an object.', function () {
      assert.throws(
        function () {
          var r = pipitit.init();
        }
      );
    });

    it('init - fail - config provided without authId and auth_secret', function () {
      assert.throws(
        function () {
          var r = pipitit.init({});
        }
      );
    });

    it('init - fail - config provided without authId', function () {
      assert.throws(
        function () {
          var r = pipitit.init({auth_secret: '123'});
        }
      );
    });

    it('init - fail - config provided without auth_secret', function () {
      assert.throws(
        function () {
          var r = pipitit.init({authId: '123'});
        }
      );
    });

    it('init - success - initialise and returns pipitit SDK when proper config is provided.', function () {
      assert.equal('object', typeof pipitit.init({authId: '123', auth_secret: '123'}));
    });
  });

  describe('API Tests', function() {
    var pipit = pipitit.init({authId: '123', auth_secret: '123'});

        var endpoint = nock(pipit.options.protocol+'://' + pipit.options.host);
        endpoint.post('/app/create')
                .reply(200, JSON.stringify({id: 1}))
                .delete('/1/app')
                .reply(200, JSON.stringify({}));;

    it('API - success - created app.', function () {
      pipit.app_create({name: 'test_app'}, function(status, response){
        assert.equal(200, status);
        assert.equal('object', typeof response);
        assert.equal(1, typeof response.id);
      })
    });

    it('API - success - deleted app.', function () {
      pipit.app_delete(1, function(status){
        assert.equal(200, status);
      })
    });


  });

});
