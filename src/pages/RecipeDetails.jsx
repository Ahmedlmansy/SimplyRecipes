import Footer from "../compoants/Footer";
import Header from "../compoants/Header";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import { getRecipeDetails } from "../services/api";
import { Link, useParams } from "react-router-dom";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { useDispatch, useSelector } from "react-redux";
import { toggleSavedRecipe } from "../rtk/slices/saveRecipes-slice";
function RecipeDetails() {
  const dispatch = useDispatch();
  const savedRecipes = useSelector((state) => state.saveRecipes);
  const checkSavedRecipe = (recipe) => {
    return savedRecipes.some((item) => item.id === recipe.id);
  };

  //
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let params = useParams();
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const res = await getRecipeDetails(params.id);
        const data = res.data;
        setRecipe(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch recipe details.");
        setLoading(false);
        console.error(err);
      }
    };
    fetchRecipeDetails();
  }, [params.id]);

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe || !Array.isArray(recipe) || recipe.length === 0) {
    return <p>No recipe data available.</p>;
  }

  const recipeData = recipe[0];
  const equipmentList = [];
  if (
    recipeData.analyzedInstructions &&
    Array.isArray(recipeData.analyzedInstructions) &&
    recipeData.analyzedInstructions.length > 0
  ) {
    recipeData.analyzedInstructions[0].steps.forEach((step) => {
      step.equipment.forEach((equipment) => {
        equipmentList.push(equipment.name);
      });
    });
  }
  const uniqueEquipmentList = [...new Set(equipmentList)];
  return (
    <>
      <Header />
      <main className="page">
        <div className="recipe-page">
          <section className="recipe-hero">
            <img
              src={recipeData.image || "https://placehold.co/200"}
              className="img recipe-hero-img"
              alt={recipeData.title || "Recipe Image"}
            />
            <article className="recipe-info">
              <h2>
                {recipeData.title || "No Title Available"}
                <div
                  className="saved-icon"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(toggleSavedRecipe(recipeData));
                  }}
                >
                  {checkSavedRecipe(recipeData) ? (
                    <BookmarkAddedIcon className="added" />
                  ) : (
                    <BookmarkAddIcon />
                  )}
                </div>
              </h2>

              <p>
                {recipeData.summary
                  ? recipeData.summary.replace(/<[^>]+>/g, "")
                  : "No summary available."}
              </p>
              <div className="recipe-icons">
                <article>
                  <AccessTimeFilledIcon />
                  <h5>prep time</h5>
                  <p>{recipeData.preparationMinutes || "N/A"} min.</p>
                </article>
                <article>
                  <AccessTimeIcon />
                  <h5>cook time</h5>
                  <p>{recipeData.cookingMinutes || "N/A"} min.</p>
                </article>
                <article>
                  <PersonIcon />
                  <h5>serving</h5>
                  <p>{recipeData.servings || "N/A"} servings</p>
                </article>
              </div>
              <p className="recipe-tags">
                Tags:{" "}
                {recipeData.dishTypes && Array.isArray(recipeData.dishTypes)
                  ? recipeData.dishTypes.map((type) => (
                      <Link to={`/tags/${type}`} key={type}>
                        {type}{" "}
                      </Link>
                    ))
                  : "لا توجد وسوم"}
              </p>
            </article>
          </section>
          <section className="recipe-content">
            <article>
              <h4>instructions</h4>
              {recipeData.analyzedInstructions &&
              Array.isArray(recipeData.analyzedInstructions) &&
              recipeData.analyzedInstructions.length > 0 ? (
                recipeData.analyzedInstructions[0].steps.map((step) => (
                  <div className="single-instruction" key={step.number}>
                    <header>
                      <p>Step {step.number}</p>
                      <div></div>
                    </header>
                    <p>{step.step || "No instruction available."}</p>
                  </div>
                ))
              ) : (
                <p>No instructions available.</p>
              )}
            </article>
            <article className="second-column">
              <div>
                <h4>ingredients</h4>
                {recipeData.extendedIngredients &&
                Array.isArray(recipeData.extendedIngredients) ? (
                  recipeData.extendedIngredients.map((ingredient) => (
                    <p className="single-ingredient" key={ingredient.id}>
                      {ingredient.amount || "N/A"} {ingredient.unit || ""}{" "}
                      {ingredient.name || "N/A"}
                    </p>
                  ))
                ) : (
                  <p>No ingredients available.</p>
                )}
              </div>
              <div>
                <h4>tools</h4>
                {uniqueEquipmentList.map((e) => {
                  return (
                    <p key={e} className="single-tool">
                      {e}
                    </p>
                  );
                })}
              </div>
            </article>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default RecipeDetails;
