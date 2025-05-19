import {combineReducers} from "redux";
import { LoginReducer } from "./LoginReducer";
import {ThemeReducer} from "./ThemeReducer.js";


const Reducers = combineReducers({
    LoginReducer: LoginReducer,
    ThemeReducer: ThemeReducer,
});

export default Reducers;
