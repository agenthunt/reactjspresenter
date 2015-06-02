var React = require('react');


var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var AppActions = require('../actions/appactions.js');


var ReactJSPresenter = React.createClass({
  render: function() {
    return (<RouteHandler {...this.props}/>);
  }

});

module.exports = ReactJSPresenter;
