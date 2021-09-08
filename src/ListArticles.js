import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Article from './Article';


class ListArticles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <ul>
                {this.props.articles.map((value, index) => {
                    return <li> <Article article={value}/> </li>
                    // return <li key={value.ID}> {JSON.stringify(value)} </li>
                })}
            </ul>
        );
    }
}
export default ListArticles;