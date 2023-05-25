export function labelForDays(days) {
  if (days < 0.2) return "à l'instant";

  if (days < 1) return "aujourd'hui";

  if (days < 2) return "hier";

  return `il y a ${Math.floor(days)} jours`;
}

export function labelForGrade(grade) {
  if (!grade) return "NA";
  switch (grade.toLowerCase()) {
    case "a":
      return "Excellent";
    case "b":
      return "Bon";
    case "c":
      return "Médiocre";
    case "d":
      return "Eeh";
    case "e":
      return "Beurk";
    default:
      return "NA";
  }
}
