(function() {
  'use strict';
  var React = require('react');
  var StyleSheet = require('react-style');
  var AppStore = require('../stores/appstore.js');
  var AppActions = require('../actions/appactions.js');
  var Router = require('react-router');
  var State = Router.State;
  var Link = Router.Link;
  var Navigation = Router.Navigation;
  var Navigator = require('./components/navigator.js');
  var StyleSheet = require('react-style');
  var objectMerge = require('object-merge');
  var ReactCSSTransitionGroupAppear = require('./components/reactcsstransitiongroupappear.js');
  var ReactPlayground = require('./components/react-live-editor/live-editor.jsx');
  var HELLO_COMPONENT = "\
\
var HelloMessage = React.createClass({\n\
  render: function() {\n\
    return <div>Hello {this.props.name}</div>;\n\
  }\n\
});\n\
\
\n\
React.render(<HelloMessage/>,document.getElementById('preview'));\
";


  var styles = StyleSheet.create({
    footer: {
      position: 'fixed',
      bottom: 0,
      height: '10%',
      width: '98%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      left: '1%'
    },
    header: {
      position: 'fixed',
      top: '5%',
      height: '10%',
      width: '98%',
      display: 'flex',
      margin: 'auto',
      left: '1%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    navigator: {
      marginRight: 20
    },
    content: {
      position: 'fixed',
      width: '96%',
      height: '85%',
      top:'12%',
      bottom:'3%',
      right:'2%',
      left:'2%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    listItem: {
      marginTop: 10
    },
    title:{
      fontSize:'6.4vmin'
    },
    twocolumn:{
      width:'90%',
      display:'flex',
      fontSize:'6.4vmin',
      justifyContent:'space-around'
    }    
  });

  var Slide = React.createClass({
    mixins: [Navigation, State],
    getInitialState: function() {
      return AppStore.getState();
    },
    onAppStoreChange: function() {
      this.setState(AppStore.getState());
    },
    componentDidMount: function() {
      this.processProps(this.props);
      AppStore.addChangeListener(this.onAppStoreChange);
      window.addEventListener('keydown',this.onKeyDown);
    },
    componentWillUnmount: function() {
      AppStore.removeChangeListener(this.onAppStoreChange);
    },
    componentWillReceiveProps: function(nextProps) {
      this.processProps(nextProps);
    },
    onLeftClicked: function() {
      if (this.state.currentSlideNumber > 0) {
        var newSlideNumber = Number(this.state.currentSlideNumber) - 1;
        this.transitionTo('slide', {
          number: newSlideNumber
        });
      }
    },
    onRightClicked: function() {
      if (this.state.currentSlideNumber < this.state.slidesCount - 1) {
        var newSlideNumber = Number(this.state.currentSlideNumber) + 1;
        this.transitionTo('slide', {
          number: newSlideNumber
        });
      }
    },
    onDownClicked: function() {
      if (this.state.visibleSectionsCount < this.state.currentSlideContent.sections.length) {
        var newVisibleSectionsCount = this.state.visibleSectionsCount + 1;
        this.setState({
          visibleSectionsCount: newVisibleSectionsCount
        });
      }
    },
    onUpClicked: function() {
      if (this.state.visibleSectionsCount > 1) {
        var newVisibleSectionsCount = this.state.visibleSectionsCount - 1;
        this.setState({
          visibleSectionsCount: newVisibleSectionsCount
        });
      }
    },
    onKeyDown: function(e) {
      if(e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 40){
        if(e.target.tagName === 'codesection' || e.target.tagName === 'TEXTAREA'){
          e.preventDefault();
          return false;
        }
      }
      switch (e.keyCode) {
        case 37: //left
          this.onLeftClicked();
          break;
        case 39: //right
          this.onRightClicked();
          break;
        case 38: //up
          this.onUpClicked();
          break;
        case 40: //down
          this.onDownClicked();
          break;
        default:
          break;
      }
    },
    processProps: function(props) {
      var slideNumber = props.params.number;
      if (slideNumber === undefined) {
        slideNumber = 0;
      }
      AppActions.navigateToSlide(this.props.presentationName, slideNumber);
    },
    renderSections: function(section) {
      switch (section.type) {
        case "text":
          return (<div style={section.style}>{section.content}</div>)
        case "livecode":
          return (<div id="codesection" style={section.style}>
            <ReactPlayground javascriptCode={section.javascriptCode} htmlCode={section.htmlCode} cssCode={section.cssCode}/>
          </div>);
        case "image":
          return (
                  <img style={section.style} src={section.url}/>
                );
      case "twocolumn":
          return (
            <div style={styles.twocolumn}>
              <div>
                <h1>{section.leftContentTitle}</h1>
                {section.leftContent.map(function(item){
                  return (<div>{item}</div>);
                })}
              </div>
              <div>
                <h1>{section.rightContentTitle}</h1>
                {section.rightContent.map(function(item){
                  return (<div>{item}</div>);
                })}
              </div>
            </div>);
        case "pre":
          return (<pre style={section.style}>{section.content}</pre>);
        case "link":
          return (<a style={section.style} href={section.url}>{section.url}</a>);
        default:
          break;
      }
    },
    displaySlideContent: function(slideContent) {
      if (!slideContent) {
        return null;
      }
      var that = this;

      var visibleSections = slideContent.sections.slice(0, this.state.currentSlideContent.sections.length);
      return (
        <div>
          <div style={styles.header}><div style={styles.title}>{slideContent.title && slideContent.title}</div></div>
          <ul>
            {visibleSections && visibleSections.map(function(itemData,index){
              return (
                <li key={index} style={styles.listItem}>
                  {that.renderSections(itemData)}
                </li>);
            })}
          </ul>
          
        </div>
      );
    },
    render: function() {
      return (
        <div>
            <div  key={this.getPath() + this.getParams().number} styles={styles.content}  >
              {this.displaySlideContent(this.state.currentSlideContent)}
            </div>
          <div style={styles.footer}>
            <div style={styles.navigator}>
                <Navigator leftEnabled={this.props.params.number > 0 } rightEnabled={this.props.params.number < this.state.slidesCount - 1} onLeftClicked={this.onLeftClicked} onRightClicked={this.onRightClicked} downEnabled={this.state.currentSlideContent && this.state.visibleSectionsCount < this.state.currentSlideContent.sections.length} onDownClicked={this.onDownClicked} upEnabled={this.state.currentSlideContent && this.state.visibleSectionsCount > 1 } onUpClicked={this.onUpClicked}/>
              </div>
            </div>
        </div>
      );
    }

  });

  module.exports = Slide;

}());
