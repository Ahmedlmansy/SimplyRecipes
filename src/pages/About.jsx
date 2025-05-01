import { Link } from "react-router-dom";
import Footer from "../compoants/Footer";
import Header from "../compoants/Header";
import { useEffect, useState } from "react";
import { getRandomRecipes } from "../services/api";

function About() {
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
        <section className="about-page">
          <article>
            <h2>I m baby coloring book poke taxidermy</h2>
            <p>
              Taxidermy forage glossier letterpress heirloom before they sold
              out you probably haven t heard of them banh mi biodiesel chia.
            </p>
            <p>
              Taiyaki tumblr flexitarian jean shorts brunch, aesthetic salvia
              retro.
            </p>
            <Link to={`/contact`} className="btn">
              contact
            </Link>
          </article>
          <img
            src="/about.jpg"
            alt="Person Pouring Salt in Bowl"
            className="img about-img"
          />
        </section>
        <section className="featured-recipes">
          <h5 className="featured-title">Look At This Awesomesouce!</h5>
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
export default About;
