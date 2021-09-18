//import './App.css';
import { CloudinaryContext } from "cloudinary-react";
import { history } from "./_helper/history";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/home/LandingPage";
import ManageProdList from './components/managements/productManagement/ManageProdList'
import { connect } from "react-redux";

function App(props) {
  // requireAuth = (nextState,replace)=>{
  //   if(!this.props.userInfor.isLoggedIn) 
  //    replace('/');
  // }
  return (
    <div className="main-page"> 
      <CloudinaryContext
        cloudName={props.cloudName}
        uploadPreset={props.uploadPreset}
      >
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <LandingPage></LandingPage>
            </Route>
            <Route exact path="/products"  >
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
const mapStateToProps = (state) => {
  return {
      userInfor: state.authState
  };
};

//export default App;
export default connect(mapStateToProps, null)(App);