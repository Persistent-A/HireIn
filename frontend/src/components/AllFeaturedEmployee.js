import FeaturedEmp from "./FeaturedEmp"
import { SlArrowLeft, SlArrowRight } from "react-icons/sl"

const AllFeaturedEmployee = () => {

  return (
    <div className="all-featured-employees-container">
        <div>Featured Employees</div>
        
        <div className="all-featured-employees">
            <SlArrowLeft/>
            <FeaturedEmp name="Lakshman Badiga" ratings="5 Star" skills="Delivery guy" about="About Lakshman"/>
            <FeaturedEmp name="Minesh Tandel" ratings="5 Star" skills="Cook" about="About Lakshman"/>
            <FeaturedEmp name="Apurva" ratings="5 Star" skills="Cook" about="About Lakshman"/>
            <SlArrowRight/>
        </div>  
    </div>
  )
}

export default AllFeaturedEmployee
