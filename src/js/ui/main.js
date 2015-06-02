(function() {
  'use strict';
  var React = require('react');
  var Router = require('react-router');
  var routes = require('./routes.js');
  
  Router.run(routes, function(Handler, state) {
    React.render(<Handler params={state.params} query={state.query} presentationName="sample_presentation"/>, document.getElementById('main'));
  });
}());
