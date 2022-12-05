import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import type { FC, ReactNode } from "react";
import jwtDecode from "jwt-decode";
import type { User } from "../types/models/user";
import axios from "../utils/axios";
import "react-toastify/dist/ReactToastify.css";
import { SplashPage } from "../views/splash";
import { loginAction, registerAction, getUserInfo } from "../actions/user";
import { STATUS_CODE } from "../constants";
import { useSelector } from "react-redux";
import { StoreState } from "../types/models/store";

interface AuthState {
  isInitialised: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthContextValue extends AuthState {
  method: "JWT";
  login: (formData: any) => Promise<any>;
  logout: () => void;
  register: (formData: any) => Promise<any>;
  dispatchUser: (user: User) => void;
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
  return decoded.expires > currentTime;
};

const setSession = (accessToken: string | null): void => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("userinfo");
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
  login: () => Promise.resolve(-1),
  logout: () => {
    return false;
  },
  register: () => Promise.resolve(false),
  dispatchUser: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const login = async (formData: any) => {
    return await loginAction(formData)
    .then(async (data) => {
      if(data.result.code == STATUS_CODE.AUTH.SUCCESS_LOGIN){
        setSession(data.result.token);
      }
      await getUserInfo()
        .then((data) => {
          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: true,
              user: data.result,
            },
          });
        });
      return data.result;
    })
    .catch((err) => {
      console.error(err);
      return {code: STATUS_CODE.UNKNOWN_FAILURE, message: "Somgthing wrong!"};
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
    window.location.href='/login';
  };

  const dispatchUser = (user: User) => {
    dispatch({
      type: "INITIALISE",
      payload: {
        isAuthenticated: true,
        user: user,
      },
    });
  };

  const register = async (formData: any) => {
    return await registerAction(formData)
    .then(async (data) => {
      if(data.result.code == STATUS_CODE.AUTH.SUCCESS_LOGIN){
        setSession(data.result.token);
      }
      await getUserInfo()
        .then((data) => {
          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: true,
              user: data.result,
            },
          });
        });
      return data.result;
    })
    .catch((err) => {
      console.error(err);
      return {code: STATUS_CODE.UNKNOWN_FAILURE, message: "Somgthing wrong!"};
    });
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          //const userinfo = window.localStorage.getItem("userinfo");
          //if(userinfo == undefined || userinfo == null){
            await getUserInfo()
            .then((data) => {
              const accept = window.localStorage.getItem("acceptCookie");
              if(accept){
                window.localStorage.setItem("userinfo", JSON.stringify(data.result));
              }
              dispatch({
                type: "INITIALISE",
                payload: {
                  isAuthenticated: true,
                  user: data.result,
                },
              });
            });
          // } else {
          //   dispatch({
          //     type: "INITIALISE",
          //     payload: {
          //       isAuthenticated: true,
          //       user: JSON.parse(userinfo),
          //     },
          //   });
          // }
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
        dispatchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
