import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

import logo from './images/logo.png';

const App = () => {
  const AppId = '5ce63375';
  const AppKey = 'c581de50cce9c533c31d58e159caf425';

  const [ recipes, setRecipes ] = useState([]);
  const [ search, setSearch ] = useState('');
  const [ query, setQuery ] = useState('Taco');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${AppId}&app_key=${AppKey}`);
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

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
        {recipes.map(recipe => (
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image} 
            cuisineType={recipe.recipe.cuisineType}
            dishType={recipe.recipe.dishType}
            mealType={recipe.recipe.mealType}
            url={recipe.recipe.url}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
