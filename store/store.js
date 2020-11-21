import {DiscoveryStore} from "./discovery";
import {AutocompleteStore} from "./autocomplete";
import {makeAutoObservable, configure} from 'mobx'
import {UnitStore} from "./unit";

configure({
	enforceActions: "never"
})

export class Store {
	discovery = new DiscoveryStore(this)
	unit = new UnitStore(this)
	autocomplete = new AutocompleteStore(this)

	constructor() {
		makeAutoObservable(this)
	}
}
