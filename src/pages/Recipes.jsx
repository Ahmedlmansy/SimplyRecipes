import { Link } from "react-router-dom";
import Footer from "../compoants/Footer";
import Header from "../compoants/Header";
import NavTags from "../compoants/TagsCompoant";
import { useEffect, useState } from "react";
import { getAllRecipes } from "../services/api";
import { toggleSavedRecipe } from "../rtk/slices/saveRecipes-slice";
import { useDispatch, useSelector } from "react-redux";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

function Recipes() {
  const dispatch = useDispatch();
  const savedRecipes = useSelector((state) => state.saveRecipes);
  const checkSavedRecipe = (recipe) => {
    return savedRecipes.some((item) => item.id === recipe.id);
  };
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [limt, setLimit] = useState(30);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const recipesPerPage = 20;
  useEffect(() => {
    const allRecipes = getAllRecipes();
    allRecipes
      .then((res) => {
        setRecipes(res);
        setDisplayedRecipes(res.slice(0, recipesPerPage));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 5
      ) {
        setLoading(true);
        setLimit((prevLimit) => {
          const newLimit = prevLimit + recipesPerPage;
          if (newLimit >= recipes.length) {
            setHasMore(false);
            setDisplayedRecipes(recipes);
            return recipes.length;
          }
          setDisplayedRecipes(recipes.slice(0, newLimit));
          return newLimit;
        });
        setLoading(false);
      }
    };

    if (hasMore) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, recipes]);

  return (
    <>
      <Header />
      <main className="page">
        <section className="recipes-container">
          <NavTags />
          <div className="recipes-list">
            {displayedRecipes?.map((recipe) => {
              return (
                <Link
                  to={`/recipes/${recipe.id}`}
                  className="recipe"
                  key={recipe.id}
                >
                  <img src={`${recipe.image}`} className="img recipe-img" />
                  <div className="details">
                    <h5>{recipe.title}</h5>
                    <p>Prep : {recipe.readyInMinutes}min</p>

                    <div
                      className="saved-icon"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(toggleSavedRecipe(recipe));
                      }}
                    >
                      {checkSavedRecipe(recipe) ? (
                        <BookmarkAddedIcon className="added" />
                      ) : (
                        <BookmarkAddIcon />
                      )}
                    </div>
                  </div>
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
export default Recipes;
