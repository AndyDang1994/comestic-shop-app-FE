//import './App.css';
import { CloudinaryContext } from "cloudinary-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/home/LandingPage";
import ManageProdList from './components/managements/productManagement/ManageProdList'
import { PrivateAuthen } from "./_helper/PrivateAuthen";
import { connect } from "react-redux";
import ManagePromotion from "./components/managements/productManagement/ManagePromotion"

function App(props) {
  const {userInfor} = props
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
            <PrivateAuthen exact path="/products" component={ManageProdList} user={userInfor}/> 
            <PrivateAuthen exact path="/promotion" component={ManagePromotion} user={userInfor}/> 
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
export default connect(mapStateToProps, null)(App);
//export default App;
