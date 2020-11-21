import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Subheading, Chip } from 'react-native-paper';
import {useEffect} from "react";
import {useStore} from "../store/useStore";

const style = StyleSheet.create({
	chip: {
		width: 120,
		borderColor: '#0C5777',
		marginRight: 15,
	},

	chipText: {
		// textColor: '#0C5777',
		textAlign: 'center'
	}
})

export function DetailBuildingScreen({navigation, route}) {
	const {data} = route.params;
	const store = useStore()

	const buyUnits = Object.keys(data.buy_summaries).map(k => data.buy_summaries[k].unit_availability)
		.reduce((a,b) => a+b, 0)

	const rentUnits = Object.keys(data.rent_summaries).map(k => data.rent_summaries[k].unit_availability)
		.reduce((a,b) => a+b, 0)

	useEffect(() => {
		store.unit.getUnit(data.id)
			.then(res => {
				console.log({res}, 'DetailBuildingScreen -> ')
			})
	}, []) // didMount

	return (<ScrollView style={{padding: 8, flex: 1}}>
		<Title>{data.name}</Title>
		<Paragraph>{data.address_street}</Paragraph>
		<View
			style={{
				display: 'flex',
				flexDirection: 'row'
			}}>
			<Chip mode={"outlined"} style={style.chip}>{rentUnits} Unit Sewa</Chip>
			<Chip mode={"outlined"} style={style.chip}>{buyUnits} Unit Beli</Chip>
		</View>

		{store.unit.data.map(du => {
			return (
				<Card style={{marginTop: 15}} onPress={() => {
					navigation.navigate("DetailBuilding", {
						// data: d
					})
				}}>
					<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />

					<Card.Content>
						<Title>{du.type} - {du.tower.name}</Title>
						<Paragraph>{du.complex.name}</Paragraph>
					</Card.Content>
					<Card.Content>
						<Paragraph>Harga sewa mulai</Paragraph>
						<Title>Rp. {du.price_rent_yearly} / tahun</Title>
						<Paragraph>Dapat dicicil dengan Kartu Kredit & Fintech</Paragraph>
					</Card.Content>
					<Card.Content>
						<Paragraph>{du.condition} - Lantai {du.floor}</Paragraph>
					</Card.Content>
				</Card>
			)
		})}
	</ScrollView>)
}

