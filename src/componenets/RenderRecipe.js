import classes from "./Recipe.module.scss";
import genClasses from "../App.module.scss";
// import { Fraction } from "fractional";

import { FiClock, FiUsers } from "react-icons/fi";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import {
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlineArrowRight,
} from "react-icons/ai";
import Ingredients from "./Ingredients";
import { Fragment, useContext, useState, useEffect } from "react";
import AuthContext from "./store/auth-context";
import Error from "./store/Error";

const RenderRecipe = (props) => {
  const ctx = useContext(AuthContext);
  const [servings, setServings] = useState(ctx.recipe.servings);
  const [bookmarked, setBookmarked] = useState(false);
  const recipe = ctx.recipe;
  const id = recipe.id;

  useEffect(() => {
    return ctx.bookmarks.some((item) => item.id === id)
      ? setBookmarked(true)
      : setBookmarked(false);
  }, [ctx.bookmarks, id]);

  const increaseServingsHandler = function () {
    setServings((prev) => prev + 1);
  };

  const reduceServingsHandler = function () {
    setServings((prev) => {
      return prev === 1 ? prev : prev - 1;
    });
  };

  const ingredients = recipe.ingredients?.map((ing, i) => (
    <Ingredients
      quantity={ing.quantity ? (ing.quantity * servings) / recipe.servings : ""}
      unit={ing.unit}
      description={ing.description}
      key={i}
    />
  ));

  const addBookmarkHandler = async function (e) {
    e.preventDefault();

    if (bookmarked) {
      await ctx.deleteBookmark(recipe);
      return setBookmarked(false);
    } else {
      ctx.addBookmarkHandler(recipe);
      return setBookmarked(true);
    }
  };

  return (
    <Fragment>
      {!ctx.recipeError && (
        <div>
          <figure className={classes["recipe__fig"]}>
            <img
              src={recipe.image}
              alt={recipe.title}
              className={classes["recipe__img"]}
            />
            <h1 className={classes["recipe__title"]}>
              <span>{recipe.title}</span>
            </h1>
          </figure>

          <div className={classes["recipe__details"]}>
            <div className={classes["recipe__info"]}>
              <FiClock className={classes["recipe__info-icon"]} />

              <span
                className={`${classes["recipe__info-data"]} ${classes["recipe__info-data--minutes"]}`}
              >
                {(recipe.cookingTime / recipe.servings) * servings}
              </span>
              <span className={classes["recipe__info-text"]}>minutes</span>
            </div>
            <div className={classes["recipe__info"]}>
              <FiUsers className={classes["recipe__info-icon"]} />

              <span
                className={`${classes["recipe__info-data"]} ${classes["recipe__info-data--people"]}`}
              >
                {servings}
              </span>
              <span className={classes["recipe__info-text"]}>servings</span>

              <div className={classes["recipe__info-buttons"]}>
                <button
                  className={`${genClasses["btn--tiny"]} ${classes["btn--increase-servings"]}`}
                  onClick={reduceServingsHandler}
                >
                  <AiOutlineMinusCircle
                    className={`${genClasses["btn--tiny"]} ${classes["btn--increase-servings"]}`}
                  />
                </button>
                <button
                  className={`${genClasses["btn--tiny"]} ${classes["btn--increase-servings"]}`}
                  onClick={increaseServingsHandler}
                >
                  <AiOutlinePlusCircle
                    className={`${genClasses["btn--tiny"]} ${classes["btn--increase-servings"]}`}
                  />
                </button>
              </div>
            </div>

            <div className={classes["recipe__user-generated"]}>
              {/* <FiUsers /> */}
            </div>
            {!bookmarked && (
              <button
                className={genClasses["btn--round"]}
                onClick={addBookmarkHandler}
              >
                <GoBookmark />
              </button>
            )}
            {bookmarked && (
              <button
                className={genClasses["btn--round"]}
                onClick={addBookmarkHandler}
              >
                <GoBookmarkFill />
              </button>
            )}
          </div>

          <div className={classes["recipe__ingredients"]}>
            <h2 className={genClasses["heading--2"]}>Recipe ingredients</h2>
            <ul className={classes["recipe__ingredient-list"]}>
              {ingredients}
            </ul>
          </div>

          <div className={classes["recipe__directions"]}>
            <h2 className={genClasses["heading--2"]}>How to cook it</h2>
            <p className={classes["recipe__directions-text"]}>
              This recipe was carefully designed and tested by
              <span className={classes["recipe__publisher"]}>
                {` ${recipe.publisher}`}
              </span>
              . Please check out directions at their website.
            </p>
            <a
              className={`${genClasses["btn--small"]} ${classes["recipe__btn"]}`}
              href={recipe.sourceUrl}
              target=""
            >
              <span>Directions</span>
              <AiOutlineArrowRight className={classes["search__icon"]} />
            </a>
          </div>
        </div>
      )}
      {ctx.recipeError && <Error />}
    </Fragment>
  );
};

export default RenderRecipe;
