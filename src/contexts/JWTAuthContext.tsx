import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import type { FC, ReactNode } from "react";
import jwtDecode from "jwt-decode";
import jwtEncode from "jwt-encode";
import type { User } from "../types/models/user";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SplashPage } from "../views/splash";
import { useSelector } from "react-redux";
import { StoreState } from "../types/models/store";

interface AuthState {
  isInitialised: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthContextValue extends AuthState {
  method: "JWT";
  login: (phone_number: string, pin: string) => void;
  logout: () => void;
  register: () => void;// Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type InitialiseAction = {
  type: "INITIALISE";
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type LoginAction = {
  type: "LOGIN";
  payload: {
    user: User;
  };
};

type LogoutAction = {
  type: "LOGOUT";
};

type RegisterAction = {
  type: "REGISTER";
  payload: {
    user: User;
  };
};

type Action = InitialiseAction | LoginAction | LogoutAction | RegisterAction;

const initialAuthState: AuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (accessToken: string): boolean => {
  if (!accessToken) {
    return false;
  }

  const decoded: any = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken: string | null): void => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "INITIALISE": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext<AuthContextValue>({
  ...initialAuthState,
  method: "JWT",
  login: () => {
    return false;
  },
  logout: () => {
    return false;
  },
  register: () => {
    return false;
  }//Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  //const setRedux = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state:StoreState) => state.auth);
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const login = async (_phone_number: string, _pin: string) => {
    try {
      const response = await axios.post<{
        code: number;
        msg: string;
        user: User;
      }>("/api/users/login", { phone_number: _phone_number, pin: _pin });
      const { code, msg, user } = response.data;

      console.log(['login action',code, msg, user]);
      if (code === 0 && msg === "success") {
        const token = jwtEncode(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: user,
          },
          "key"
        );
        setSession(token);
        dispatch({
          type: "LOGIN",
          payload: {
            user,
          },
        });
        return true;
      } else {
        setTimeout(() => {
          toast(msg);
        }, 500);
      }
      return false;
    } catch (err) {
      console.log(['login action err= ',err]);
      /**test */
      let user={
        phone_number:_phone_number,
        pin:_pin,

        full_name: "",
        email: "",
        company_name: "",
        company_address: "",
        company_year: 0,
        country: "",
        city: "",
        account_type: 0,
        interesting: "",
      };
      const token = jwtEncode(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: user,
        },
        "key"
      );
      setSession(token);
      dispatch({
        type: "LOGIN",
        payload: {
            user
        },
      });
      return true;
      //
      return false;
    }
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
    navigate('/');
  };

  const register = async () => {
    try {
      const response = await axios.post<{
        code: number;
        msg: string;
        user: User;
        avatar: string;
      }>("/api/users/register", user);
      const { code, msg, avatar } = response.data;
      if (code === 0 && msg === "success") {
        user.avatar = avatar;
        const token = jwtEncode(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: response.data.user,
          },
          "key"
        );
        setSession(token);
        dispatch({
          type: "LOGIN",
          payload: {
            user,
          },
        });
        navigate('/');
      } else {
        setTimeout(() => {
          toast(msg);
        }, 500);
      }
      return true;
    } catch (err) {
      console.log(err);
      /**test */
      const token = jwtEncode(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: user,
        },
        "key"
      );
      setSession(token);
      dispatch({
        type: "LOGIN",
        payload: {
            user
        },
      });
      return true;
      //
      return false;
    }
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          //const response = await axios.post<{ user: User }>("/api/auth/me");
          //const { user } = response.data;
          const decoded: any = jwtDecode(accessToken);
          const user = decoded.data;
          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: "INITIALISE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialise();
  }, []);

  if (!state.isInitialised) {
    return <SplashPage />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
