import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {observer} from 'mobx-react-lite'
import {useStore} from "../store/useStore";
import { Avatar, Button, Card, Title, Paragraph, Subheading } from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown-v2';

export const SearchScreen = observer(({navigation}) => {

	const store = useStore()

	const filters = [
		{
			label: 'Rekomendasi',
			value: ''
		},
		{
			label: 'A - Z',
			value: 'asc(name)'
		},
		{
			label: 'Z - A',
			value: 'desc(name)'
		},
		{
			label: 'Harga Tertinggi',
			value: 'desc(price)'
		},
		{
			label: 'Harga Terendah',
			value: 'asc(price)'
		},
	]

	return (<ScrollView>

		<View>
			<Dropdown
				label='Cari'
				data={filters}
				onChangeText={(value) => {
					console.log({value}, ' -> ')
					store.discovery.filter.sort = value
					store.discovery.getDiscovery()
				}}
			/>
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

