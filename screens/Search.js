import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {observer} from 'mobx-react-lite'
import {useStore} from "../store/useStore";
import { Avatar, Button, Card, Title, Paragraph, Subheading } from 'react-native-paper';

export const SearchScreen = observer(({navigation}) => {

	const store = useStore()

	return (<ScrollView>

		<View>

		</View>

		{store.discovery.data.map(d => {

			const prices = Object.keys(d.rent_summaries).map(k => d.rent_summaries[k].pricing_summary.lowest_prices)
			const buyUnits = Object.keys(d.buy_summaries).map(k => d.buy_summaries[k].unit_availability)
				.reduce((a,b) => a+b, 0)
			const units = Object.keys(d.rent_summaries).map(k => d.rent_summaries[k].unit_availability)
				.reduce((a,b) => a+b, 0)

			return (
				<Card style={{padding: 12}} onPress={() => {
					navigation.navigate("DetailBuilding", {
						data: d
					})
				}}>
					<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />

					<Card.Content>
						<Paragraph>{units+buyUnits} Unit Tersedia</Paragraph>
						<Title>{d.name}</Title>
					</Card.Content>
					<Card.Content>
						<Paragraph>Mulai</Paragraph>
						<Title>Rp. {Math.min(...prices)} / Tahun</Title>
					</Card.Content>
					<Card.Content>
						<Paragraph>{d.address_city}</Paragraph>
					</Card.Content>
				</Card>
			)
		})}
	</ScrollView>)
})

