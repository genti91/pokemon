import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import LandingPage from './componentes/landing/LandingPage';
import Home from './componentes/home/Home';
import PokemonCreate from './componentes/create/PokemonCreate';
import Detail from './componentes/detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path = '/' component={LandingPage}/>
          <Route exact path = '/home' component={Home}/>
          <Route exact path = '/addpokemon' component={PokemonCreate}/>
          <Route exact path='/home/:id' component={Detail}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
