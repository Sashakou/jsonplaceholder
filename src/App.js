import logo from './logo.svg';
import './App.scss';
import {BrowserRouter, Route} from "react-router-dom";
import DashboardContainer from "./components/DashboardContainer";

function App() {
  return (
      <BrowserRouter>
        <Route exact path="/" render={ () => <DashboardContainer /> } />
      </BrowserRouter>
  );
}

export default App;
