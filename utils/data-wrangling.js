// Approximate the idea (DEMO)

// Pretty hard to factorize

// Fruits
const fruits = {
  title: "Fruits",
  nutriments_key: "fruits-vegetables-nuts-estimate-from-ingredients",
  nutriscore_key: "fruits_vegetables_nuts_colza_walnut_olive_oils",

  rules: (score) => {
    // start from 0
    let comment = "Ca manque de fruits tout ça !";
    let grade = "c";
    if (score > 5) {
      grade = "b";
      comment = "Bonne quantité";
    }
    if (score > 7) {
      grade = "a";
      comment = "Excellente quantité";
    }
    return { grade, comment };
  },
};

// Energy
const energy = {
  title: "Calories",
  nutriments_key: "energy",
  nutriscore_key: "energy",

  rules: (score) => {
    // start from 0
    let comment = "Faiblement calorique";
    let grade = "a";
    if (score > 5) {
      grade = "d";
      comment = "Ca commence à être du lourd";
    }
    if (score > 7) {
      grade = "e";
      comment = "Très calorique !";
    }
    return { grade, comment };
  },
};

function getDataFor(data, category) {
  const { nutriments, nutriscore_data } = data;

  // will fail if those keys are absent
  let quantity;
  if (nutriments) {
    quantity = nutriments[`${category.nutriments_key}_100g`];
    const unit = nutriments[`${category.nutriments_key}_unit`];
    if (unit) {
      quantity = quantity + unit;
    }
  }

  let score;
  let result = { comment: "Données manquantes" };
  if (nutriscore_data) {
    score = nutriscore_data[`${category.nutriscore_key}_points`];
    result = category.rules(score);
  }

  return { title: category.title, quantity, result };
}

export const getFruits = (product) => getDataFor(product, fruits);
export const getEnergy = (product) => getDataFor(product, energy);
