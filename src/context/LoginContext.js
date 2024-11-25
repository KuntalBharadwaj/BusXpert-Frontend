import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const LoginContext = createContext();

export { LoginContext };

function LoginProvider(props) {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isSellerLogin, setIsSellerLogin] = useState(false);

  const [user, setUser] = useState(null);

  const checkIslogin = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user`,
        { withCredentials: true}
      );

      if (response.data.success) {
        setUser(response.data.user);

        if (response.data.user.role === "user") setIsUserLogin(true);
        if (response.data.user.role === "busAdmin") setIsSellerLogin(true);
        if (response.data.user.role === "Admin") setIsAdminLogin(true);
      }

    } catch (error) {
      console.log("error in checkLogin");
      console.log(error.message);
    }
  };

  useEffect(() => {
    // checkIslogin();
  }, []);

  return (
    <LoginContext.Provider
      value={{
        isUserLogin,
        setIsUserLogin,
        isAdminLogin,
        setIsAdminLogin,
        isSellerLogin,
        setIsSellerLogin,
        user,
        setUser,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
