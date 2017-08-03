## Navio ionic app developer guide 

Install ionic cordova globally\
`sudo npm install -g ionic cordova`

### Android Platform

Note: ionic.info.txt shows current used versions. at the moment Ionic
 has an issue with Npm 5.x, so we have to use Npm 4.x(or lower) instead.

`ionic cordova run android`
 Runs the app in connected Android device

`ionic cordova resources`
 Generate icons and splash screens base on resources/icon.png and resources/splash.png

`./sign.sh && ionic upload --nobuild --note "NOTE" --deploy dev`
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
 
