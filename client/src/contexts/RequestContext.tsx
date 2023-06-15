import { ReactNode, createContext, useContext, useState, useEffect, SetStateAction } from "react"
import { AuthContext } from '../contexts/AuthContext'

interface RequestContextType {
  requests: Swap | null;
  setRequests: React.Dispatch<React.SetStateAction<Swap | null>>;
}

const initialRequest: RequestContextType = {
  requests: null,
  setRequests: function (value: SetStateAction<Swap | null>): void {
    throw new Error("Function not implemented.");
  }
};

export const RequestContext = createContext<RequestContextType>(initialRequest);


export const RequestContextProvider = ({ children }: { children: ReactNode }) => {

  const { user } = useContext(AuthContext);

  const [requests, setRequests] = useState<Swap | null>(null);

  useEffect(() => {

    if (user) {
      const userId = user._id;

      const requestOptions = {
        method: 'GET',
      };

      const showRequests = async () => {

        try {
          const response = await fetch(`http://localhost:5001/api/swaps/requests/${userId}`, requestOptions)

          const result = await response.json();
          console.log(result)
          setRequests(result);
        }
        catch (error) {
          console.log('error', error);
        }
      };

      showRequests();
    }
  }, [user]);

  return (
    <RequestContext.Provider value={{ requests, setRequests }}>
      {children}
    </RequestContext.Provider>
  )


}
