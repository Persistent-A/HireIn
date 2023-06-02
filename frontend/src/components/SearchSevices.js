import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { searchEmployee } from "../features/auth/authSlice";
import axios from "axios";
import ExpandedEmployee from "./ExpandedEmployee";

const SearchSevices = ({ services }) => {
  const [isEmployeeExpanded, setExpandEmployees] = useState(false);
  const [expandedEmployee, setExpandedEmployees] = useState();
  const dispatch = useDispatch();

  const { employee } = useSelector((state) => state.auth);

  const [specialization, setSearchParams] = useState();

  const handleSearchEmployee = (e) => {
    e.preventDefault();
    const searchParams = {
      specialization,
    };
    dispatch(searchEmployee(searchParams));
  };

  const toggleExpandEmployee = () => {
    setExpandEmployees(!isEmployeeExpanded);
  };

  const expandEmployee = async (emp) => {
    const searchIndividualEmployee = async (empId) => {
      const response = await axios.get(
        "/employees/display_individual_employee/" + empId
      );
      setExpandedEmployees(response.data);
    };
    await searchIndividualEmployee(emp._id);
    toggleExpandEmployee();
  };

  return (
    <>
      {isEmployeeExpanded ? (
        <ExpandedEmployee
          expandedEmployee={expandedEmployee}
          toggleExpandEmployee={toggleExpandEmployee}
        />
      ) : (
        <div className="search-services-container">
          <div className="search-services">
            <strong>Services:</strong>
            <select
              name="specialization"
              value={specialization}
              onChange={(e) => setSearchParams(e.currentTarget.value)}
            >
              <option>Select a specialization</option>
              {services.map((service) => (
                <option key={service._id} value={service.service_name}>
                  {service.service_name}
                </option>
              ))}
            </select>
            <button onClick={handleSearchEmployee}>
              <strong>
                <MdSearch />
              </strong>
            </button>
          </div>
          <div className="search-services-results">
            {!employee || !employee[0] ? (
              <div className="no-employees-found">No employees found</div>
            ) : (
              employee.map((emp) => (
                <div key={emp._id}>
                  <h4>
                    {emp.first_name} {emp.last_name}
                  </h4>
                  <p>{emp.specialization}</p>
                  <button onClick={() => expandEmployee(emp)}>
                    Book an Appointment
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchSevices;
