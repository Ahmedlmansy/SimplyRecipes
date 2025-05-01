import { useEffect, useState } from "react";
import { getDishTypes } from "../services/api";
import { Link } from "react-router-dom";

function NavTags() {
  const [allDishTypes, setDishTypes] = useState({});
  useEffect(() => {
    const fetchDishTypes = async () => {
      try {
        const data = await getDishTypes();
        setDishTypes(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDishTypes();
  }, []);
  return (
    <>
      <div className="tags-container">
        <h4>dish types</h4>
        <div className="tags-list">
          {Object.entries(allDishTypes).map(([type, count]) => {
            return (
              <Link to={`/tags/${type}`} key={type}>
                {type} ({count})
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default NavTags;
