import React, {useState} from 'react'
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Signup from './components/login/Signup';
import Account from './pages/account/manage/ManageAccount';

import Login from './components/login/Login';
import BottomNavbar from './components/bottomNavbar/BottomNavbar';
import Upload from './components/upload/Upload';
import TopForYou from './pages/home/TopForYou/TopForYou';
import LandingPage from './pages/landingPage/LandingPage';


import Reset from './components/Reset/reset';
import Password from './components/Password/Password';



function App() {

return (
	<>  		
		<Router>
		{/* <Route path='/' exact  component={Upload}/> */}
		<BottomNavbar />
		<Route path='/' exact component={LandingPage} />
		<Route path='/signup' exact  component={Signup}/>
		<Route path='/login' exact  component={Login}/>
		<Route path='/home' exact component={Home}/>
		{/* <Route path='/trending' exact component={Treanding}/>*/}
		<Route path='/create' exact  component={Upload}/>
		{/*<Route path ='/inbox' exact component={Inbox}/> */}
		<Route path='/account' exact component={Account}/>
		</Router>     
	</>
);
}

export default App
