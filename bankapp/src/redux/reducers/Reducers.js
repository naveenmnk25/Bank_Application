import { combineReducers } from "redux";
import CustomerReducer from "./CustomerReducer";

const rootReducer = combineReducers({
    customer:CustomerReducer
  });
  
export default rootReducer;