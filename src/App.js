import Navbar from './components/Navbar/navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Signup from './components/login/Signup';
import Account from './pages/account/manage/ManageAccount';

import Login from './components/login/Login';
import BottomNavbar from './components/bottomNavbar/BottomNavbar';

import Reset from './components/Reset/reset';



function App() {
  return (
    <>  
      <Router>
        <BottomNavbar/>

       
      
        

          <Route path='/' exact component={Home}/>
          <Route path='/signup' exact  component={Signup}/>
          <Route path='/account' exact component={Account}/>


          <Route path='/reset' exact component={Reset}/>
          
      
      </Router>
      
    </>
  );
}

export default App;
