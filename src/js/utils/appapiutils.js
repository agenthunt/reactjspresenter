(function() {
  'use strict';
  var AppActions = require('../actions/appactions.js');
  var AppConstants = require('../constants/appconstants.js');
  var request = require('superagent');
  var AppAPIUtils = {
    getPresentation: function(name) {
      request.get('/data/' + name + '/' + name + '.json')
        .end(function(err, res) {
          if (res.ok) {
            AppActions.receivePresentation(res.body);
          } else {
            AppActions.receivePresentation(res.text);
          }
        });
    }
  };

  module.exports = AppAPIUtils;

}());
