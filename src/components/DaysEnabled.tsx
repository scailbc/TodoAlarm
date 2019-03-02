import React from "react";
import { StyleSheet, View } from "react-native";

// models
import Day from "../models/Day";

// components
import DayButtonItem from "./items/DayButtonItem";

interface DaysEnabledProps {
    repeat: Day[];
    onDayPress?: (newDay: Day) => any;
}

export default function DaysEnabled(props: DaysEnabledProps) {
    const { repeat, onDayPress } = props;
    // @ts-ignore
    const anyDay: boolean = repeat.includes(Day.any);
    // @ts-ignore
    const workweek: boolean = repeat.includes(Day.workweek);
    // @ts-ignore
    const weekend: boolean = repeat.includes(Day.weekend);
    return (
        <View style={styles.daysContainer}>
            <DayButtonItem day={"monday"}     info={anyDay || workweek || repeat.includes(Day.monday)}
                onPress={onDayItemPress(Day.monday, onDayPress)} />
            <DayButtonItem day={"tuesday"}    info={anyDay || workweek || repeat.includes(Day.tuesday)}
                onPress={onDayItemPress( Day.tuesday, onDayPress)} />
            <DayButtonItem day={"wednesday"}  info={anyDay || workweek || repeat.includes(Day.wednesday)}
                onPress={onDayItemPress(Day.wednesday, onDayPress)} />
            <DayButtonItem day={"thursday"}   info={anyDay || workweek || repeat.includes(Day.thursday)}
                onPress={onDayItemPress(Day.thursday, onDayPress)} />
            <DayButtonItem day={"friday"}     info={anyDay || workweek || repeat.includes(Day.friday)}
                onPress={onDayItemPress(Day.friday, onDayPress)} />
            <DayButtonItem day={"saturday"}   info={anyDay || weekend || repeat.includes(Day.saturday)}
                onPress={onDayItemPress(Day.saturday, onDayPress)} />
            <DayButtonItem day={"sunday"}     info={anyDay || weekend || repeat.includes(Day.sunday)}
                onPress={onDayItemPress(Day.sunday, onDayPress)} />
        </View>
    );
}

function onDayItemPress( day: Day, onDayPress?: (day: Day) => any ) {
    return () => {
        if ( onDayPress ) {
            onDayPress(day);
        }
    };
}

const styles = StyleSheet.create({
    daysContainer: {
        flexDirection: "row",
    },
});