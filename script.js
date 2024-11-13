const searchInput = document.querySelector("#search");

let allproductsdata = [];
const filters = {
  searchItems: "",
};
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")

    .then((res) => {
      allproductsdata = res.data;
      renderproducts(res.data, filters);
    })
    .catch((err) => console.log(err));
});
function renderproducts(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
  });
  console.log(filteredProducts);
}

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  filters.searchItems = e.target.value;
  renderproducts(allproductsdata, filters);
});
