import React, {useState} from 'react'
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Signup from './components/login/Signup';
import Account from './pages/account/manage/ManageAccount';
import Login from './components/login/Login';
import BottomNavbar from './components/bottomNavbar/BottomNavbar';
import LandingPage from './pages/landingPage/LandingPage';
import { Redirect } from 'react-router-dom';

function App() {

// const LandingContainer = () =>(
// 	<div className='container'>
// 		<Route exact path='/' render={() => <Redirect to="/landing"/>} />
// 		<Route Route path='/landing' exact component={LandingPage}/>
// 		<Route path='/signup' exact  component={Signup}/>
// 		<Route path='/login' exact  component={Login}/>
// 	</div>
// )

// const DefaultContainer = () => (
// 	<div>
//     <Header toggleAlert={this.toggleAlert} />
// 	<div className='container'>
// 			<BottomNavbar />
// 			<Route path='/home' exact component={Home}/>
// 			{/* <Route path='/trending' exact component={Treanding}/>
// 			<Route path='/create' exact  component={Create}/>
// 			<Route path ='/inbox' exact component={Inbox}/> */}
// 			<Route path='/account' exact component={Account}/>
// 			{this.state.isAlertOpen ? <Alert /> : null}
//     </div>
// 	</div>
// )

// return (
// 	<>  		
// 		<Router>
// 		<Route exact path="/(landing)" component={LandingContainer}/>
//     	<Route component={DefaultContainer}/>
// 		</Router>     
// 	</>
// );
// }

return (
	<>  		
		<Router>
		<Route exact path='/' render={() => <Redirect to="/landing"/>} />
		<Route Route path='/landing' exact component={LandingPage}/>
		<Route path='/signup' exact  component={Signup}/>
		<Route path='/login' exact  component={Login}/>
		<div>
			<BottomNavbar />
				<Route path='/home' exact component={Home}/>
				{/* <Route path='/trending' exact component={Treanding}/>
				<Route path='/create' exact  component={Create}/>
				<Route path ='/inbox' exact component={Inbox}/> */}
				<Route path='/account' exact component={Account}/>
		</div>
		</Router>     
	</>
);
}

export default App
