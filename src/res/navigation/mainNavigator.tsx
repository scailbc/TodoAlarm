import { StackNavigator } from "react-navigation";

import AlarmEditScreen from "../../screens/AlarmEditScreen";
import HomeScreen from "../../screens/HomeScreen";

const mainNavigator: StackNavigator = StackNavigator({
    Home: { screen: HomeScreen },
    AlarmEdit: { screen: AlarmEditScreen },
},
{
    headerMode: "none",
});

export default mainNavigator;