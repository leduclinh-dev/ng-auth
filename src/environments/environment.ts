// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    base: 'http://localhost:3000/v1/',
    legacy: '',
  },
  socialKeys: {
    googleClientId: '',
    facebookClientId: '',
  },
  socialUri: {
    googleRedirectUri: '',
    facebookRedirectUri: '',
  },
  payPal: {
    clientId: '',
  },
};

// This section is the ACTUAL PRODUCTION SERVER SETTINGS TO BRING IN FOR A PRODUCTION DEPLOYMENT
/*
export const environment = {
  production: false,
  api: {
    base: '',
    legacy: ''
  },
  socialKeys: {
    googleClientId:
      '',
    facebookClientId: '',
  },
  socialUri: {
    googleRedirectUri: '',
    facebookRedirectUri: '',
  },
  payPal: {
    clientId:
      '',
  },
};
*/

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
