import axios from "axios";

const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

export const getDishTypes = async () => {
  try {
    const res = await axios.get(
      `https://api.jsonsilo.com/public/ced65a81-144e-4e36-b59d-c1e7b4d6fe2a`
    );
    const dishTypeCounts = {};

    res.data.forEach((recipe) => {
      if (recipe.dishTypes && recipe.dishTypes.length > 0) {
        recipe.dishTypes.forEach((type) => {
          const formattedType = type
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          dishTypeCounts[formattedType] =
            (dishTypeCounts[formattedType] || 0) + 1;
        });
      }
    });

    return dishTypeCounts;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllRecipes = async () => {
  try {
    const res = await axios.get(
      `https://api.jsonsilo.com/public/ced65a81-144e-4e36-b59d-c1e7b4d6fe2a`
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getRandomRecipes = () => {
  return axios.get(
    `https://api.spoonacular.com/recipes/random?number=9&apiKey=${apiKey}`
  );
};
export const getRecipeDetails = (id) => {
  return axios.get(
    `https://api.spoonacular.com/recipes/informationBulk?ids=${id}&apiKey=${apiKey}`
  );
};
