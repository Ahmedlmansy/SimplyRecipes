import Footer from "../compoants/Footer";
import Header from "../compoants/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRandomRecipes } from "../services/api";
import NavTags from "../compoants/TagsCompoant";

function Home() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getRandomRecipes()
      .then((res) => {
        setRecipes(res.data.recipes);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      <Header />
      <main className="page">
        <header className="hero">
          <div className="hero-container">
            <div className="hero-text">
              <h1>simply recipes</h1>
              <h4>no fluff, just recipes</h4>
            </div>
          </div>
        </header>
        <section className="recipes-container">
          <NavTags />
          <div className="recipes-list">
            {recipes?.map((recipe) => {
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
        </section>
      </main>
      <Footer />
    </>
  );
}
export default Home;
