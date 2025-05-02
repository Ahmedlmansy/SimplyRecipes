import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Tags from "./pages/Tags";
import Recipes from "./pages/Recipes";
import About from "./pages/About";
import RecipeDetails from "./pages/RecipeDetails";
import RecipesTag from "./pages/RecipesTag";
import SavedRecipes from "./pages/SavedRecipes";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/tags/:nameTag" element={<RecipesTag />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/savedRecipes" element={<SavedRecipes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
