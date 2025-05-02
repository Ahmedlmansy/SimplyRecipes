import { useState } from "react";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { Link } from "react-router-dom";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";

function Header() {
  const [showLinks, setShowLinks] = useState(false);
  const savedRecipes = useSelector((state) => state.saveRecipes);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to={"/"} className="nav-logo">
              <img src="/logo.svg" alt="simply recipes" />
            </Link>
            <button className="nav-btn btn" onClick={toggleLinks}>
              <DehazeIcon className="nav-icon" />
            </button>
          </div>
          <div className={`nav-links ${showLinks ? "show-links" : ""}`}>
            <Link to={"/"} className="nav-link">
              home
            </Link>
            <Link to={"/about"} className="nav-link">
              about
            </Link>
            <Link to={"/tags"} className="nav-link">
              tags
            </Link>
            <Link to={"/recipes"} className="nav-link">
              recipes
            </Link>
            <div className="nav-link contact-link">
              <Link to={"/contact"} className="btn">
                contact
              </Link>
            </div>
          </div>
          <div className="savedRecipes">
            <Link to={"/saved-recipes"} className="nav-link">
              <Badge
                color="default"
                badgeContent={savedRecipes.length}
                showZero
              >
                <BookmarksIcon className="nav-icon added" />
              </Badge>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
