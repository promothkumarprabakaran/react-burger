import React, { Component } from "react";
import Aux from "../Hoc/Aux";
import Burger from "../Components/Burger/Burger";
import BuildControls from "../Components/Burger/BuildControls/BuildControls";
import Modal from "../Components/UI/Modal/Modal";
import OrderSummary from "../Components/OrderSummary/OrderSummary";
import axios from "../axios-orders.js";
import orderSummary from "../Components/OrderSummary/OrderSummary";
import Spinner from "../Components/UI/Spinner/Spinner";
import withErrorHandler from "../Hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchaseable: true,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("https://react-burger-project-2bfd1.firebaseio.com/ingredients")
      .then(response => {
        console.log("Response from FireBase", response.data);
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }
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
    //alert("wow");
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Promoth",
        address: {
          street: "test",
          zipcode: "670313",
          country: "SG"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
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
    console.log("Rendering...", this.state.ingredients);
    let disabledIngred = { ...this.state.ingredients };
    for (let key in disabledIngred) {
      disabledIngred[key] = disabledIngred[key] <= 0;
    }

    let sum = null;
    let burger = this.state.error ? (
      <p>Ingredients cant be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingridients={this.state.ingredients} />
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

      sum = (
        <OrderSummary
          ingredientsSummary={this.state.ingredients}
          purCancel={this.purchaseCancelHandler}
          purSuccess={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      sum = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {sum}
        </Modal>

        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
