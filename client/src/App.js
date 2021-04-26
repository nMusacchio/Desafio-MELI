import NavBar from './components/NavBar';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Products from './components/Products';
import ProductDetailContainer from './components/ProductDetailContainer';
import Home from './components/Home';
import {HelmetProvider} from 'react-helmet-async';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <HelmetProvider>
          <Switch>
              <Route path="/items" exact>
                <Products />
              </Route>
              <Route path="/items/:id" exact>
                <ProductDetailContainer />
              </Route>
              <Route path="/" exact>
                <Home />
              </Route>
          </Switch>
        </HelmetProvider>
      </Router>
    </div>
  );
}

export default App;
