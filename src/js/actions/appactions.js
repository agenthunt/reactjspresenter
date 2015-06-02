(function() {
  'use strict';
  var AppDispatcher = require('../dispatcher/appdispatcher.js');
  var AppConstants = require('../constants/appconstants.js');
  var AppActions = {
    getPresentation: function(name) {
      AppDispatcher.handleViewAction({
        type: AppConstants.GET_PRESENTATION,
        obj: name
      });
    },
    receivePresentation: function(obj) {
      AppDispatcher.handleServerAction({
        type: AppConstants.RECEIVE_PRESENTATION,
        obj: obj
      });
    },
    navigateToSlide: function(name, number) {
      AppDispatcher.handleViewAction({
        type: AppConstants.NAVIGATE_TO_SLIDE,
        obj: {
          name: name,
          number: number
        }
      });
    }
  };
  module.exports = AppActions;
}());
