## Nav

### headerBackTitleVisible

Je n'arrive pas à appliquer l'option à toute ma nav.

Dans `navigators/main-navigation.js` ligne 114, j'applique l'option sur le navgiateur principal

- ça marche entre signin et signup
- ça ne marche pas ailleurs

Résolu. Merci Tom:

<https://stackoverflow.com/questions/75961091/react-native-headerbacktitlevisible-false-not-working-in-expo-sdk-48>

Ca ressemble à un pb temporaire dû à la lib. Switcher sur Stack ? Mais Stack ne fait qu'une émulation de navigation par rapport à Native-stack. Stand-by...

### Pattern pour les states, les useEffect, et l'invalidation des routes

Options:

- rester sur la revalidation au focus du screen avec `useIsFocused()` ou `useFocusEffect()`
- ajouter un state `isValid` ou `needToRevalidate` qu'on met en dépendance du useFfect et qu'on setState après une mutation (juste après des `await axios.post()` / `put`)
- utiliser une solution dédiée aux pb de données/states asynchrones: ex React Query marche bien avec React Native <https://tanstack.com/query/v4/docs/react/react-native>

## Floating Action button

J'ai un warning d'expo dont je n'ai pas réussi à me débarrasser. Je pense que c'est mon bouton car c'est lui à qui j'ai mis une ombre...

```
 WARN  (ADVICE) View #99 of type ABI48_0_0RCTView has a shadow set but cannot calculate shadow efficiently. Consider setting a background color to fix this, or apply the shadow to a more specific component.
```

J'ai tenté des trucs pour répondre au conseil dans `components/fab-scan.jsx` , mais échec total.

## Approche générale sur la manière de gérer différentes sources de données

J'ai déjà rencontré ces pb avec les favoris et une source/API secondaire pour les data.

1. Est-ce que ça semble plus logique:

- d'avoir une route pour requêter des données (products/movies) qu'on appelle sans ou avec le header, et c'est le pb du back pour cette route d'enrichir les résultats si on est authentifié/connu avec des clés supplémentaires (ex les favoris)

- de garder des routes "pures" = requêter des données sans auth (produits yuka, films, jeux) sur une route, et requêter en parallèle des données privées (favoris) sur une autre route privées...

2. Dans tous les cas, quand on a deux sources d'info = 2 BDD, comment bien gérer les requêtes et les "jointures" de tables hors ODM ?

## Style

### tob bar nav

Pas trop sûr de la stratégie pour avoir la top tab, et d'autres choses (hamburger, favoris... ) à droite. On est obligé de faire un composant personnalisé ?

Je n'ai pas réussi à restreindre la largeur de la partie tab à sa largeur intrinséque. Je suis obligé de donner une largeur approximative à la barre.

`components/custom-tab-bar.jsx`, lignes 34-38

### item (screen product, composant ProductDetails)

Je n'obtiens pas ce que je veux ;)

Je pensais faire flex row pour 3 blocs (icone, text, et quantité+cercle), et dire au bloc du milieu d'occuper la place disponible pour que le text reste collé à l'icone à gauche, mais mes 3 blocs se répartissent. Je pourrais grouper l'icône et le texte dans une View pour séparer gauche et droite, mais j'essaie de comprendre ce qui ne marche pas (en html, je collais justement parfois des divs "en trop")...

`components/product-details.jsx`, lignes 78-80
