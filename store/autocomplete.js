import {makeObservable, observable, action, makeAutoObservable} from 'mobx'

export class AutocompleteStore {

	data = []

	constructor(context) {
		makeObservable(this, {
			data: observable,
			getAutocomplete: action
		})


	}

	getAutocomplete(search) {
		return fetch(`https://gateway.spacestock.com/discovery/housing/1.0/autocomplete?search=${search}`)
			.then(res => res.json())
			.then(res => {
				this.data = res.data
				return res
			})
	}
}
