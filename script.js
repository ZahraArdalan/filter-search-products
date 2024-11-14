const searchInput = document.querySelector("#search");
const productsDOM = document.querySelector(".products-center");

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
  productsDOM.innerHTML = "";
  console.log(filteredProducts);
  //render to DOM
  filteredProducts.forEach((item, index) => {
    //create
    //content
    //append to products:
    const productsDiv = document.createElement("div");
    productsDiv.classList.add("product");
    productsDiv.innerHTML = `
    <div class="img-container">
        <img src=${item.image} alt="p-${index}" />
      </div>
      <div class="product-desc">
        <p class="product-price">${item.price}$</p>
        <p class="product-title">${item.title}</p>

      </div>`;
    //append to DOM
    productsDOM.appendChild(productsDiv);
  });
}

searchInput.addEventListener("input", (e) => {
  //console.log(e.target.value);
  filters.searchItems = e.target.value;
  renderproducts(allproductsdata, filters);
});
