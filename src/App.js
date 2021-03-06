import React, {useState} from 'react'
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Signup from './components/login/Signup';
import Account from './pages/account/manage/ManageAccount';
import Login from './components/login/Login';
import BottomNavbar from './components/bottomNavbar/BottomNavbar';
import Upload from './components/upload/Upload';
import Chat from './components/inbox/messageChat/Chat';
import Inbox from './components/inbox/Inbox';
import LandingPage from './pages/landingPage/LandingPage';
import Trending from './pages/trending/Trending';


function App() {

return (
	<>  		
		<Router>
		<BottomNavbar />
		<Route path='/' exact component={LandingPage} />
		<Route path='/signup' exact  component={Signup}/>
		<Route path='/login' exact  component={Login}/>
		<Route path='/home' exact component={Home}/>
		<Route path='/trending' exact component={Trending}/>
		<Route path='/create' exact  component={Upload}/>
		<Route path ='/inbox' exact component={Inbox}/>
		<Route path='/chat' exact  component={Chat}/>
		<Route path='/account' exact component={Account}/>
		</Router>     
	</>
);
}

export default App
