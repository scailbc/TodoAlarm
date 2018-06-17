/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
} from "react-native";

// components
import I18n from "./res/i18n/I18n";
import { store, persistor } from "./res/configureStore";

// third party
import { StyleProvider, Container, Header, Content, Body, Text, Icon, Spinner } from "native-base";
import Tts from "react-native-tts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import { setAlarms, deleteAlarm } from "./actions/AlarmAction";

// styles
import getTheme from "../native-base-theme/components";
import variables from "./res/themes/nativeBaseVariables";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" +
    "Cmd+D or shake for dev menu",
  android: "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});

export default class App extends  Component<any, any> {
  componentDidMount() {
    setTimeout( () => {
    Tts.setDefaultLanguage("it-IT");
    Tts.speak("Incredibile, funziona " + I18n.t("app_name"));
    Tts.voices().then(voices => console.log(voices));
    store.dispatch(setAlarms(["uno", "due", "tre"]));
    store.dispatch( deleteAlarm("due") );
    // 0: {language: "spa-x-lvariant-f00", name: "es-ES-SMTf00", id: "es-ES-SMTf00"}id: "es-ES-SMTf00"language: "spa-x-lvariant-f00"name: "es-ES-SMTf00"__proto__: Object
    // 1: {language: "eng-x-lvariant-f00", name: "en-US-SMTf00", id: "en-US-SMTf00"}id: "en-US-SMTf00"language: "eng-x-lvariant-f00"name: "en-US-SMTf00"__proto__: Object
    // 2: {language: "deu-x-lvariant-f00", name: "de-DE-SMTf00", id: "de-DE-SMTf00"}
    // 3: {language: "vie-x-lvariant-f00", name: "vi-VN-SMTf00", id: "vi-VN-SMTf00"}
    // 4: {language: "fra-x-lvariant-f00", name: "fr-FR-SMTf00", id: "fr-FR-SMTf00"}
    // 5: {language: "rus-x-lvariant-f00", name: "ru-RU-SMTf00", id: "ru-RU-SMTf00"}
    // 6: {language: "ita-x-lvariant-f00", name: "it-IT-SMTf00", id: "it-IT-SMTf00"}
    //   id: "it-IT-SMTf00"
    //   language: "ita-x-lvariant-f00"
    //   name: "it-IT-SMTf00"
    //     __proto__: Object
    //       constructor: ƒ Object()hasOwnProperty: ƒ hasOwnProperty()isPrototypeOf: ƒ isPrototypeOf()propertyIsEnumerable: ƒ propertyIsEnumerable()toLocaleString: ƒ toLocaleString()toString: ƒ toString()valueOf: ƒ valueOf()__defineGetter__: ƒ __defineGetter__()__defineSetter__: ƒ __defineSetter__()__lookupGetter__: ƒ __lookupGetter__()__lookupSetter__: ƒ __lookupSetter__()get __proto__: ƒ __proto__()set __proto__: ƒ __proto__()
    // 7: {language: "eng-x-lvariant-f00", name: "en-GB-SMTf00", id: "en-GB-SMTf00"}
    // length: 8__proto__: Array(0)
    }, 10000);
  }

  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(variables)}>
          <PersistGate loading={<Spinner />} persistor={persistor}>
            <Container>
              <Header>
                <Body><Text>{I18n.t("app_name")}</Text></Body>
              </Header>
              <Content>
                <Text style={styles.welcome}>
                  Welcome to React Native! (in TypeScript)
                </Text>
                <Text style={styles.instructions}>
                  To get started, edit App.tsx, compile on save
                </Text>
                <Text style={styles.instructions}>
                  {instructions}
                </Text>
                <Icon name="card-giftcard" />
              </Content>
            </Container>
          </PersistGate>
        </StyleProvider>
      </Provider>
    );
  }
}

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
