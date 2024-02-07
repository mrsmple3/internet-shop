export default function addToLocalStorage(key = "", item) {
  const existingData = localStorage.getItem(key);
  const countOfCount = localStorage.getItem("cartCount");

  const cartList = existingData ? JSON.parse(existingData) : [];
  let cartCount = countOfCount ? JSON.parse(countOfCount) : 0;

  const existingCartIndex = cartList.findIndex(
    (product) => product.id === item.id
  );
  if (existingCartIndex !== -1) {
    cartList[existingCartIndex].quantity += 1;
  } else {
    cartList.push({ ...item, quantity: 1 });
  }
  cartCount += 1;
  localStorage.setItem("cartCount", JSON.stringify(cartCount));
  localStorage.setItem(key, JSON.stringify(cartList));
}
