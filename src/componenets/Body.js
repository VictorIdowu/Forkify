import Header from "./header/Header";
import SearchResults from "./SearchResults";
import Recipe from "./Recipe";
import { useEffect, useState } from "react";
import AuthContext from "./store/auth-context";
import { getJson } from "./store/Helper";
import { timeOut } from "./store/Helper";
import Modal from "./UI/Modal";

const Body = () => {
  const [recipe, setRecipe] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [renderedRecipe, setRenderedRecipe] = useState(false);
  const [renderedSearch, setRenderedSearch] = useState(false);
  const [recipeIsLoading, setRecipeIsLoading] = useState(false);
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [recipeError, setRecipeError] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [addError, setAddError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [bookmarks, setBookmarks] = useState([]);
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);
  const [ownRecipe, setOwnRecipe] = useState([]);

  const ApiUrl = "https://forkify-api.herokuapp.com/api/v2/recipes/";

  useEffect(() => {
    const storedSearchResult = localStorage.getItem("searchResult");
    const storedBookmarks = localStorage.getItem("bookmarks");
    const storedOwnRecipe = localStorage.getItem("ownRecipe");

    if (storedSearchResult) {
      setSearchResult(JSON.parse(storedSearchResult));
      setRenderedSearch(true);
    }

    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }

    if (storedOwnRecipe) {
      setBookmarks(JSON.parse(storedOwnRecipe));
    }

    if (!window.location.hash) return;

    displayRecipe(`${window.location.hash.slice(1)}`);
  }, []);

  useEffect(() => {
    localStorage.setItem("ownRecipe", JSON.stringify(ownRecipe));
  }, [bookmarks, ownRecipe]);

  const displayRecipe = async function (id, item) {
    try {
      if (!id) return;

      await setRecipeError(false);
      await setRenderedRecipe(false);
      await setRecipeIsLoading(true);

      const data = await Promise.race([getJson(`${ApiUrl}${id}`), timeOut(10)]);

      const { recipe } = await data.data;

      await setRecipe(
        await {
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          sourceUrl: recipe.source_url,
          image: recipe.image_url,
          servings: recipe.servings,
          cookingTime: recipe.cooking_time,
          ingredients: recipe.ingredients,
        }
      );

      await setRecipeIsLoading(false);
      setActiveRecipe(item);
      return setRenderedRecipe(true);
    } catch (err) {
      await setErrorMsg(`${err.message}`);
      await setRecipeError(true);
      return setRenderedRecipe(true);
    }
  };

  const loadSearchResults = async function (query) {
    try {
      if (!query) return;

      await setRenderedSearch(false);
      await setSearchError(false);
      await setSearchIsLoading(true);

      const data = await getJson(`${ApiUrl}?search=${query}`);

      const result = await data.data.recipes.map((res) => {
        return {
          id: res.id,
          title: res.title,
          publisher: res.publisher,
          image: res.image_url,
        };
      });

      if (result.length < 1) {
        setSearchIsLoading(false);
        setErrorMsg(
          `No recipes found for your query (${query})! Please try again :)`
        );
        return setSearchError(true);
      }

      await localStorage.removeItem("searchResult");
      await localStorage.setItem("searchResult", JSON.stringify(result));
      await setSearchResult(result);

      await setSearchIsLoading(false);

      await setPageNum(1);

      return setRenderedSearch(true);
    } catch (err) {
      console.error(err);
    }
  };

  const changePageHandler = function (btn) {
    if (!btn) return;
    setPageNum(+btn.value);
  };

  const addBookmarkHandler = async function (rec) {
    let recipeArr = await [...bookmarks, rec];
    await setBookmarks(await recipeArr);
    await localStorage.removeItem("bookmarks");
    return localStorage.setItem("bookmarks", JSON.stringify(await recipeArr));
  };

  const deleteBookmark = async function (rec) {
    let recipeArr = await bookmarks.filter((el) => el.id !== rec.id);
    setBookmarks(await recipeArr);
    await localStorage.removeItem("bookmarks");
    return localStorage.setItem("bookmarks", JSON.stringify(await recipeArr));
  };

  const openAddRecipeForm = function () {
    setIsAddingRecipe(true);
  };

  const closeAddRecipeForm = function () {
    setAddError(false);
    setIsAddingRecipe(false);
  };

  const addOwnRecipe = async function (recipe) {
    try {
      let ownRec = await [...ownRecipe, recipe];
      setOwnRecipe(ownRec);
    } catch (err) {
      setErrorMsg(`💥💥 ${err.message}`);
      setAddError(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ApiUrl: ApiUrl,
        recipe: recipe,
        searchResult: searchResult,
        displayRecipe: displayRecipe,
        loadSearch: loadSearchResults,
        recipeLoading: recipeIsLoading,
        searchLoading: searchIsLoading,
        renderedRecipe: renderedRecipe,
        renderedSearch: renderedSearch,
        recipeError: recipeError,
        searchError: searchError,
        errorMsg: errorMsg,
        pageNum: pageNum,
        changePageHandler: changePageHandler,
        bookmarks: bookmarks,
        addBookmarkHandler: addBookmarkHandler,
        deleteBookmark: deleteBookmark,
        activeRecipe: activeRecipe,
        openAddRecipeForm: openAddRecipeForm,
        closeAddRecipeForm: closeAddRecipeForm,
        ownRecipe: ownRecipe,
        addOwnRecipe: addOwnRecipe,
        addError: addError,
      }}
    >
      <div className="container">
        <Header />
        <SearchResults />
        <Recipe />
      </div>
      {isAddingRecipe && <Modal />}
    </AuthContext.Provider>
  );
};

export default Body;
