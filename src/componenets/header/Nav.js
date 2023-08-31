import classes from "./Nav.module.scss";
import { LuEdit } from "react-icons/lu";
import { FiBookmark } from "react-icons/fi";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import Bookmarks from "./Bookmarks";

const Nav = () => {
  const ctx = useContext(AuthContext);

  const navAdd = `${classes["nav__btn"]} ${classes["nav__btn--add-recipe"]}`;

  const navBookmark = `${classes["nav__btn"]} ${classes["nav__btn--bookmarks"]}`;

  const seeBookmarks = (e) => {
    e.preventDefault();
    console.log(ctx.bookmarks);
  };

  return (
    <nav className={classes.nav}>
      <ul className={classes["nav__list"]}>
        <li className={classes["nav__item"]}>
          <button className={navAdd} onClick={ctx.openAddRecipeForm}>
            <LuEdit className={classes["nav__icon"]} />
            <span>Add recipe</span>
          </button>
        </li>
        <li className={classes["nav__item"]}>
          <button className={navBookmark} onClick={seeBookmarks}>
            <FiBookmark className={classes["nav__icon"]} />
            <span>Bookmarks</span>
          </button>
          <div className={classes.bookmarks}>
            <Bookmarks />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
