import {DiscoveryStore} from "./discovery";
import {AutocompleteStore} from "./autocomplete";
import {makeAutoObservable} from 'mobx'

export class Store {
	discovery = new DiscoveryStore(this)
	autocomplete = new AutocompleteStore(this)

	constructor() {
		makeAutoObservable(this)
	}
}
