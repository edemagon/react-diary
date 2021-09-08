import React from 'react';
import ReactDOM from 'react-dom';
// import './Article.css';
import './index.css';

class ListArticles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div className="Article-display">
                <p>
                    Type: {this.props.article.type} <br/>
                    {this.props.article.title} <br/>
                    creation date: {this.props.article.creationDate} <br/>
                    {this.props.article.content}
                </p>
            </div>
        );
    }
}
export default ListArticles;