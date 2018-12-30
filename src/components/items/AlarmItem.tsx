import React from "react";
import {} from "react-native";

// models
import Alarm from "../../models/Alarm";

// components
import I18n from "../../res/i18n/I18n";
import DaysEnabled from "../DaysEnabled";

// third party
import { Body, H1, ListItem, Right, Switch, Text } from "native-base";

// styles
import variables from "../../res/themes/nativeBaseVariables";

interface AlarmItemProps {
    alarm: Alarm;
    onPress?: (alarm: Alarm) => void;
    onEnabledValueChange?: (newValue: boolean) => void;
}

export default class AlarmItem extends React.PureComponent<AlarmItemProps> {

    render() {
        return (
            <ListItem >
                <Body>
                    <H1>{this.props.alarm.getTimeString()}</H1>
                    <Text note>{this.props.alarm.name}</Text>
                    <DaysEnabled repeat={this.props.alarm.repeat} />
                </Body>
                <Right>
                    <Switch thumbColor={this.props.alarm.enabled ? variables.switchThumbColor : variables.switchDisabledThumbColor}
                        trackColor={variables.switchTrackColor}
                        value={this.props.alarm.enabled} onValueChange={this.props.onEnabledValueChange}
                        />
                </Right>
            </ListItem>
        );
    }
}
