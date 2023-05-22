npx create-expo-app yuka
cd yuka
npx expo install react-dom react-native-web @expo/webpack-config
npx expo start

npx expo install @expo/vector-icons

npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack

#material topbar
npm install @react-navigation/material-top-tabs react-native-tab-view
npx expo install react-native-pager-view

npx expo install expo-secure-store

npx expo install expo-barcode-scanner

## publish

<https://docs.expo.dev/eas-update/getting-started/>

npm install --global eas-cli

More config...

Then...

npx export start
Iterate & publish
eas update --branch preview --message "Updating the app"

## Things to keep in mind

Native TextInput requires some attention:

Eexemple <https://stackoverflow.com/a/63657029>:

- DO NOT let autocapitalize
- activate @ on keyboard

## OFF API

List of products:

`https://world.openfoodfacts.org/api/v2/search?code=3263859883713,8437011606013,6111069000451&fields=code,product_name`

Product:

`https://world.openfoodfacts.net/api/v2/product/3017624010701`

Query params:

`?fields=`, séparés par des virgules

- code
- product

Dans product:

- \_id ( =code?)
- product_name
- brand_owner
- nutrition_grades:"e"
- nutriscore_data
- nutriments

- ecoscore_grade: "unknown"
- ecoscore_data: ...

- image_thumb_url (100)
- image_small_url (200)
- image_url (400)

Alternative:

Knowledge panels are an abstraction of content. Main elements are panels, which in turn will contain elements. Elements are typically text_element, image_element, map_element.
