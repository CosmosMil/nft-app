import { ReactNode, createContext, useState, useEffect } from "react"
import { serverURL } from "../utilities/serverURL";



interface AuthContextType {
  user: User | null,
  error: Error | null,
  login(email: string, password: string): void,
  logout(): void
}

const initialAuth: AuthContextType = {
  user: null,
  error: null,
  login: () => {
    throw new Error('login not implemented.');
  },
  logout: () => {
    throw new Error('logout not implemented.')
  }
};

export const AuthContext = createContext<AuthContextType>(initialAuth);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const login = async (email: string, password: string) => {
    // console.log({ email: email, password: password })
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
    };
    try {
      const response = await fetch(`${serverURL}/api/user/login`, requestOptions);

      if (response.ok) {
        const result = await response.json() as fetchResult
        if (result.user) {
          setUser(result.user);
          localStorage.setItem("token", result.token);
        }
        // console.log(result);
      } else {
        const result = await response.json() as fetchFailed
        alert(result.error)
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong - check console for error")
    }

  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  }

  const checkForToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("There is a token")
      fetchActiveUser(token);
    } else {
      console.log("There is no token")
      setUser(null)
    }
  }

  const fetchActiveUser = async (token: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    try {
      const response = await fetch(`${serverURL}/api/user/active`, requestOptions)
      const result = await response.json();
      // console.log("active user result:", result);
      setUser(result);
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    checkForToken();
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  )
}