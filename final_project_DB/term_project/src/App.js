import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RentPage from "./components/pages/RentPage";
import SignupPage from "./components/pages/SignupPage";
import SellPage from "./components/pages/SellPage";
import BuyPage from "./components/pages/BuyPage";
import Display from "./components/pages/display";

import './App.css';

const App = () => (
<div className="App">
  <Route path="/" exact="exact" component={HomePage}/>
  <Route path="/login" exact="exact" component={LoginPage}/>
  <Route path="/signup" exact="exact" component={SignupPage}/>
  <Route path="/rent" exact="exact" component={RentPage}/>
  <Route path="/sell" exact="exact" component={SellPage}/>
  <Route path="/buy" exact="exact" component={BuyPage}/>
  <Route path="/dashboard" exact="exact" component={Display}/>
</div>);

export default App;
