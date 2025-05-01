import { useEffect, useState } from "react";
import Footer from "../compoants/Footer";
import Header from "../compoants/Header";
import { getRandomRecipes } from "../services/api";
import { Link } from "react-router-dom";

function Contact() {
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
        <section className="contact-container">
          <article className="contact-info">
            <h3>Want To Get In Touch?</h3>
            <p>
              Four dollar toast biodiesel plaid salvia actually pickled banjo
              bespoke mlkshk intelligentsia edison bulb synth.
            </p>
            <p>Cardigan prism bicycle rights put a bird on it deep v.</p>
            <p>
              Hashtag swag health goth air plant, raclette listicle fingerstache
              cold-pressed fanny pack bicycle rights cardigan poke.
            </p>
          </article>
          <article>
            <form className="form contact-form">
              <div className="form-row">
                <label className="form-label">your name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-input"
                />
              </div>
              <div className="form-row">
                <label className="form-label">your email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-input"
                />
              </div>
              <div className="form-row">
                <label className="form-label">message</label>
                <textarea
                  name="message"
                  id="message"
                  className="form-textarea"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-block">
                submit
              </button>
            </form>
          </article>
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
export default Contact;
