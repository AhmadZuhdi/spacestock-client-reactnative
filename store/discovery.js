import {makeObservable, observable, action} from 'mobx'
import {toQueryString} from "../utils/utils";

// https://spacestock.com/api/discovery/1.0/complex?page=1&size=12&listing_type=rent&building_type=apartment&area=Bekasi%20Barat
// https://spacestock.com/api/discovery/1.0/complex?page=1&size=12&listing_type=rent&building_type=apartment&poi=Gerbang%20Tol%20Bekasi%20Barat%201

export class DiscoveryStore {

	data = []
	paging = {
		total_data: 0,
		total_page: 0
	}

	filter = {
		page: 1,
		size: 10,
		listing_type: 'rent',
		building_type: 'apartment',
		poi: '',
		area: '',
		sort: '', // asc(name) desc(name) asc(price) desc(price)
	}

	constructor(context) {
		makeObservable(this, {
			data: observable,
			paging: observable,
			filter: observable,
			getDiscovery: action
		})
	}

	getDiscovery() {
		const url = `https://spacestock.com/api/discovery/1.0/complex?${toQueryString(this.filter, true)}`
		console.log({url}, 'DiscoveryStore -> getDiscovery')
		return fetch(url)
			.then(res => res.json())
			.then(res => {
				this.data = res.data
				return res
			})
	}
}
