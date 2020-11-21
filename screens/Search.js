import * as React from 'react';
import { View, Text, Button } from 'react-native';

export function SearchScreen({navigation}) {
	return (<View>
		<Button
			title={"Detail Building"}
			onPress={() => navigation.navigate("DetailBuilding")}
		/>
	</View>)
}

