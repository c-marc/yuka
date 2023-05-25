/** Some sort of left join */
export function joinAndPreprocess(products, collection) {
  // find would fail with empty arrays
  // TODO: don't even call me
  if (!products.length || !collection.length) {
    // nothing to do
    return [];
  }
  const now = Date.now();
  return (
    products
      .map((product) => {
        // our recorded item
        const item = collection.find((el) => el.id === product._id);
        // calculate days since last modif
        const days = (now - item?.timestamp) / 1000 / 3600 / 24;
        return { ...product, days };
      })
      // sort ascending
      .sort((a, b) => a.days - b.days)
  );
}
