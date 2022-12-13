import { AuthState } from "../../../types/models/auth";

const initState = {
  page: "",
  keyword: "",
  mobilemenu_toggle:0,
};
  
  const ReduxState = (state:AuthState = initState, action: any) => {
    switch (action.type) {
      case "SET_PAGE":
        return { ...state, page: action.payload };
      case "SET_MOBILEMENU_TOGGLE":
        return { ...state, mobilemenu_toggle: action.payload };
      case "SET_KEYWORD":
        return { ...state, keyword: action.payload };
      default:
        return { ...state };
    }
  };
  
  export default ReduxState;
  