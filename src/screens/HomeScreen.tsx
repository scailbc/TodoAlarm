import React, { Component } from "react";
import {  FlatList,  StyleSheet } from "react-native";

// models
import Alarm from "../models/Alarm";
import Day from "../models/Day";

// components
import AlarmItem from "../components/items/AlarmItem";
import I18n from "../res/i18n/I18n";
import { store } from "../res/configureStore";

// third party
import { Container, Fab, Header, Icon, Content, Body, Text } from "native-base";
import Tts from "react-native-tts";

// actions
import { setAlarms, deleteAlarm } from "../actions/AlarmAction";

// styles
import commonStyles from "../res/themes/commonStyles";

interface HomeProps {
    navigation: {
        goBack: () => void,
        navigate: (routeName: string, params?: any) => void,
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
            const alarms: Alarm[] = [new Alarm("uno"), new Alarm("due"), new Alarm("tre")];
            alarms.forEach( (a, index) => {
                a.hour = index;
                a.repeat = [Day.monday, Day.weekend];
            });
            store.dispatch(setAlarms(alarms));
            store.dispatch(deleteAlarm(alarms[1]));
        }, 10000);
    }

    onCreateAlarmPress = () => {
        this.props.navigation.navigate("AlarmEdit");
    }

    renderAlarms = ({ item }) => {
        return (
            <AlarmItem alarm={item} />
        );
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body><Text>{I18n.t("app_name")}</Text></Body>
                </Header>
                <Content contentContainerStyle={commonStyles.fullPage}>
                    <FlatList
                        data={store.getState().alarm.alarms}
                        renderItem={this.renderAlarms}
                    />
                    <Fab position="bottomRight"
                        onPress={this.onCreateAlarmPress}>
                        <Icon name="add" />
                    </Fab>
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
