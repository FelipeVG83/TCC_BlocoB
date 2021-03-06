// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,

	firebase: {
		apiKey: 'AIzaSyBL56oBf-LXjo38-o6Ll_3dVSs0waWmxKM',
		// authDomain: '[SEU AUTH DOMAIN]',
		databaseURL: 'https://blocob-db.firebaseio.com/',
		projectId: 'blocob-db',
		storageBucket: 'gs://blocob-db.appspot.com/',
		// messagingSenderId: '[SUA MESSAGING SENDER ID]'
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
