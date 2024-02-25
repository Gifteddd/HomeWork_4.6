import React from "react";
import "../styles/CategoryList.css";
import { Routes, Route, useParams, Link } from "react-router-dom";
import axios from "axios";

import Dish from "./Dish.jsx";

function CategoryList() {
  const params = useParams();
  const [allDishes, setAllDishes] = React.useState([]);
  const [currentCategory, setCurrentCategory] = React.useState();

  // Fetch all dishes
  React.useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/api/v1/dishes/",
    })
      .then((response) => {
        console.log("All Dishes:", response.data);
        setAllDishes(response.data);
      })
      .catch((e) => {
        console.log("Error fetching dishes:", e);
      });
  }, [params]);

  // Fetch current category
  React.useEffect(() => {
    if (params.id) {
      axios({
        method: "get",
        url: `http://localhost:8000/api/v1/categories/${params.id}/`,
      })
        .then((response) => {
          console.log("Current Category:", response.data);
          setCurrentCategory(response.data.name);
        })
        .catch((e) => {
          console.log("Error fetching current category:", e);
        });
    }
  }, [params.id]);

  return (
    <React.Fragment>
      <h2>Блюда из категории: </h2>
      {currentCategory ? (
        <h2 className="category-name">{currentCategory}</h2>
      ) : (
        <p>Loading category...</p>
      )}
      {allDishes.length > 0 ? (
        <nav className="dishes">
          <ul>
            {allDishes.map((dish) => {
              if (dish.category == params.id) {
                return (
                  <li key={dish.id}>
                    <Link to={"dishes/" + dish.id}>{dish.name}</Link>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      ) : (
        <p>Loading dishes...</p>
      )}
      <Routes>
        <Route path="dishes/:id/" element={<Dish />} />
      </Routes>
    </React.Fragment>
  );
}

export default CategoryList;
