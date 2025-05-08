import React, { useState } from "react";

export default function Dashboard() {
  const [username, setUsername] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    console.log(username);
  }

  return(
    <section>
      
    <h1>Logg inn</h1>
    <form>
      <label>
        Brukernavn
        <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        >
        </input>
      </label>
      <button onClick={handleClick}>Logg inn</button>
    </form> 

    </section>
  ) 
 
}
