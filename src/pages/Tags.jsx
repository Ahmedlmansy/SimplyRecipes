import { Link } from "react-router-dom";
import Footer from "../compoants/Footer";
import Header from "../compoants/Header";
import { useEffect, useState } from "react";
import { getDishTypes } from "../services/api";

function Tags() {
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
      <Header />
      <main className="page">
        <section className="tags-wrapper">
          {Object.entries(allDishTypes).map(([type, count]) => {
            return (
              <Link to={`/tags/${type}`} className="tag" key={type}>
                <h5>{type}</h5>
                <p>({count}) recipe</p>
              </Link>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
export default Tags;
