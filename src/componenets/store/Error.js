import { useContext } from "react";
import classes from "../../App.module.scss";
import { FiAlertTriangle } from "react-icons/fi";
import AuthContext from "./auth-context";

const Error = (props) => {
  const ctx = useContext(AuthContext);

  return (
    <div className={classes.error}>
      <div>
        <FiAlertTriangle className={classes["error-logo"]} />
      </div>
      <p>{ctx.errorMsg || props.msg}</p>
    </div>
  );
};

export default Error;
