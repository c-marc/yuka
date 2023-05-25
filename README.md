Work in progress...

## Try it yourself

### For developpers

Get it ready on your laptop:

```bash
git clone https://github.com/c-marc/yuka
npm i
```

Start a development server:

```bash
npx expo start
# ou npm start
```

Then:

- either scan the QR code with ExpoGo app;
- or launch a simulator ("i", "a"...) but you won't be able to scan products.

Backend for authentification is faked, so just log in with default values.

## Features

Authentification flow:

- conditionnal nav based on auth
- token persistance based on `SecureStorage`
- faked backend with delayed asynchronous operations to show how loading states behave

Navigation:

- nested navigation with stacked nav and tab nav
- conditionnal stack groups and styling (auth screens vs. main app)
- custom top tab bar with mixed navigation
- floating action button

Barcode scanner:

- scanned barcode triggers a request on OpenFoodFact
- found products are added to a history collection with timestamps
- the result is previewed in a modal:
  - the modal allows navigation to the product
  - the modal prevents continuous scanning and repetitive fetching
  - it can be dismissed by pressing a close button or by pressing outside (this prevents a frustrating experience when the modal makes the goback button unpressable)

History and favorites:

- collection are stored in `AsyncStorage`
- show the relevant list of products
- timestamps are specific to each collection and processed and displayed based on current time
- these screens are revalidated each time they get focus (history can be mutated in the camera screen, favorites can be mutated in the product screen...)

Product:

- shows details
- favorite status can be toggled from the header
- favorite status and toggling are isolated from the rest of the states and does not trigger rerendering and refetching
- toggling uses optimistic rendering pattern (change is instantaneously displayed while the mutation is posted to the backend; would it fail, next rendering would show the truth)

Account details:

- is accessible from custom top tab bar
- shows progressive rendering (user data are added when received)
