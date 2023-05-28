//import styles
import "../Styles/featuredEmployee.css";

const FeaturedEmp = (props) => {
  return (
    <div className="featuredEmployeeContainer">
      <div>
        <p>{props.name}</p>
        <p>{props.ratings}</p>
      </div>
      <div>{props.skills}</div>
      <div>{props.about}</div>
    </div>
  );
};

export default FeaturedEmp;
