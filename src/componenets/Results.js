import SearchClasses from "./SearchResults.module.scss";
import Preview from "./Preview";

const Results = (props) => {
  return (
    <ul className={SearchClasses.results}>
      {props.items.map((item, i) => (
        <Preview items={props.items} item={item} i={i} key={i} />
      ))}
    </ul>
  );
};

export default Results;
