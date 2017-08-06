## Navio ionic app developer guide 

Install ionic and cordova globally:\
`npm install -g ionic cordova`

Install npm packages and apply our patches:\
`npm install && ./patch.sh`

Generate icons and splash screens base on resources/icon.png and resources/splash.png:\
`ionic cordova resources`

Note: ionic.info.txt shows current used versions. at the moment Ionic
 has an issue with Npm 5.x, so we have to use Npm 4.x(or lower) instead.

### Android Platform

`ionic cordova run android`\
 Runs the app in connected Android device

`./sign.sh && ionic upload --nobuild --note "NOTE" --deploy dev`\
 Deploys your current code to our ionic-cloud dev channel

### IOS Platform

Use `--verbose` with ionic commands to see debug logs

**clean**

> `cd ui/app/`
\
`rm -rf node_modules/ platforms/`

**build**

>`ionic cordova build ios --verbose`
\
`cd platforms/ios/cordova`
\
`npm install ios-sim`

**run**

>`cd ui/app`
\
`ionic cordova run ios --verbose`
 
