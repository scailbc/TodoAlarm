import React from "react";
import { StyleSheet, View } from "react-native";

// models
import Alarm from "../models/Alarm";
import Day, {isWeekend, isWorkweek} from "../models/Day";

// components
import I18n from "../res/i18n/I18n";
import DayButtonItem from "../components/items/DayButtonItem";
import DaysEnabled from "../components/DaysEnabled";

// third party
import moment from "moment";
import { Body, Button, Container, Content, Footer, FooterTab, Header, Input, InputGroup, Text} from "native-base";
import DatePicker from "react-native-datepicker";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Dispatch } from "redux";

// styles
import commonStyles from "../res/themes/commonStyles";
import variables from "../res/themes/nativeBaseVariables";

interface AlarmEditProps {
    navigation: {
        goBack: () => void,
        navigate: (routeName: string, params?: any) => void,
        state: {
            key: string,
            routeName: string,
        },
    };
}

interface AlarmEditState {
    name: string;
    time: string;
    repeat: Day[];
    nameError: boolean;
}

interface AlarmEditStoreProps {

}

interface AlarmEditDispatchProps {

}

class AlarmEditScreen extends React.Component<AlarmEditProps & AlarmEditStoreProps & AlarmEditDispatchProps, AlarmEditState> {

    constructor( props: AlarmEditProps & AlarmEditStoreProps & AlarmEditDispatchProps) {
        super(props);

        this.state = {
            name: "",
            time: moment().format("HH:mm"),
            repeat: [],
            nameError: false,
        };
    }

    onDayPress = (day: Day) => {
        let temp = JSON.parse(JSON.stringify(this.state.repeat));
        const workweekDay: boolean = isWorkweek(day);
        const weekendDay: boolean = isWeekend(day);
        // @ts-ignore
        if ( this.state.repeat.includes(day)
            // @ts-ignore
            || this.state.repeat.includes(Day.any)
            // @ts-ignore
            || (workweekDay && this.state.repeat.includes(Day.workweek))
            // @ts-ignore
            || (weekendDay && this.state.repeat.includes(Day.weekend))
        ) {
            // remove
            temp.splice( temp.indexOf(day), 1 );
            // @ts-ignore
            if ( this.state.repeat.includes(Day.any) ) {
                temp.splice( temp.indexOf(Day.any), 1 );
            }
            if ( workweekDay ) {
                temp.splice( temp.indexOf(Day.workweek), 1 );
            }
            if ( weekendDay ) {
                temp.splice( temp.indexOf(Day.weekend), 1 );
            }
        } else {
            temp.push(day);
        }
        this.setState({repeat: temp});
    }

    onWorkweekPress = () => {
        this.onDayPress(Day.workweek);
    }

    onWeekendPress = () => {
        this.onDayPress(Day.weekend);
    }

    onAnyDayPress = () => {
        this.onDayPress(Day.any);
    }

    onBackPress = () => {
        this.props.navigation.goBack();
    }

    onSavePress = () => {
        const { name, time, repeat } = this.state;
        if (!name) {
            this.setState({nameError: true});
            return;
        }
        let alarm = new Alarm(name);
        alarm.setTime(time);
        alarm.repeat = repeat;
    }

    render() {
        return(
            <Container>
                <Header>
                    <Body><Text>{I18n.t("app_name")}</Text></Body>
                </Header>
                <Content contentContainerStyle={styles.mainContainer}>
                    <InputGroup error={this.state.nameError} >
                        <Input style={styles.textInput}
                            value={this.state.name}
                            placeholder={I18n.t("name")}
                            onChangeText={ name => this.setState({name, nameError: false})}
                            />
                    </InputGroup>
                    <DatePicker
                        style={styles.datepicker}
                        date={this.state.time}
                        mode="time"
                        showIcon={false}
                        format="HH:mm"
                        confirmBtnText={I18n.t("confirm")}
                        cancelBtnText={I18n.t("cancel")}
                        customStyles={{
                            dateText: {
                                fontSize: variables.fontSizeH2,
                            },
                        }}
                        onDateChange={(time) => { this.setState({time: time}); }}
                    />
                    <DaysEnabled repeat={this.state.repeat} onDayPress={this.onDayPress} />
                    <View style={styles.daysContainer}>
                        <DayButtonItem day={Day.workweek} icon={"work"} onPress={this.onWorkweekPress} />
                        <DayButtonItem day={Day.weekend} icon={"weekend"} onPress={this.onWeekendPress} />
                        <DayButtonItem day={Day.any} icon={"all-inclusive"} onPress={this.onAnyDayPress} />
                    </View>
                </Content>
                <Footer>
                    <FooterTab>
                    <Button full transparent onPress={this.onBackPress}>
                        <Text>{I18n.t("cancel")}</Text>
                    </Button>
                    <Button full transparent onPress={this.onSavePress}>
                        <Text>{I18n.t("save")}</Text>
                    </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles: any = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
    },
    textInput: {
    },
    datepicker: {
        // flex: 1,
        // height: 300,
        // maxHeight: 300,
    },
    daysContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
});

const mapStateToProps: MapStateToProps<AlarmEditStoreProps, AlarmEditStoreProps, AlarmEditStoreProps> = (state: any) => {
    return {

    };
};

const mapDispatchToProps: MapDispatchToProps<AlarmEditDispatchProps, AlarmEditDispatchProps> = (dispatch: Dispatch<any>): AlarmEditDispatchProps => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlarmEditScreen);