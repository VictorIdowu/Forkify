import classes from "./Recipe.module.scss";
import genClasses from "../App.module.scss";
import { FiSmile } from "react-icons/fi";
import { useContext } from "react";
import RenderRecipe from "./RenderRecipe";
import Spinner from "./Spinner";
import AuthContext from "./store/auth-context";

const Recipe = (props) => {
  const ctx = useContext(AuthContext);

  return (
    <div className={classes.recipe}>
      {!ctx.recipeLoading && !ctx.renderedRecipe && (
        <div className={genClasses.message}>
          <div>
            <FiSmile className={classes["recipe-icon"]} />
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>
      )}
      {ctx.recipeLoading && !ctx.renderedRecipe && <Spinner />}
      {ctx.renderedRecipe && <RenderRecipe />}
    </div>
  );
};

export default Recipe;
