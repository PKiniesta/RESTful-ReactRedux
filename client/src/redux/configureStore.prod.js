import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
} //React.lazy to lazy load components by splitting your bundle
//Configure your webserver to dicert all request to index.html. This way React Rouder can handlle all request
