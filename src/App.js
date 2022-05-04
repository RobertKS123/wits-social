import Navbar from './components/navbar/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Signup from './components/login/Signup';
import Account from './pages/account/manage/ManageAccount';
import Login from './components/login/Login';
import BottomNavbar from './components/bottomNavbar/BottomNavbar';

function App() {
return (
	<>  
		<Router>
		<BottomNavbar/>
			<Route path='/' exact component={Home}/>
			{/* <Route path='/trending' exact component={Treanding}/>
			<Route path='/create' exact  component={Create}/>
			<Route path ='/inbox' exact component={Inbox}/> */}
			<Route path='/account' exact component={Account}/>
			<Route path='/signup' exact  component={Signup}/>
			<Route path='/login' exact  component={Login}/>
		</Router>     
	</>
);
}

export default App;
