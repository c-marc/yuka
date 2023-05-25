## Nav

### headerBackTitleVisible

Je n'arrive pas à appliquer l'option à toute ma nav.

Dans `navigators/main-navigation.js` ligne 114, j'applique l'option sur le navgiateur principal

- ça marche entre signin et signup
- ça ne marche pas ailleurs

### Pattern pour les states, les useEffect, et l'invalidation des routes

Comme les states "data" sont isolés dans les screens, je suis obligé de faire dépendre tous les screens du focus pour forcer leur actualisation. Est-ce que c'est comme ça qu'il faut gérer une app mobile et des écrans qui dépendent de données ? Ou y aurait-il moyen de ne pas re-requêter systématiquement à chaque refocus, en observant si oui ou non, les données ont changé. Comme le state est au niveau de l'écran, je me demande comment on pourrait faire pour démonter/remonter seulement en cas de besoin = en fonction du changement des données et pas systématiquement quand on refocus (un state supérieur ? mais du coup ça voudrait dire avoir des states historiques/favoris/produit au dessus de la nav... des states "isValid" propre à chaque screen ? mais ça voudrait dire pouvoir les invalider depuis d'autres screens, donc ça supposerait de les avoir aussi à un niveau supérieur comme le userToken..)...

## Floating Action button

J'ai un warning d'expo dont je n'ai pas réussi à me débarrasser. Je pense que c'est mon bouton car c'est lui à qui j'ai mis une ombre...

```
 WARN  (ADVICE) View #99 of type ABI48_0_0RCTView has a shadow set but cannot calculate shadow efficiently. Consider setting a background color to fix this, or apply the shadow to a more specific component.
```

J'ai tenté des trucs pour répondre au conseil dans `components/fab-scan.jsx` , mais échec total.

## Approche générale sur la manière de gérer différentes sources de données

J'ai déjà rencontré ces pb avec les favoris et une source/API secondaire pour les data.

1. Est-ce qu'il vaut mieux:

- requêter des données (products/movies) et dire au back d'enrichir les résultats si on est authentifié/connu avec des clés supplémentaires (favoris)

- requêter des données sans auth (produits yuka, films, jeux), et requêter en parallèle des données privées (favoris)

2. Dans tous les cas, quand on a deux sources d'info, comment bien gérer les requêtes et les "jointures" de données ?

- dans Marvel, mon back requêtait tous les films, moi je stockais juste les ids des favoris, et je demandais à mon back d'ajouter éventuellement -si j'étais auth- une clé qui disait "id dans les favoris? oui/non". Mais du coup pour afficher les favoris, je devais requêter tous les films (de toute façon c'était l'API), et faire une jointure de tables à la main.

- ici, je stocke juste les id (historique ou favoris) et je demande juste les produits avec ces id : je requête à l'API seulement les données pour ces id, et en une requête (car j'ai vu qu'on pouvait faire ça avec OpenFoodFacts). Mais après je suis encore obligé de faire une espèce de jointure à la main entre la table de mon api (favoris ou historique) et la table obtenue de l'api externe (open food fact)...

Bref, j'ai du mal à voir quel pattern privilégier. Je pense que c'est bien de ne stocker que les id et de ne pas dupliquer les datas, mais j'ai l'impression de faire pire que du no-sql... soit du no-no-sql... puisque je me retrouve à faire des filtres et des jointures à la main (alors que ça ressemble à des opérations/méthodes de BDD, nosql ou sql).

## Style

### tob bar nav

Pas trop sûr de la stratégie pour avoir la top tab, et d'autres choses (hamburger, favoris... ) à droite. On est obligé de faire un composant personnalisé ?

Je n'ai pas réussi à restreindre la largeur de la partie tab à sa largeur intrinséque. Je suis obligé de donner une largeur approximative à la barre.

`components/custom-tab-bar.jsx`, lignes 34-38

### item (screen product, composant ProductDetails)

Je n'obtiens pas ce que je veux ;)

Je pensais faire flex row pour 3 blocs (icone, text, et quantité+cercle), et dire au bloc du milieu d'occuper la place disponible pour que le text reste collé à l'icone à gauche, mais mes 3 blocs se répartissent. Je pourrais grouper l'icône et le texte dans une View pour séparer gauche et droite, mais j'essaie de comprendre ce qui ne marche pas (en html, je collais justement parfois des divs "en trop")...

`components/product-details.jsx`, lignes 78-80
