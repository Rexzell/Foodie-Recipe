import React from 'react';
import style from './recipe.module.css';
import Tilt from 'react-parallax-tilt';

const Recipe = ({ title, calories, image, cuisineType, dishType, mealType, url }) => {
  
  return (
      <Tilt className={style.recipe}>
        <h1 className={style.title}>{title}</h1>
        <img className={style.image} src={image} alt="" />
        <p>Cuisine Type: {cuisineType}</p>
        <p>Dish Type: {dishType}</p>
        <p>Meal Type: {mealType}</p>
        <p>Total Calories: {calories}</p>
        <a href={url} target="_blank"><div className={style.button}>Learn More</div></a>
      </Tilt>
  );
}

export default Recipe;
