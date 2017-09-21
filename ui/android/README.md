# Android native development

### Run debug app in a connected device through adb
`./gradlew :app:run`

### Release apk
`./gradlew :app:assembleRelease`

### Show compile time dependencies
`./gradlew -q dependencies app:dependencies --configuration compile`
