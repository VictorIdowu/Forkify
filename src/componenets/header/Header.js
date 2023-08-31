import classes from "./Header.module.scss";
import Search from "./Search";
import img from "../img/logo.png";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className={classes.header}>
      <img src={img} alt="Logo" className={classes["header__logo"]} />
      <Search />
      <Nav />
    </header>
  );
};

export default Header;
