(function() {
  'use strict';
  var React = require('react');
  var StyleSheet = require('react-style');

  var fontSize = 30;
  var disabledOpacity = 0.3;
  var styles = StyleSheet.create({
    main: {
      display: 'flex',
      alignItems: 'center'
    },
    left: {
      fontSize: fontSize,
      opacity: disabledOpacity
    },
    right: {
      fontSize: fontSize,
      opacity: disabledOpacity
    },
    middle: {
      display: 'flex',
      flexDirection: 'column'
    },
    up: {
      fontSize: fontSize,
      opacity: disabledOpacity
    },
    down: {
      marginTop: 20,
      fontSize: fontSize,
      opacity: disabledOpacity
    },
    hover: {
      color: '#1874CD',
      cursor:'pointer'
    },
    enabled:{
      opacity: 1.0
    }
  });

  var Navigator = React.createClass({
    getInitialState: function() {
      return {
        left: {
          hovered: false
        },
        right: {
          hovered: false
        },
        up: {
          hovered: false
        },
        down: {
          hovered: false
        }
      };
    },
    onMouseOver: function(which) {
      switch (which) {
        case 'left':
          var leftState = this.state.left;
          leftState.hovered = true;
          this.setState({
            left: leftState
          });
          break;
        case 'right':
          var rightState = this.state.right;
          rightState.hovered = true;
          this.setState({
            right: rightState
          });
          break;
        case 'up':
          var upState = this.state.up;
          upState.hovered = true;
          this.setState({
            up: upState
          });
          break;
        case 'down':
          var downState = this.state.down;
          downState.hovered = true;
          this.setState({
            down: downState
          });
          break;
        default:
          break;
      }
    },
    onMouseOut: function(which) {
      switch (which) {
        case 'left':
          var leftState = this.state.left;
          leftState.hovered = false;
          this.setState({
            left: leftState
          });
          break;
        case 'right':
          var rightState = this.state.right;
          rightState.hovered = false;
          this.setState({
            right: rightState
          });
          break;
        case 'up':
          var upState = this.state.up;
          upState.hovered = false;
          this.setState({
            up: upState
          });
          break;
        case 'down':
          var downState = this.state.down;
          downState.hovered = false;
          this.setState({
            down: downState
          });
          break;
        default:
          break;
      }
    },
    render: function() {
      return (
        <div styles={styles.main}>
        <div styles={[styles.left,this.props.leftEnabled && styles.enabled,this.props.leftEnabled && this.state.left.hovered && styles.hover]} onMouseOver={this.onMouseOver.bind(this,'left')} onMouseOut={this.onMouseOut.bind(this,'left')} onClick={this.props.onLeftClicked}>
          <div className="arrow_left"/>
        </div>

        <div styles={styles.middle}>
          <div styles={[styles.up,this.props.upEnabled && styles.enabled,this.props.upEnabled && this.state.up.hovered && styles.hover]} onMouseOver={this.onMouseOver.bind(this,'up')} onMouseOut={this.onMouseOut.bind(this,'up')} onClick={this.props.onUpClicked}>
            <div className="arrow_up"/>
          </div>
          <div styles={[styles.down,this.props.downEnabled && styles.enabled,this.props.downEnabled && this.state.down.hovered && styles.hover]} onMouseOver={this.onMouseOver.bind(this,'down')} onMouseOut={this.onMouseOut.bind(this,'down')} onClick={this.props.onDownClicked}>
            <div className="arrow_down"/>
          </div>
        </div>
      
      <div styles={[styles.right,this.props.rightEnabled && styles.enabled,this.props.rightEnabled && this.state.right.hovered && styles.hover]} onMouseOver={this.onMouseOver.bind(this,'right')} onMouseOut={this.onMouseOut.bind(this,'right')} onClick={this.props.onRightClicked}>
          <div className="arrow_right"/>
      </div>
    </div>
      );
    }

  });

  module.exports = Navigator;
}());
