# Rahpey ionic app #

## Developer guide ##
`ionic run android` runs the app in connected Android device

`ionic resources` generate icons and splash screens base on resources/icon.png and resources/splash.png

`ionic upload --note "NOTE" --deploy dev` deploys your current code to our ionic-cloud dev channel

`ionic build android --prod --release -- --keystore="release-dev.keystore" --alias=aval_viewer` signs and release the app binary(android-release.apk)