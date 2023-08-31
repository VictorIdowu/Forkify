import classes from "./UI/Modal.module.scss";
import genClasses from "../App.module.scss";
import { FiUploadCloud } from "react-icons/fi";
import { useContext, useState } from "react";
import AuthContext from "./store/auth-context";
import Error from "./store/Error";

const AddRecipe = () => {
  const ctx = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [publisher, setPublisher] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [servings, setServings] = useState("");
  const [ing1, setIng1] = useState("");
  const [ing2, setIng2] = useState("");
  const [ing3, setIng3] = useState("");
  const [ing4, setIng4] = useState("");
  const [ing5, setIng5] = useState("");
  const [ing6, setIng6] = useState("");

  const uploadHandler = async function (e) {
    try {
      e.preventDefault();

      const ingredients = [ing1, ing2, ing3, ing4, ing5, ing6]
        .map((ing) => {
          return ing.length > 1 ? ing.replaceAll(" ", "").split(",") : "";
        })
        .filter((ing) => ing.length > 0)
        .map((ing) => {
          return { quantity: +ing[0], unit: ing[1], description: ing[2] };
        });

      // console.log(ingredients);

      const data = await {
        title: title,
        sourceUrl: url,
        image: imgUrl,
        publisher: publisher,
        cookingTime: +prepTime,
        servings: +servings,
        ingredients: ingredients,
      };

      await ctx.addOwnRecipe(data);

      setTitle("");
      setImgUrl("");
      setPrepTime("");
      setPublisher("");
      setServings("");
      setUrl("");

      setIng1("");
      setIng2("");
      setIng3("");
      setIng4("");
      setIng5("");
      setIng6("");

      console.log(ctx.ownRecipe);
    } catch (err) {
      console.error(err);
      // console.log(err);
      throw err;
    }
  };

  return (
    <div className={classes["add-recipe-window"]}>
      <button
        className={classes["btn--close-modal"]}
        onClick={ctx.closeAddRecipeForm}
      >
        &times;
      </button>
      {!ctx.addError && (
        <form className={classes.upload} onSubmit={uploadHandler}>
          <div className={classes["upload__column"]}>
            <h3 className={classes["upload__heading"]}>Recipe data</h3>
            <label>Title</label>
            <input
              value={title}
              required
              name="title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>URL</label>
            <input
              value={url}
              required
              name="sourceUrl"
              type="text"
              onChange={(e) => setUrl(e.target.value)}
            />
            <label>Image URL</label>
            <input
              value={imgUrl}
              required
              name="image"
              type="text"
              onChange={(e) => setImgUrl(e.target.value)}
            />
            <label>Publisher</label>
            <input
              value={publisher}
              required
              name="publisher"
              type="text"
              onChange={(e) => setPublisher(e.target.value)}
            />
            <label>Prep time</label>
            <input
              value={prepTime}
              required
              name="cookingTime"
              type="number"
              onChange={(e) => setPrepTime(e.target.value)}
            />
            <label>Servings</label>
            <input
              value={servings}
              required
              name="servings"
              type="number"
              onChange={(e) => setServings(e.target.value)}
            />
          </div>

          <div className={classes["upload__column"]}>
            <h3 className={classes["upload__heading"]}>Ingredients</h3>
            <label>Ingredient 1</label>
            <input
              value={ing1}
              type="text"
              required
              name="ingredient-1"
              placeholder="Format: 'Quantity,Unit,Description'"
              onChange={(e) => setIng1(e.target.value)}
            />
            <label>Ingredient 2</label>
            <input
              value={ing2}
              type="text"
              name="ingredient-2"
              placeholder="Format: 'Quantity,Unit,Description'"
              onChange={(e) => setIng2(e.target.value)}
            />
            <label>Ingredient 3</label>
            <input
              value={ing3}
              type="text"
              name="ingredient-3"
              placeholder="Format: 'Quantity,Unit,Description'"
              onChange={(e) => setIng3(e.target.value)}
            />
            <label>Ingredient 4</label>
            <input
              value={ing4}
              type="text"
              name="ingredient-4"
              placeholder="Format: 'Quantity,Unit,Description'"
              onChange={(e) => setIng4(e.target.value)}
            />
            <label>Ingredient 5</label>
            <input
              value={ing5}
              type="text"
              name="ingredient-5"
              placeholder="Format: 'Quantity,Unit,Description'"
              onChange={(e) => setIng5(e.target.value)}
            />
            <label>Ingredient 6</label>
            <input
              value={ing6}
              type="text"
              name="ingredient-6"
              placeholder="Format: 'Quantity,Unit,Description'"
              onChange={(e) => setIng6(e.target.value)}
            />
          </div>

          <button className={`${genClasses["btn"]} ${classes["upload__btn"]}`}>
            <FiUploadCloud />

            <span>Upload</span>
          </button>
        </form>
      )}
      {ctx.addError && <Error />}
    </div>
  );
};

export default AddRecipe;
