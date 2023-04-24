import { combineReducers } from "redux";
import { userReducer } from "./Reducers";

const rootReducer = combineReducers({
    user:userReducer
})

export default rootReducer;