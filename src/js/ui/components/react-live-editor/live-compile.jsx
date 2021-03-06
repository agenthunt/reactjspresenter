var React = require("react");

var selfCleaningTimeout = {
  componentDidUpdate: function() {
    if(this.timeoutID){
      clearTimeout(this.timeoutID);
    }
  },

  setTimeout: function() {
    if(this.timeoutID){
      clearTimeout(this.timeoutID);
      this.timeoutID = setTimeout.apply(null, arguments);
    }
  }
};

var ComponentPreview = React.createClass({
    propTypes: {
      code: React.PropTypes.string.isRequired
    },

    mixins: [selfCleaningTimeout],

    render: function() {
        return <div id="preview" ref="mount" />;
    },

    componentDidMount: function() {
      this.executeCode();
    },

    componentDidUpdate: function(prevProps) {
      // execute code only when the state's not being updated by switching tab
      // this avoids re-displaying the error, which comes after a certain delay
      if (this.props.code !== prevProps.code) {
        this.executeCode();
      }
    },

    compileCode: function() {
      return JSXTransformer.transform(
          '(function() {' +
              this.props.code +
          '\n})();',
      { harmony: true }
      ).code;
    },

    executeCode: function() {
      var mountNode = this.refs.mount.getDOMNode();

      try {
        React.unmountComponentAtNode(mountNode);
      } catch (e) { }

      try {
        var compiledCode = this.compileCode();
        React.render(eval(compiledCode), mountNode);
      } catch (err) {
        this.setTimeout(function() {
          React.render(
            <div className="playgroundError">{err.toString()}</div>,
            mountNode
          );
        }, 500);
      }
    }
});

module.exports = ComponentPreview;
