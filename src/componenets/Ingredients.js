import { BsCheck2 } from "react-icons/bs";
import classes from "./Recipe.module.scss";

const Ingredients = (props) => {
  return (
    <li className={classes["recipe__ingredient"]}>
      <BsCheck2 className={classes["recipe__icon"]} />

      <div className={classes["recipe__quantity"]}>{props.quantity}</div>
      <div className={classes["recipe__description"]}>
        <span className={classes["recipe__unit"]}>{props.unit}</span>
        {` ${props.description}`}
      </div>
    </li>
  );
};

export default Ingredients;
