import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {HomeScreen} from "../screens/Home";
import {SearchScreen} from "../screens/Search";
import {DetailBuildingScreen} from "../screens/DetailBuilding";
import {DetailRoomScreen} from "../screens/DetailRoom";

const Stack = createStackNavigator();

export function MainStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name={"Home"} component={HomeScreen} />
				<Stack.Screen name={"Search"} component={SearchScreen} />
				<Stack.Screen name={"DetailBuilding"} component={DetailBuildingScreen} />
				<Stack.Screen name={"DetailRoom"} component={DetailRoomScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
