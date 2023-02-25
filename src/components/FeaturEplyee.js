const Featuremp = (props) => {
  return (
    <div className="feature-employee-card">
      <div>
        <div>{props.name}</div>
        <div>{props.rating}</div>
      </div>
      <div>{props.featuredSkills}</div>
      <div>{props.aboutEplyee}</div>
    </div>
  )
}

export default Featuremp
