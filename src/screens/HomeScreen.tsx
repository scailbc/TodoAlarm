import React, { Component } from "react";
import {
    StyleSheet,
    View,
} from "react-native";

// components
import I18n from "../res/i18n/I18n";
import { store } from "../res/configureStore";

// third party
import { Container, Header, Content, Body, Text, Icon } from "native-base";
import Tts from "react-native-tts";

import { setAlarms, deleteAlarm } from "../actions/AlarmAction";

interface HomeProps {
    navigation: {
        goBack: () => void,
        navigate: (routeName: string, params: any) => void,
        state: {
            key: string,
            routeName: string,
        },
    };
    screenProps: any;
}

export default class HomeScreen extends Component<HomeProps, any> {
    componentDidMount() {
        setTimeout(() => {
            Tts.setDefaultLanguage("it-IT");
            Tts.speak("Incredibile, funziona " + I18n.t("app_name"));
            Tts.voices().then(voices => console.log(voices));
            store.dispatch(setAlarms(["uno", "due", "tre"]));
            store.dispatch(deleteAlarm("due"));
        }, 10000);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body><Text>{I18n.t("app_name")}</Text></Body>
                </Header>
                <Content>
                    <Text style={styles.welcome}>
                        Welcome to React Native! (in TypeScript)
                </Text>
                    <Text style={styles.instructions}>
                        To get started, edit HomeScreen.tsx, compile on save
                </Text>
                    <Icon name="card-giftcard" />
                </Content>
            </Container>
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
