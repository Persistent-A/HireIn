import React from 'react'

const ServiceDashboard = ({ services }) => {
  return (
    <div className="service-list-container">
      <h3 className="service-list-title">Services</h3>
      <ul className="service-list">
        {services.map((service) => (
          <li className="service-list-item" key={service.id}>
            <h4 className="service-list-item-title">{service.name}</h4>
            <p className="service-list-item-description">{service.description}</p>
            <button className="service-list-item-delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ServiceDashboard
