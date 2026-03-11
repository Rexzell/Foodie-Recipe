import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

import logo from './images/logo.png';

const App = () => {
  const AppId = process.env.REACT_APP_EDAMAM_APP_ID;
  const AppKey = process.env.REACT_APP_EDAMAM_APP_KEY;

  const [ recipes, setRecipes ] = useState([]);
  const [ search, setSearch ] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRecipes("taco");
  }, []);

  const getRecipes = async (searchQuery) => {
    setLoading(true);

    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?q=${searchQuery}&type=public&app_id=${AppId}&app_key=${AppKey}`
    );
    const data = await response.json();

    setRecipes(data.hits || []);
    setLoading(false);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    if(!search) return;
    getRecipes(search);
    setSearch('');
  };

  return(
    <div className="App">
        <center>
          <img className="Logo" src={logo} />
        </center>

        <form onSubmit={getSearch} className="searchForm">
          <input className="searchBar" type="text" placeholder="Search in Foodie Recipe" value={search} onChange={updateSearch} />

          <button className="searchButton" type="submit">Search</button>
        </form>

      <div className="recipes">
        {loading ? (
          <h2 className="loading">Loading recipes...</h2>
        ) : recipes.length === 0 ? (
          <h2 className="noRecipe">Food recipe does not exist</h2>
        ) : (
          recipes.map(recipe => (
            <Recipe 
              key={recipe.recipe.uri}
              title={recipe.recipe.label} 
              calories={Math.round(recipe.recipe.calories)}
              image={recipe.recipe.image} 
              cuisineType={recipe.recipe.cuisineType}
              dishType={recipe.recipe.dishType}
              mealType={recipe.recipe.mealType}
              url={recipe.recipe.url}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
