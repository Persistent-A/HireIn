import React, { useState } from "react";

const ManageUsers = () => {
  const [email, setEmail] = useState('')

  const searchUser = (e) => {
    e.preventDefault()
    console.log(email)
  }

  return (
    <form>
      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="submit" value='Search' />
    </form>
  );
};

export default ManageUsers;
