import AddRecipe from "../AddRecipe";
import { Fragment, useContext } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.scss";
import AuthContext from "../store/auth-context";

const Backdrop = (props) => {
  const ctx = useContext(AuthContext);
  return <div className={classes.overlay} onClick={ctx.closeAddRecipeForm} />;
};

const portalEl = document.getElementById("overlays");

const Modal = () => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalEl)}
      {ReactDOM.createPortal(<AddRecipe />, portalEl)}
    </Fragment>
  );
};

export default Modal;
