import { ReactNode, createContext, useState, useEffect } from "react"

interface User {
  email?: string,
  username: string,
  avatar: string,
  NFTs: string[]
}

interface AuthContextType {
  user: boolean,
  error: Error | null,
  login(email: string, password: string): void,
  logout(): void
}

// export const AuthContext = createContext<AuthContextType | null>(null); // not recommended
// export const AuthContext = createContext<AuthContextType>({} as AuthContextType); // less recommended
// export const AuthContext = createContext<AuthContextType>(null!); // less recommended

const initialAuth: AuthContextType = {
  user: false,
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
  const [user, setUser] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async (email: string, password: string) => {
    console.log({ email: email, password: password })
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
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}user/login`, requestOptions);
      console.log("this", response);
      const result = await response.json();
      if (result.user) {
        setUser(true);
        localStorage.setItem("token", result.token);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      // setError(error); //I still have to figure out how to type the unknown fetch results
      alert("Something went wrong - check console for error")
    }

  }

  const logout = () => {
    setUser(false);
    localStorage.removeItem("token");
  }

  const checkForToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("There is a token")
      setUser(true)
    } else {
      console.log("There is no token")
      setUser(false)
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