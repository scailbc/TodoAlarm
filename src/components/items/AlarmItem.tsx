import React from "react";
import { StyleSheet, View } from "react-native";

// models
import Alarm from "../../models/Alarm";
import Day from "../../models/Day";

// components
import I18n from "../../res/i18n/I18n";

// third party
import { Body, Button, H1, Icon, ListItem, Right, Switch, Text } from "native-base";

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

function DaysEnabled(props: any) {
    const { repeat } = props;
    const anyDay: boolean = repeat.includes(Day.any);
    const workweek: boolean = repeat.includes(Day.workweek);
    const weekend: boolean = repeat.includes(Day.weekend);
    return (
        <View style={styles.daysContainer}>
            <DayItem day={"monday"}     info={anyDay || workweek || repeat.includes(Day.monday)} />
            <DayItem day={"tuesday"}    info={anyDay || workweek || repeat.includes(Day.tuesday)} />
            <DayItem day={"wednesday"}  info={anyDay || workweek || repeat.includes(Day.wednesday)} />
            <DayItem day={"thursday"}   info={anyDay || workweek || repeat.includes(Day.thursday)} />
            <DayItem day={"friday"}     info={anyDay || workweek || repeat.includes(Day.friday)} />
            <DayItem day={"saturday"}   info={anyDay || weekend || repeat.includes(Day.saturday)} />
            <DayItem day={"sunday"}     info={anyDay || weekend || repeat.includes(Day.sunday)} />
        </View>
    );
}

function DayItem(props: any) {
    return (
        <Button small rounded transparent
            {...props}
            >
            {props.icon ?
                <Icon name={props.icon} />
                :
                <Text>{I18n.t(`days.${props.day}`).substring(0, 1)}</Text>
            }
        </Button>
    );
}

const styles = StyleSheet.create({
    daysContainer: {
        flexDirection: "row",
    },
});