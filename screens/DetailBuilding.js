import * as React from 'react';
import { View, Text, Button } from 'react-native';

export function DetailBuildingScreen({navigation}) {
	return (<View>
		<Button
			title={"Detail Room"}
			onPress={() => navigation.navigate("DetailRoom")}
		/>
	</View>)
}

