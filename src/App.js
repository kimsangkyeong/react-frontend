import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserComponent from './components/UserComponent';
import EmployeeComponent from './components/EmployeeComponent';
import ListEmployeeCompoent from './components/ListEmployeeCompoent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
          <HeaderComponent />
            <div className="container">
              <Switch>
                <Route path="/" exact component = {ListEmployeeCompoent}></Route>
                <Route path="/employees" component = {ListEmployeeCompoent}></Route>
                // step 1
                <Route path="/add-employee/:id" component = {CreateEmployeeComponent}></Route>
                {/* <Route path="/add-employee" component = {CreateEmployeeComponent}></Route> */}
                {/* <Route path="/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}
                <Route path="/view-employee/:id" component = {ViewEmployeeComponent}></Route>
                <Route path="/users" component = {UserComponent }></Route>
              </Switch>
            </div>
          <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
