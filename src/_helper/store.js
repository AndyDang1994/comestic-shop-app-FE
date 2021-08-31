import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import authreducer from "../redux/reducers/AuthReducer";
import thunk from "redux-thunk";
import authErrorReducer from "../redux/reducers/AuthErrorReducer";
import { ProductReducer } from "../redux/reducers/ProductReducer";
import { LoadingReducer } from "../redux/reducers/loadingToggleReducer";
import { AlertReducer } from "../redux/reducers/AlertReducer";
import { MetaDataReducer } from "../redux/reducers/MetaDataReducer";
import { cloudinaryReducer } from "../redux/reducers/CloudinaryReducer";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  authState: authreducer,
  authError: authErrorReducer,  
  AllProducts : ProductReducer,
  loading : LoadingReducer,
  alert : AlertReducer,
  MetaData : MetaDataReducer,
  cloudinaryPhoto : cloudinaryReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
  //composeEnhancers(applyMiddleware(epicMiddleware))
);
//epicMiddleware.run(rootEpic);
export default store;
