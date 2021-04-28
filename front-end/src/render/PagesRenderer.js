import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation  
} from "react-router-dom";
import Pages from './Pages';

class PagesRenderer extends React.Component {

    state = {
        routes: {
            login: { path: '/', auth: false },
            register: { path: '/register', auth: false },
            dashboard: { path: '/dashboard', auth: true },
        },
    }


    componentDidMount() {
        // console.log(this.props);
        console.log(<Main />, 'as');
        
    }

    render() {
        const { routes } = this.state;        

        return (
            <Router>
                <Switch>
                    <Route path={routes.login.path} exact component={Pages.Login} />
                    <Route path={routes.register.path} exact component={Pages.Register} />
                    <Route path={routes.dashboard.path} exact component={Pages.Dashboard} />
                </Switch>
            </Router>
        )
    }
}

const Main = ({ children }) => {
    const location = useLocation();
    return location.pathname;
};



export default PagesRenderer;