import './App.scss';
// import Recipe from './Recipe';
import Creation from './Creation';
import ListArticles from './ListArticles';
import Article from './Article';
import Home from './Home';
import Header from './Header';
import ComputeRecipe from './ComputeRecipe';
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {
            articles: []
        };
    }
    submit(article) {
        let articles = this.state.articles.slice();
        article.ID = articles.length;
        article.creationDate = new Date().toLocaleString();
        articles.push(article);
        this.setState({
            articles: articles
        });
    }
    render() {
        return (
            <div className="App">
                {/*<header className="App-header">*/}
                    {/*<p>*/}
                        {/*Life Diary.*/}
                    {/*</p>*/}
                {/*</header>*/}
                <div>
                    <Router>
                        <Header/>
                        {/*Routing*/}
                        <Switch>
                            <Route path="/computeRecipe">
                                <ComputeRecipe />
                            </Route>
                            <Route path="/articles/new">
                                <Creation submit={this.submit} />
                            </Route>
                            <Route path="/articles/:id">
                                <Article />
                            </Route>
                            <Route path="/articles">
                                <ListArticles articles={this.state.articles}/>
                            </Route>
                            <Route path="/">
                                <Home/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
                {/*<Menu></Menu>*/}
                {/*<Recipe/>*/}
                {/*<Creation submit={this.submit}/>*/}
                {/*<ListArticles articles={this.state.articles}/>*/}
            </div>
        );
    }
}

export default App;
