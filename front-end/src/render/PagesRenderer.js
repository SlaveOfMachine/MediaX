import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Pages from './Pages';


class PagesRenderer extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact component={Pages.Login} />
                    <Route path='/register' exact component={Pages.Register} />
                </Switch>
            </Router>
        )
    }
}

export default PagesRenderer;