import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
    return (
        <Router>
            <Switch>
                {/* <Route path="/dashboard" exact component={Dashboard} /> */}
                <Route path="/dashboard" element={<Dashboard />} />
            </Switch>
        </Router>
    );
}

export default App;