import classes from "./Search.module.scss";
import genClasses from "../../App.module.scss";
import { LuSearch } from "react-icons/lu";
import { useContext, useState } from "react";
import AuthContext from "../store/auth-context";

const Search = () => {
  const [keyWord, setKeyWord] = useState("");

  const ctx = useContext(AuthContext);

  const btn = `${genClasses.btn} ${genClasses["search__btn"]}`;

  const searchKeyHandler = async function (e) {
    const inputVal = await e.target.value;

    setKeyWord(inputVal);
  };

  const loadSearchResults = async function (e) {
    try {
      await e.preventDefault();
      await ctx.loadSearch(keyWord);

      setKeyWord("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={classes.search} onSubmit={loadSearchResults}>
      <input
        type="text"
        className={classes["search__field"]}
        placeholder="Search over 1,000,000 recipes..."
        value={keyWord}
        onChange={searchKeyHandler}
      />
      <button className={btn}>
        <aside className={classes["search__icon"]}>
          <LuSearch />
        </aside>
        <span>Search</span>
      </button>
    </form>
  );
};

export default Search;
