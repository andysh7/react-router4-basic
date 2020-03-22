import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Toolbar from './components/Toolbar';
import Content from './components/Content';
import Sidenav from './components/Sidenav';

import Home from './pages/Home';
import About from './pages/About';
import Books from './pages/Books';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Book from './pages/Book';
import NotFound from './pages/NotFound';

class App extends Component {
    state = {
        user: null
    }

    login = user => {
        console.log(user);
        this.setState({ user }, () => {
            this.props.history.push('/books');
        });
        // go to /books
    }

    logout = () => {
        this.setState({ user: null }, () => {
            this.props.history.push('/');
        });
        // go to /
    }

    render() {
        console.log('render app');
        return (
            <div className="app">
                <Toolbar user={this.state.user} />
                
                <Content>
                    <Route path="/books" render={() => <Sidenav topics={this.props.topics}/>}></Route>

                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/about" component={About}/>
                        <PrivateRoute exact path="/books/:topic?" component={Books} user={this.state.user} data={this.props.books} />
                        <PrivateRoute path="/books/:topic/:book" component={Book} user={this.state.user} data={this.props.books} />
                        <Route path="/login" render={props => <Login onLogin={this.login}/>}/>
                        <Route path="/logout" render={props => <Logout onLogout={this.logout}/>}/>
                        <Route exact component={NotFound}/>
                    </Switch>
                </Content>
            </div>
        );
    }
}

export default withRouter(App);