import { legacy_createStore as createStore } from 'redux';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import Reducers from "./Reducers/Reducers";

const persistConfig = {
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, Reducers);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};


