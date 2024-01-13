const fetchData = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=20");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default fetchData;
