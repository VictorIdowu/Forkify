import { FiLoader } from "react-icons/fi";
import classes from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={classes["spinner-div"]}>
      <FiLoader className={classes.spinner} />
    </div>
  );
};

export default Spinner;
