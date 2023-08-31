import classes from "./Nav.module.scss";
import genClasses from "../../App.module.scss";
import { FiAlertTriangle } from "react-icons/fi";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import Preview from "../Preview";

const Bookmarks = () => {
  const ctx = useContext(AuthContext);

  const isBookmarks = ctx.bookmarks.length > 0;

  return (
    <ul className={classes["bookmarks__list"]}>
      {!isBookmarks && (
        <div className={genClasses.message}>
          <div>
            <FiAlertTriangle className={genClasses["message-logo"]} />
          </div>
          <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
        </div>
      )}
      {isBookmarks &&
        ctx.bookmarks?.map((item, i) => (
          <Preview items={ctx.bookmarks} item={item} i={i} key={i} />
        ))}
    </ul>
  );
};

export default Bookmarks;
