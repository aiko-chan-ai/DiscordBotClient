const Store = require('electron-store');
const defaultSetting = require('../AppAssets/SettingProto');
const _ = require('lodash');
const { app } = require('electron');
const store = new Store();

const LatestStorageUpdate = 1711260000000;

// Validated
if (
	!store.get('version') ||
	!store.get('latestUpdate') ||
	store.get('latestUpdate') < LatestStorageUpdate
) {
	store.clear();
	store.set('version', app.getVersion());
	store.set('latestUpdate', LatestStorageUpdate);
}

/*
key: id
value: {
    settingProto: {
        data1,
        data2,
        data3,
    },
    ... some value
}
*/

class ElectronDatabase {
	#db = store;
	constructor() {}
	/**
	 * Get db (or create)
	 */
	get(uid) {
		const data = this.#get(uid);
		// Check all props
		function readProps(object) {
			const keys = Object.keys(object);
			for (const key of keys) {
				if (typeof object[key] === "object") {
					if ('type' in object[key] && object[key].type == 'Buffer' && 'data' in object[key]) {
						object[key] = Buffer.from(object[key].data);
					} else {
						readProps(object[key]);
					}
				}
			}
		}
		readProps(data);
		return data;
	}
	#get(uid) {
		if (this.#db.has(uid)) {
			return this.#db.get(uid);
		} else {
			this.#db.set(uid, {
				settingProto: defaultSetting,
			});
			return this.#db.get(uid);
		}
	}
	/**
	 * Set Partial<data>
	 */
	set(uid, data) {
		const oldData = this.#get(uid);
		const merge = _.merge(oldData, data);
		this.#db.set(uid, merge);
		return this.get(uid);
	}
	/**
	 * delete
	 */
	delete(uid) {
		this.#db.delete(uid);
	}
	get database() {
		return this.#db;
	}
}

module.exports = new ElectronDatabase();
