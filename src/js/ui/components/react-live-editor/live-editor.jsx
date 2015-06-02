var React = require("react");

var CodeMirrorEditor = require("./code-mirror-editor.jsx");
var ComponentPreview = require("./live-compile.jsx");

var ReactPlayground = React.createClass({
  propTypes: {
    javascriptCode: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      javascriptCode: this.props.javascriptCode,
      htmlCode:this.props.htmlCode,
      cssCode:this.props.cssCode
    };
  },

  handleCodeChange: function(javascriptCode) {
    this.setState({ javascriptCode });
  },

  render: function() {
    return <div className="playground">
      <div className="playgroundCode">
      <div className="htmlCode">
        <CodeMirrorEditor key="html"
                          className="playgroundStage"
                          codeText={this.state.htmlCode} />
        <span className="html-logo" ></span>
      </div>
        <div className="javascriptCode">
        <CodeMirrorEditor key="jsx"
                          onChange={this.handleCodeChange}
                          className="playgroundStage"
                          codeText={this.state.javascriptCode} />
        <span className="js-logo" ></span>
      </div>
      {/*<div className="cssCode">
              <span className="css-logo" ></span>
      </div>*/}
      </div>
      {this.props.hidePreview && this.props.hidePreview === true ?'':
      ( <div><h2>Live Preview</h2>
        <div className="playgroundPreview">

        <ComponentPreview code={this.state.javascriptCode} />
      </div>
      </div>)}
    </div>;
  },
});

module.exports = ReactPlayground;
