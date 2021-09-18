import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import './App.css';
import Navbar from './componets/Navbar';
import BasicCharts from "./views/BasicCharts";
import BasicTables from "./views/BasicTables";
import Home from "./views/Home";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/basic-charts" component={BasicCharts} />
          <Route path="/basic-tables" component={BasicTables} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
