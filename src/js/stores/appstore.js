(function() {
  'use strict';

  var AppDispatcher = require('../dispatcher/appdispatcher.js');
  var EventEmitter = require('events').EventEmitter;
  var AppConstants = require('../constants/appconstants.js');
  var AppAPIUtils = require('../utils/appapiutils.js');
  var assign = require('object-assign');

  var presentation;
  var currentSlideNumber = 0;
  var currentSlideContent = null;
  var slidesCount = 0;
  var visibleSectionsCount = 1;

  var AppStore = assign({}, EventEmitter.prototype, {
    getState: function() {
      return {
        currentSlideNumber: currentSlideNumber,
        currentSlideContent: currentSlideContent,
        slidesCount: slidesCount,
        visibleSectionsCount:visibleSectionsCount
      }
    },

    getCurrentSlideContent: function(number) {
      if (!presentation)
        return '';
      return presentation.slides[number];
    },
    getSlidesCount: function() {
      if (!presentation)
        return 0;

      return presentation.slides.length;
    },

    emitChange: function() {
      this.emit(AppConstants.CHANGE);
    },
    addChangeListener: function(callback) {
      this.on(AppConstants.CHANGE, callback);
    },
    removeChangeListener: function(callback) {
      this.removeListener(AppConstants.CHANGE, callback);
    },
    //data and action flows from server to views
    handleServerAction: function(action) {
      switch (action.type) {
        case AppConstants.RECEIVE_PRESENTATION:
          presentation = action.obj;
          currentSlideContent = presentation.slides[currentSlideNumber];
          slidesCount =  presentation.slides.length;
          visibleSectionsCount = currentSlideContent.visibleSectionsCount;
          this.emitChange();
          break;
        default:
      }
    },
    //data and action flows from views to server
    handleViewAction: function(action) {
      switch (action.type) {
        case AppConstants.GET_PRESENTATION:
          AppAPIUtils.getPresentation(action.obj);
          break;
        case AppConstants.NAVIGATE_TO_SLIDE:
          currentSlideNumber = action.obj.number;
          if (presentation) {
            currentSlideContent = presentation.slides[currentSlideNumber];
            this.emitChange();
          } else {
            AppAPIUtils.getPresentation(action.obj.name);
          }
          break;
        default:

      }
    },
    dispatcherIndex: AppDispatcher.register(function(payload) {
      try {
        switch (payload.source) {
          case AppConstants.SERVER_ACTION:
            AppStore.handleServerAction(payload.action);
            break;
          case AppConstants.VIEW_ACTION:
            AppStore.handleViewAction(payload.action);
            break;
          default:
        }
      } catch (e) {
        console.error(e);
      }
    })

  });


  module.exports = AppStore;
}());
