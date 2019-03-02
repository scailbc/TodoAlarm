import React from "react";
import { StyleSheet, View } from "react-native";

import moment from "moment";
import { Input, Text } from "native-base";

interface TimePickerProps {
    hour: number;
    minute: number;
    onHourChange?: (newHour: number) => any;
    onMinuteChange?: (newMinute: number) => any;
}

export default class TimePicker extends React.Component<TimePickerProps, any> {

    hourInput: Input;

    constructor(props: TimePickerProps) {
        super(props);
    }

    onHourChange = (text) => {
        const newHour = parseInt(text);
        if (newHour >= 0 && newHour < 25 && this.props.onHourChange) {
            this.props.onHourChange( newHour );
        }
    }

    onMinuteChange = (text) => {
        const newMinute = parseInt(text);
        if (newMinute >= 0 && newMinute < 61 && this.props.onMinuteChange) {
            this.props.onMinuteChange( newMinute );
        }
    }

    render() {
        const time = moment(`${this.props.hour}:${this.props.minute}`, "HH:mm");
        const textInput = {
            selectTextOnFocus: true,
            maxLength: 3,
        };

        return (
            <View style={styles.mainContainer}>
                <Input value={time.format("HH")}
                    onChangeText={this.onHourChange}
                    keyboardType="numeric"
                    ref={ input => this.hourInput = input}
                    {...textInput}
                    />
                <Text>:</Text>
                <Input value={this.props.minute ? this.props.minute.toString() : null}
                    onChangeText={this.onMinuteChange}
                    keyboardType="numeric"
                    {...textInput}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
});