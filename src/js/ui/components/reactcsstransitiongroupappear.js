(function (window) {
  'use strict';
  var React = require('react/addons'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    ReactCSSTransitionGroupAppear;

  ReactCSSTransitionGroupAppear = React.createClass({
    propTypes: {
      transitionName: React.PropTypes.string.isRequired,
      transitionEnter: React.PropTypes.bool,
      transitionLeave: React.PropTypes.bool,
      transitionAppear: React.PropTypes.bool,
      component: React.PropTypes.string,
      className: React.PropTypes.string
    },
    getInitialState: function () {
      return {
        mounted: false
      };
    },
    getDefaultProps: function () {
      return {
        transitionEnter: true,
        transitionLeave: true,
        transitionAppear: true,
        component: 'div',
        className: ''
      };
    },
    componentDidMount: function () {
      this.setState({
        mounted: true
      });
    },
    render: function () {
      var children;
      if (!this.props.transitionAppear) {
        children = this.props.children;
      } else {
        if (this.state.mounted) {
          children = this.props.children;
        }
      }
      return (
        <ReactCSSTransitionGroup
          transitionName={this.props.transitionName}
          transitionEnter={this.props.transitionEnter}
          transitionLeave={this.props.transitionLeave}
          component={this.props.component}
          className={this.props.className}>
            {children}
        </ReactCSSTransitionGroup>
      )
    }
  })

  module.exports = ReactCSSTransitionGroupAppear;
}());