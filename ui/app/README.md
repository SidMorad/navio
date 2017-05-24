# Rahpey ionic app

## Developer guide
`sudo npm install -g ionic cordova`
>  Cordova CLI      : 6.5.0
>  Ionic CLI        : 3.2.0

`ionic cordova run android`
 Runs the app in connected Android device

`ionic cordova resources`
 Generate icons and splash screens base on resources/icon.png and resources/splash.png

`ionic upload --note "NOTE" --deploy dev`
 Deploys your current code to our ionic-cloud dev channel

`ionic cordova build android --prod --release --buildConfig`
 Signs and release the app(android-release.apk) see also `build.json`
