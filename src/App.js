import './App.scss';
import Home from './components/Home/Home';
import Products from './pages/Products/Products';
import Header from './components/Header/Header';
import Login from './components/Auth/Login/Login';
import Signup from './components/Auth/Signup/Signup';
import Detail from './components/Product/Detail/Detail';
import Watchlist from './components/Watchlist/Watchlist';
import Cart from './components/Cart/Cart';

import Admin from './pages/Products/Admin';
import AddProduct from './components/AdminPanel/AddProduct';
import Update from './components/Product/Update/Update';

import PrivateRoute from './components/Routes/PrivateRoute';
import AdminRoute from './components/Routes/AdminRoute';
import UserRoute from './components/Routes/UserRoute';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/products' component={Products} />
          <Route path='/product/detail/:id' component={Detail} />
          <Route path='/watchlist' component={Watchlist} />

          <AdminRoute exact path='/admin' component={Admin} />
          <AdminRoute exact path='/product/add' component={AddProduct} />
          <AdminRoute exact path='/product/update/:id' component={Update} />

          <UserRoute path='/cart' component={Cart} />

          <PrivateRoute path='/signup' component={Signup} />
          <PrivateRoute path='/login' component={Login} />

          <Route exact path='/' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
