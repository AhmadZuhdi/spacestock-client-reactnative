import {DiscoveryStore} from "./discovery";
import {AutocompleteStore} from "./autocomplete";
import {makeAutoObservable} from 'mobx'
import {UnitStore} from "./unit";

export class Store {
	discovery = new DiscoveryStore(this)
	unit = new UnitStore(this)
	autocomplete = new AutocompleteStore(this)

	constructor() {
		makeAutoObservable(this)
	}
}
