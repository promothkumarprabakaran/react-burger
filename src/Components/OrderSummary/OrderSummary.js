import React from "react";
import Aux from "../../Hoc/Aux";
import Button from "../UI/Button/Button";

const orderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredientsSummary).map(key => {
    return (
      <li key={key}>
        <span>
          {key}: {props.ingredientsSummary[key]}
        </span>
      </li>
    );
  });

  return (
    <Aux>
      <h3> Your order summary !!!</h3>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total price: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout ?</p>
      <Button btnType="Danger" clicked={props.purCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purSuccess}>
        {" "}
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
