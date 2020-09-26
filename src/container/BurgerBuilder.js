import React, { Component } from "react";
import Aux from "../Hoc/Aux";
import Burger from "../Components/Burger/Burger";
import BuildControls from "../Components/Burger/BuildControls/BuildControls";
import Modal from "../Components/UI/Modal/Modal";
import OrderSummary from "../Components/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 0,
    purchaseable: true,
    purchasing: false
  };

  updatePurchaseState(ingridients) {
    const sum = Object.keys(ingridients)
      .map(igKey => {
        return ingridients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("wow");
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updgradedIng = {
      ...this.state.ingredients
    };
    updgradedIng[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updgradedIng });
    this.updatePurchaseState(updgradedIng);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updgradedIng = {
      ...this.state.ingredients
    };
    updgradedIng[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updgradedIng });
    this.updatePurchaseState(updgradedIng);
  };

  render() {
    let disabledIngred = { ...this.state.ingredients };
    for (let key in disabledIngred) {
      disabledIngred[key] = disabledIngred[key] <= 0;
    }
    console.log(disabledIngred);
    return (
      <Aux>
        <Burger ingridients={this.state.ingredients} />
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredientsSummary={this.state.ingredients}
            purCancel={this.purchaseCancelHandler}
            purSuccess={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice}
          />
        </Modal>
        <BuildControls
          added={this.addIngredientHandler}
          removed={this.removeIngredientHandler}
          disabled={disabledIngred}
          price={this.state.totalPrice}
          purchasable={this.state.purchaseable}
          purchase={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
