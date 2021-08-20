import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles/SearchCategories.css";
const SearchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const fetchCategories = () => {
      fetch("/api/playlists")
        .then((res) => res.json())
        .then((res) => {
          let categories = res.items.map((item) => {
            return { name: item.name, id: item.id, icon: item.icons[0].url };
          });
          categories = categories.filter((item) => {
            return item.id !== 'happier_than_ever' && item.id !== 'sleep' && item.id !== 'jre_podcast' && item.id !=='shows_with_music'
          })
          setCategories(categories);
          setShowCategories(true);
        });
    };
    fetchCategories();
  }, []);
  return (
    <>
      {showCategories ? (
        <div className="search-categories-container">
          <h1>Browse all</h1>
          <div className="search-categories-items">
            {categories.map((item) => {
              return (
                <div className="search-category" onClick={() => {history.push(`/playlists/${item.id}`)}} key={item.id}>
                  <img src={item.icon} alt="genre" />
                  <h1>{item.name}</h1>
                  <h2>Genre</h2>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="search-categories-container"></div>
      )}
    </>
  );
};

export default SearchCategories;
