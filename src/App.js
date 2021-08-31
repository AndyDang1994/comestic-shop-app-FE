//import './App.css';
import { CloudinaryContext } from "cloudinary-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/home/LandingPage";
import ManageProdList from './components/managements/productManagement/ManageProdList'


function App(props) {
  return (
    <div className="main-page"> 
      <CloudinaryContext
        cloudName={props.cloudName}
        uploadPreset={props.uploadPreset}
      >
        <Router>
          <Switch>
            <Route exact path="/">
              <LandingPage></LandingPage>
            </Route>
            <Route exact path="/products">
              <ManageProdList></ManageProdList>
            </Route>
            {/* <Route exact path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/register">
            <Register></Register>
          </Route> */}
          </Switch>
        </Router>
      </CloudinaryContext>
    </div>
  );
}

export default App;
