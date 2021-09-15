import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'cassoulet'
        };
    }
    render() {
        return (
            <p className="Article-recipe">
                {this.state.title}
            </p>
        );
    }
    // how tu use props and state in same function
    doTheMultiplication() {
        this.setState(function (prevState, props) {
            return {
                value: prevState.thingToMultiply * props.multiplier
            };
        });
    }
}
export default Recipe;