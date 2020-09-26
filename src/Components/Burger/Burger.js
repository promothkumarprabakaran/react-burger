import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "../Burger/Burger.css";

const burger = props => {
  let transformedIngridients = Object.keys(props.ingridients) //converting an object into array
    .map(igKey => {
      return [...Array(props.ingridients[igKey])] // an array with two elements
        .map((_, i) => {
          return <BurgerIngredient key={igKey + i} type={igKey} />;
        });
    })
    .reduce((prev, el) => {
      return prev.concat(el);
    }, []);

  if (transformedIngridients.length === 0) {
    transformedIngridients = <p>Please add some elements !!! </p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngridients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
