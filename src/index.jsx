import React from "react";
import ReactDOM from "react-dom";
import MainView from './components/main-view/main-view';

//import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

//main component
class MooViesApplication extends React.Component {
    render() {
        return (
            <MainView />
        ); 
    }
}

//finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MooViesApplication), container);
