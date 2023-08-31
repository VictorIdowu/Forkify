import { useContext, useEffect, useState } from "react";
import classes from "./SearchResults.module.scss";
import genClasses from "./../App.module.scss";
import Spinner from "./Spinner";
import AuthContext from "./store/auth-context";
import Error from "./store/Error";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Results from "./Results";

const SearchResults = () => {
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [showPrevBtn, setShowPrevBtn] = useState(false);
  const [items, setItems] = useState([]);

  const ctx = useContext(AuthContext);
  const pageNum = ctx.pageNum;
  const searchResultsPerPage = 10;

  useEffect(() => {
    const getSearchResultsPage = function (page) {
      const start = (page - 1) * searchResultsPerPage;
      const end = page * searchResultsPerPage;

      return ctx.searchResult.slice(start, end);
    };
    setItems(getSearchResultsPage(pageNum));

    const numPages = Math.ceil(ctx.searchResult.length / searchResultsPerPage);
    // console.log(numPages);

    // Page 1, and there are other pages
    if (pageNum === 1 && numPages > 1) {
      setShowPrevBtn(false);
      setShowNextBtn(true);
    }

    // Other Pages
    if (pageNum < numPages && pageNum > 1) {
      setShowNextBtn(true);
      setShowPrevBtn(true);
    }

    // Last page
    if (pageNum === numPages) {
      setShowNextBtn(false);
      setShowPrevBtn(true);
    }
  }, [searchResultsPerPage, ctx.searchResult, pageNum]);

  const changePageHandler = function (e) {
    e.preventDefault();
    const btn = e.target.closest(`.${genClasses["btn--inline"]}`);
    ctx.changePageHandler(btn);
  };

  return (
    <div className={classes["search-results"]}>
      {ctx.searchLoading && !ctx.renderedSearch && <Spinner />}
      {ctx.renderedSearch && !ctx.searchLoading && <Results items={items} />}
      {ctx.searchError && <Error />}
      <div className={classes.pagination} onClick={changePageHandler}>
        {showPrevBtn && (
          <button
            className={`${genClasses["btn--inline"]} ${classes["pagination__btn--prev"]}`}
            value={pageNum - 1}
          >
            <AiOutlineArrowLeft className={classes.search__icon} />

            <span>{`Page ${pageNum - 1}`}</span>
          </button>
        )}
        {showNextBtn && (
          <button
            className={`${genClasses["btn--inline"]} ${classes["pagination__btn--next"]}`}
            value={pageNum + 1}
          >
            <span>{`Page ${pageNum + 1}`}</span>
            <AiOutlineArrowRight className={classes.search__icon} />
          </button>
        )}
      </div>
      <p className={classes.copyright}>
        &copy; Copyright by
        <a
          className={classes["twitter-link"]}
          href="https://twitter.com/jonasschmedtman"
        >
          Jonas Schmedtmann
        </a>
        . Use for learning or your portfolio. Don't use to teach. Don't claim as
        your own.
      </p>
    </div>
  );
};

export default SearchResults;
