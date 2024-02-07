export default function removeFromLocalStorage(key = "", items = [], itemId) {
  const existingData = localStorage.getItem(key);
  const countOfCount = localStorage.getItem("cartCount");

  const removedCart = existingData ? JSON.parse(existingData) : [];
  let cartCount = countOfCount ? JSON.parse(countOfCount) : 0;

  const itemIndex = items.findIndex((product) => product.id === itemId);
  if (itemIndex !== -1) {
    if (removedCart[itemIndex].quantity > 1)
      removedCart[itemIndex].quantity -= 1;
    else removedCart.splice(itemIndex, 1);
  }
  cartCount -= 1;
  localStorage.setItem("cartCount", JSON.stringify(cartCount));
  localStorage.setItem("cartList", JSON.stringify(removedCart));
}
