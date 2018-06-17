/**
 * React Native App
 * Alarm Clock with tts
 */

import React, { Component } from "react";

// components
import { store, persistor } from "./res/configureStore";
import MainNavigator from "./res/navigation/mainNavigator";

// third party
import { StyleProvider, Spinner } from "native-base";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

// styles
import getTheme from "../native-base-theme/components";
import variables from "./res/themes/nativeBaseVariables";

export default class App extends Component<any, any> {

    render() {
        return (
            <Provider store={store}>
                <StyleProvider style={getTheme(variables)}>
                    <PersistGate loading={<Spinner />} persistor={persistor}>
                        <MainNavigator />
                    </PersistGate>
                </StyleProvider>
            </Provider>
        );
    }
}
