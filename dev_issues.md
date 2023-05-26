## Nav

### headerBackTitleVisible

Je n'arrive pas à appliquer l'option à toute ma nav.

Dans `navigators/main-navigation.js` ligne 114, j'applique l'option sur le navgiateur principal

- ça marche entre signin et signup
- ça ne marche pas ailleurs

Merci Tom:

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

2. Dans tous les cas, quand on a deux sources d'info, comment bien gérer les requêtes et les "jointures" de données ?

- dans Marvel, mon back requêtait tous les films ; moi je stockais juste les ids des favoris ; et je demandais à mon back d'ajouter éventuellement -si j'étais auth- une clé qui disait "id dans les favoris? oui/non". Mais du coup pour afficher les favoris, je devais requêter tous les films (de toute façon c'était l'API qu'on avait), et ensuite faire une jointure de tables à la main, et filter.

- ici dans Yuka, je stocke juste les id (historique ou favoris) et je demande juste les produits avec ces id : je requête à l'API seulement les données pour ces id, et en une requête (car j'ai vu qu'on pouvait faire ça avec OpenFoodFacts). Mais après je suis encore obligé de faire une espèce de jointure à la main entre la table de ma DB (favoris ou historique) et la table obtenue de l'api externe (open food fact)...

Bref, j'ai du mal à voir quel pattern privilégier. Je pense que c'est bien de ne stocker que les id et de ne pas dupliquer les datas, mais j'ai l'impression de faire pire que du no-sql... soit du no-no-sql... puisque j'extraie les résultas de 2 BDD et je me retrouve à faire des filtres et des jointures à posteriori à la main (alors que ça ressemble à des opérations/méthodes de BDD, nosql ou sql).

## Style

### tob bar nav

Pas trop sûr de la stratégie pour avoir la top tab, et d'autres choses (hamburger, favoris... ) à droite. On est obligé de faire un composant personnalisé ?

Je n'ai pas réussi à restreindre la largeur de la partie tab à sa largeur intrinséque. Je suis obligé de donner une largeur approximative à la barre.

`components/custom-tab-bar.jsx`, lignes 34-38

### item (screen product, composant ProductDetails)

Je n'obtiens pas ce que je veux ;)

Je pensais faire flex row pour 3 blocs (icone, text, et quantité+cercle), et dire au bloc du milieu d'occuper la place disponible pour que le text reste collé à l'icone à gauche, mais mes 3 blocs se répartissent. Je pourrais grouper l'icône et le texte dans une View pour séparer gauche et droite, mais j'essaie de comprendre ce qui ne marche pas (en html, je collais justement parfois des divs "en trop")...

`components/product-details.jsx`, lignes 78-80
