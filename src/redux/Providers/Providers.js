"use client"
import React from "react"
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "../store";


function Providers({children}) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default Providers
