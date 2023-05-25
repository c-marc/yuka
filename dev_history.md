## Installed

Init:

```bash
npx create-expo-app yuka
cd yuka
npx expo install react-dom react-native-web @expo/webpack-config
npx expo start
```

```
npx expo install @expo/vector-icons
```

Navigation:

```
npm install @react-navigation/native
npm install @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

Material topbar navigation:

```
npm install @react-navigation/material-top-tabs react-native-tab-view
npx expo install react-native-pager-view
```

Storage:

```
npx expo install expo-secure-store
npx expo install @react-native-async-storage/async-storage
```

Barcode:

```
npx expo install expo-barcode-scanner
```

## Publish

Alternative: launch with `npx expo start --tunnel`

Or publish and share with expo:

<https://docs.expo.dev/eas-update/getting-started/>

```bash
npm install --global eas-cli
```

More config...

Then:

```bash
# Dev
npx expo start
# Iterate & publish
eas update --branch preview --message "Updating the app"
```

## Things to keep in mind

Native TextInput requires some attention:

Eexemple <https://stackoverflow.com/a/63657029>:

- DO NOT let autocapitalize
- activate @ on keyboard
- lot of props to use...

## Icons

Material:

- login logout person-add
- star star-outline
- error-outline
- person mail key-vpn
- favorite
- more-vert

MaterialCommunity:

- barcode-scan

FontAwaesome5:

- carrot

## OFF API

List of products:

`https://world.openfoodfacts.org/api/v2/search?code=3263859883713,8437011606013,6111069000451&fields=code,product_name`

- products: []

Product:

`https://world.openfoodfacts.net/api/v2/product/3017624010701`

- code
- product: {}

Query params:

`?fields=`, séparés par des virgules

Dans product:

- \_id ( =code?)
- product_name
- brand_owner
- nutriscore_grade:"e"
- nutriscore_score: 4
- nutriscore_data
- nutriments

- ecoscore_grade: "unknown"
- ecoscore_data: ...

- image_thumb_url (100)
- image_small_url (200)
- image_url (400)

Alternative:

Knowledge panels are an abstraction of content. Main elements are panels, which in turn will contain elements. Elements are typically text_element, image_element, map_element.
