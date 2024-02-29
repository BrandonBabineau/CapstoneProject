import { useState, useEffect } from 'react';
import { useAccountQuery } from "../redux/api";

function Account (props) {

  const { data, error, isLoading } = useAccountQuery(props.token);

  if (error || (!data?.user && !isLoading)) {
    return <p>Something went wrong!</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <h2>Account</h2>
      <ul>
        <li>Username: {data.user.username} </li>
        {data.user.email ? <li>Email: {data.user.email}</li> : ""}
        {data.user.first_name ? (
          <li>First Name: {data.user.first_name} </li>
        ) : (
          ""
        )}
        {data.user.last_name ? <li>Last Name: {data.user.last_name} </li> : ""}
      </ul>
    </section>
  );
}

export default Account;
