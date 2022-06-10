import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

import CharactersList from "./components/CharactersList/CharactersList";
import SignInScreen from "./components/Auth/SignInScreen/SignInScreen";
import { createContext, useEffect, useState } from "react";
import { getFromLocalStorage } from "./helpers/storageServices/storageServices";
import { localStorageKeys } from "./constants";
import CharactersProfile from "./components/CharactersProfile/CharactersProfile";


export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getFromLocalStorage(localStorageKeys.user);
    if (!!user) {
      setUser(user);
    }
  }, []);

  return (
    <UserContext.Provider value={{ setUser, user }}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Navigate replace to={user ? "/charactersList/" : "/signIn"} />
            }
          />
          <Route path="/charactersList/" element={<CharactersList />} />
          <Route path="/charactersList/:param" element={<CharactersList />} />
          <Route
            path="/charactersProfile/:id/"
            element={<CharactersProfile />}
          />
          <Route path="*" component={SignInScreen} />
          {user && (
            <Route
              path="/signIn"
              element={<Navigate replace to="/charactersList/" />}
            />
          )}
          {!user && <Route path="/signIn" element={<SignInScreen />} />}
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
