(function() {
  'use strict';

  var Dispatcher = require('flux').Dispatcher,
    async = require('async'),
    AppConstants = require('../constants/appconstants.js'),
    assign = require('object-assign'),
    AppDispatcher,
    queue;

  queue = async.queue(function(task, callback) {
    var payload = {
      source: task.source,
      action: task.action
    };
    AppDispatcher.dispatch(payload);
    callback();
  }, 1); // only one worker, one event at a time

  AppDispatcher = assign(new Dispatcher(), {
    handleServerAction: function(action) {
      console.log('server action', action);

      if (!action.type) {
        throw new Error('Empty action.type: you likely mistyped the action.');
      }

      if (AppDispatcher.isDispatching()) {
        queue.push({
          source: 'SERVER_ACTION',
          action: action
        });
      } else {
        AppDispatcher.dispatch({
          source: AppConstants.SERVER_ACTION,
          action: action
        });
      }
    },

    handleViewAction: function(action) {
      console.log('view action', action);

      if (!action.type) {
        throw new Error('Empty action.type: you likely mistyped the action.');
      }

      if (AppDispatcher.isDispatching()) {
        queue.push({
          source: 'VIEW_ACTION',
          action: action
        });
      } else {
        AppDispatcher.dispatch({
          source: AppConstants.VIEW_ACTION,
          action: action
        });
      }
    }
  });

  module.exports = AppDispatcher;
}());
