import { useState, useEffect } from "react";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      localStorage.setItem("username", username);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      localStorage.removeItem("username");
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
   
    if(localStorage.getItem("username")){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <section>
      {isLoggedIn ? (
        <article>
          <h1> Min side </h1>
          <button onClick={handleLogout}>Logg inn</button>
        </article>
      ) : (
        <article>
          <h1>Logg inn</h1>
          <form>
            <label>
              Brukernavn
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              ></input>
            </label>
            <button onClick={handleLogin}>Logg inn</button>
          </form>
        </article>
      )}
    </section>
  );
}
