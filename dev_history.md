npx create-expo-app yuka
cd yuka
npx expo install react-dom react-native-web @expo/webpack-config
npx expo start

npx expo install @expo/vector-icons

npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack

npx expo install expo-barcode-scanner

## publish

<https://docs.expo.dev/eas-update/getting-started/>

npm install --global eas-cli

More config...

Then...

npx export start
Iterate & publish
eas update --branch preview --message "Updating the app"
