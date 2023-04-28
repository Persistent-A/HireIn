import React from 'react'
import { useSelector } from 'react-redux'

const ExpandedEmployee = ({expandedEmployee}) => {
    const{_id, first_name, last_name, specialization, age, phone, email} = expandedEmployee
    const { employee } = useSelector((state) => state.auth)

  return (
    <div>
        <div>
          <h4>{`${first_name}`}</h4>
        </div>
    </div>
  )
}

export default ExpandedEmployee
