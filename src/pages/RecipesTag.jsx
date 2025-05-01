import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../compoants/Footer";
import Header from "../compoants/Header";
import axios from "axios";

function RecipesTag() {
  const location = useLocation();
  const path = location.pathname;

  const parts = path.split("/").filter((part) => part !== "");
  const lastPart = parts.pop();
  const tagName = decodeURIComponent(lastPart);

  const [filteredRecipes, setFilteredRecipes] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.jsonsilo.com/public/ced65a81-144e-4e36-b59d-c1e7b4d6fe2a`
      )
      .then((response) => {
        const recipes = response.data;
        const filtered = recipes.filter((recipe) =>
          recipe.dishTypes?.includes(tagName.toLowerCase())
        );
        setFilteredRecipes(filtered);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, [tagName]);

  return (
    <>
      <Header />
      <main className="page">
        <div className="featured-recipes">
          <h4>{tagName}</h4>
          <div className="recipes-list">
            {filteredRecipes?.map((recipe) => {
              return (
                <Link
                  to={`/recipes/${recipe.id}`}
                  className="recipe"
                  key={recipe.id}
                >
                  <img
                    src={`${recipe.image}`}
                    className="img recipe-img"
                    alt=""
                  />
                  <h5>{recipe.title}</h5>
                  <p>Prep : {recipe.readyInMinutes}min</p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default RecipesTag;
