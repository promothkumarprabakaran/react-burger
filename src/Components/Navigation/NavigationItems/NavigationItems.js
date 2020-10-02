import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" active>
        {" "}
        Burger builder{" "}
      </NavigationItem>
      <NavigationItem link="/">CheckOut</NavigationItem>
    </ul>
  );
};

export default navigationItems;
