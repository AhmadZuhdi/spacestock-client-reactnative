import  * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';
import Toggle from 'react-native-toggle-element';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {useStore} from "../store/useStore";
import { observer } from "mobx-react-lite";
import throttle from 'lodash.throttle'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},

	banner: {
		// flex: 1,
		height: 150
	},

	searchContainer: {
		// flex: 1,
		flexDirection: 'row',
		marginTop: 15,
		height: 80
	},
	searchContainerBuilding: {
		flex: 7,
		padding: 5
	},
	searchContainerType: {
		flex: 3,
		padding: 5
	},
	autocompleteContainer: {
		flex: 1,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0,
		zIndex: 1
	},

})

export const HomeScreen = observer(({ navigation }) => {

	const store = useStore()

	const buildingType = [
		{
			label: 'Apartemen',
			value: 'apartment'
		},
		{
			label: 'Rumah',
			value: 'house'
		},
		{
			label: 'Kantor',
			value: 'office'
		}
	]

	// states
	const [locations, setLocations] = useState([])
	const [isBuying, setIsBuying] = useState(false)
	const [selectedBuildingType, setSelectedBuildingType] = useState(buildingType[0])

	// ref
	const searchSelect = useRef(null)

	// methods
	const getSearch = (text) => {

		const labelMapping = {
			location: 'Area',
			poi: 'Dekat dengan'
		}

		store.autocomplete.getAutocomplete(text)
			.then(res => {
				setLocations(store.autocomplete.data.map(d => {
					return {
						name: labelMapping[d.type],
						children: d.data
					}
				}))
			})
	}

	const gotoSearchPage = () => {
		store.discovery.filter.building_type = selectedBuildingType

		store.discovery.getDiscovery()
			.then(res => {
				console.log({res}, ' -> ')
				searchSelect.current._closeSelector()
				navigation.navigate('Search')
			})
	}

	const searchLocation = throttle((text) => {
		getSearch(text)
	}, 500)

	const onSelectSearchItem = (selectedItems) => {
		const area = locations[0].children.find(a => a.name === selectedItems[0])
		const poi = locations[1].children.find(a => a.name === selectedItems[0])

		console.log({store, discovery: store.discovery}, ' -> onSelectSearchItem')

		if (area) {
			store.discovery.filter.area = area.name
		} else if (poi) {
			store.discovery.filter.poi = poi.name
		}

		gotoSearchPage()
	}

	return (<View style={styles.container}>
		<Image
			style={styles.banner}
			source={{
				uri: "https://res.cloudinary.com/dpqdlkgsz/image/upload/t_alohomora/v1/homepage/banner.jpg"
			}}/>

		<View
			style={styles.searchContainer}>
			<View style={{
				flex: 7,
			}}>
				<Dropdown
					label='Cari'
					data={buildingType}
					onChangeText={(value) => setSelectedBuildingType(value)}
				/>
			</View>
			<View style={styles.searchContainerType}>
				<Text>Saya Ingin</Text>
				<Toggle
					value={isBuying}
					onPress={(newState) => setIsBuying(newState)}
					leftTitle="Sewa"
					rightTitle="Beli"
					thumbButton={{
						radius: 8
					}}
					trackBar={{
						width: 100,
						height: 50,
						radius: 8,
					}}
				/>
			</View>
		</View>

		<View style={{marginTop: 15, flex: 1}}>
			<SectionedMultiSelect
				ref={searchSelect}
				items={locations}
				IconRenderer={Icon}
				uniqueKey="name"
				subKey="children"
				selectText="Cari Lokasi"
				searchPlaceholderText={"Cari Lokasi"}
				confirmText={"Cari"}
				showDropDowns={true}
				readOnlyHeadings={true}
				onSelectedItemsChange={onSelectSearchItem}
				selectedItems={[]}
				filterItems={(searchText, items, props) => {
					searchLocation(searchText)
					return locations
				}}
			/>
		</View>

	</View>)
})

