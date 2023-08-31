import { useContext, useState } from "react";
import classes from "./Preview.module.scss";
import AuthContext from "./store/auth-context";

const Preview = (props) => {
  const [item, setItem] = useState(props.item);

  const ctx = useContext(AuthContext);

  const displayRecipe = async function (e) {
    try {
      const el = +e.target.closest("a").dataset.item;

      const id = await e.target.closest("a").hash.slice(1);

      await setItem(props.items[el]);

      return ctx.displayRecipe(await id, props.items[el]);
    } catch (err) {
      console.error(`${err.message}`);
    }
  };

  return (
    <li className={classes.preview} key={props.item.id} onClick={displayRecipe}>
      <a
        className={`${classes["preview__link"]} ${
          item === ctx.activeRecipe ? classes["preview__link--active"] : ""
        }`}
        href={`#${props.item.id}`}
        data-item={props.i}
      >
        <figure className={classes["preview__fig"]}>
          <img src={props.item.image} alt={props.item.publisher} />
        </figure>
        <div className={classes["preview__data"]}>
          <h4 className={classes["preview__title"]}>{props.item.title}</h4>
          <p className={classes["preview__publisher"]}>
            {props.item.publisher}
          </p>
          {/* <div className={classes["preview__user-generated"]}> */}
          {/* <svg>
              <use href="src/img/icons.svg#icon-user"></use>
              // ${classes["preview__link--active"]}
            </svg> */}
          {/* </div> */}
        </div>
      </a>
    </li>
  );
};

export default Preview;
