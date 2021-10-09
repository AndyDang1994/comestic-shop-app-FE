import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import authreducer from "../redux/reducers/AuthReducer";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import authErrorReducer from "../redux/reducers/AuthErrorReducer";
import { ProductReducer } from "../redux/reducers/ProductReducer";
import { LoadingReducer } from "../redux/reducers/loadingToggleReducer";
import { AlertReducer } from "../redux/reducers/AlertReducer";
import { MetaDataReducer } from "../redux/reducers/MetaDataReducer";
import { cloudinaryReducer } from "../redux/reducers/CloudinaryReducer";
import { PromotionReducer }  from "../redux/reducers/PromotionReducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'authState',
  storage: storage,
  whitelist: ['authState']
};

const rootReducer = combineReducers({
  authState: authreducer,
  //authState:persistReducer(persistConfig, authreducer),
  authError: authErrorReducer,  
  AllProducts : ProductReducer,
  loading : LoadingReducer,
  alert : AlertReducer,
  MetaData : MetaDataReducer,
  cloudinaryPhoto : cloudinaryReducer,
  promotion : PromotionReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
 // rootReducer,
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
  //composeEnhancers(applyMiddleware(epicMiddleware))
);
//epicMiddleware.run(rootEpic);
export default store;
export const persistor = persistStore(store);
