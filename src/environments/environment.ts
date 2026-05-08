// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  geminiApiKey: 'AIzaSyC0p0LlCJMKXHr9gdnjru94ZKA_dzVLH4U',

  msal: {
    clientId: 'f5515d18-8765-4ae6-8b08-2b4b8ad66611',
    authority: 'https://login.microsoftonline.com/dc59e38c-4977-406f-bdd1-9ebbabbd387e',
    webRedirectUri: 'http://localhost:8100',
    nativeRedirectUri: 'msauth://ma.ac.usms.newsroom/auth',
  },
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
