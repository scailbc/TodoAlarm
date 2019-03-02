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
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { AnyAction, Dispatch } from "redux";

// actions
import { setAlarmAt } from "../actions/AlarmAction";

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

interface HomeStoreProps {
    alarms: Alarm[];
}

interface HomeDispatchProps {
    setAlarmAt: (alarm: Alarm, index: number) => AnyAction;
}

/**
 * Home page, holding the list of alarms
 */
class HomeScreen extends Component<HomeProps & HomeStoreProps & HomeDispatchProps, any> {

    onCreateAlarmPress = () => {
        this.props.navigation.navigate("AlarmEdit");
    }

    alarmKeyExtractor = (item: Alarm) => {
        return item.id;
    }

    renderAlarms = ({ item, index }) => {
        return (
            <AlarmItem alarm={item} onEnabledValueChange={this.onEnabledValueChange(item, index)} />
        );
    }

    onEnabledValueChange = (alarm: Alarm, index: number) => {
        return (newValue: boolean) => {
            alarm.enabled = newValue;
            this.props.setAlarmAt(alarm, index);
        };
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body><Text>{I18n.t("app_name")}</Text></Body>
                </Header>
                <Content contentContainerStyle={commonStyles.fullPage}>
                    <FlatList
                        data={this.props.alarms}
                        keyExtractor={this.alarmKeyExtractor}
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

const mapStateToProps: MapStateToProps<HomeStoreProps, HomeStoreProps, HomeStoreProps> = (state: any) => {
    return {
        alarms: state.alarm.alarms,
    };
};

const mapDispatchToProps: MapDispatchToProps<HomeDispatchProps, HomeDispatchProps> = (dispatch: Dispatch<any>): HomeDispatchProps => {
    return {
        setAlarmAt: (alarm: Alarm, index: number) => dispatch(setAlarmAt(alarm, index)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);