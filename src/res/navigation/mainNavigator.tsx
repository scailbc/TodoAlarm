import { StackNavigator } from "react-navigation";

import HomeScreen from "../../screens/HomeScreen";

const mainNavigator: StackNavigator = StackNavigator({
    Home: { screen: HomeScreen },
},
{
    headerMode: "none",
});

export default mainNavigator;