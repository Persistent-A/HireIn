import "../Styles/AllFeaturedEmployee.css"
import Featuremp from "./FeaturEplyee"

const AllFeaturEplyee = () => {
  return (
    <div className="all-featured-employees-container">
      <div>Featured Employees</div>
      <div className="all-featured-employees">
        <Featuremp name="Apurva" rating="5star" featuredSkills="Cook" aboutEplyee="lakfdjslgfakdsjglakgjdf"/>
        <Featuremp name="Lakshman" rating="4star" featuredSkills="Plumber" aboutEplyee="akjdbsljfvaj"/>
        <Featuremp name="Minesh" rating="4.5star" featuredSkills="House Keeping" aboutEplyee="a.kdjsfb;kjfadf'a"/>
      </div>
    </div>
  )
}

export default AllFeaturEplyee
