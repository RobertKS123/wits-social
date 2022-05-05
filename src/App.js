import Navbar from './components/navbar/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Signup from './components/login/Signup';
import Account from './pages/account/manage/ManageAccount';
import Login from './components/login/Login';
import BottomNavbar from './components/bottomNavbar/BottomNavbar';
import LandingPage from './pages/landing_page/LandingPage';
import TopForYou from './pages/home/TopForYou/TopForYou';

function App() {
  return (
    <>
      <Router>

          <Route path='/' exact component={Home}/>
          <Route path='/signup' exact  component={Signup}/>
          {/* <Route path='/login' exact  component={Login}/> */}
          <Route path='/account' exact component={Account}/>
          <Route path='/landing_page' exact component={LandingPage}/>
          <BottomNavbar/>
      </Router>

    </>
  );
}

export default App;
