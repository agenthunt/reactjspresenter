(function () {
  'use strict';
  var React = require('react');
  var Router = require('react-router');
  var Route = Router.Route;
  var DefaultRoute = Router.DefaultRoute;
  var RouteHandler = Router.RouteHandler;
  var Redirect = Router.Redirect;
  var Link = Router.Link;
  var NotFoundRoute = Router.NotFoundRoute;
  var NotFound = require('./notfound.js');
  var ReactJSPresenter = require('./reactjspresenter.js');
  var Slide = require('./slide.js');

  var routes = (
    <Route name="reactjspresenter" path="/" handler={ReactJSPresenter}>
      <DefaultRoute handler={Slide}/>
      <Redirect from="/" to="/slide/0" />
      <NotFoundRoute handler={NotFound}/>
      <Route key="slide" name="slide" path="/slide/:number" handler={Slide}></Route>
    </Route>
  );

  module.exports = routes;
}());
