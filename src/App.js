import Navbar from './components/navbar/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './components/login/Signup';
import Account from './pages/account/manage/ManageAccount';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home}/>
          {<Route path='/login' exact  component={Login}/>}
          <Route path='/account' exact component={Account}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
