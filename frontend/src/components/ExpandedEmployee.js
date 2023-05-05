import React from 'react'

const ExpandedEmployee = ({expandedEmployee}) => {
    const{_id, first_name, last_name, specialization, age, phone, email} = expandedEmployee

  return (
    <div className='expanded-employee'>
      <h4>{`${first_name} ${last_name}`}</h4>
      <p>{age}</p>
      <p>{phone}</p>
      <p>{email}</p>
      <p>{specialization}</p>
    </div>
  )
}

export default ExpandedEmployee
