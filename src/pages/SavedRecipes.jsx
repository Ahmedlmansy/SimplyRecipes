import { useDispatch, useSelector } from "react-redux";
import Footer from "../compoants/Footer";
import Header from "../compoants/Header";
import { Link } from "react-router-dom";
import {
  clearSavedRecipes,
  toggleSavedRecipe,
} from "../rtk/slices/saveRecipes-slice";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
function SavedRecipes() {
  const dispatch = useDispatch();
  const savedRecipes = useSelector((state) => state.saveRecipes);
  const checkSavedRecipe = (recipe) => {
    return savedRecipes.some((item) => item.id === recipe.id);
  };
  return (
    <>
      <Header />
      <main className="page">
        {savedRecipes.length === 0 ? (
          <div className="notAvailable">
            <div className="">
              There are no recipes available. Go to the main page and add to the
              favorite!
            </div>
            <div className="">
              <Link to={"/"} className="btn">
                Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="featured-recipes">
            <h4> Saved Recipes </h4>
            <div className="recipes-list">
              {savedRecipes?.map((recipe) => {
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
            <div className="clear">
              {" "}
              <p
                className="btn"
                onClick={() => {
                  dispatch(clearSavedRecipes());
                }}
              >
                {" "}
                Clear All{" "}
              </p>{" "}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
export default SavedRecipes;
