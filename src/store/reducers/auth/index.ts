import { AuthState } from "../../../types/models/auth";

const initState = {
  user: {
    phone_number: "",
    pin: "",

    full_name: "",
    email: "",
    company_name: "",
    company_address: "",
    company_year: 0,
    country: "",
    city: "",
    account_type: 0,
    interesting: "",
  },
  stage: 0,
  mobilemenu_toggle:0,
};
  
  const ReduxState = (state:AuthState = initState, action: any) => {
    switch (action.type) {
      case "SET_USER":
        return { ...state, user: action.payload };
      case "SET_STAGE":
        return { ...state, stage: action.payload };
      case "SET_MOBILEMENU_TOGGLE":
        return { ...state, mobilemenu_toggle: action.payload };
      default:
        return { ...state };
    }
  };
  
  export default ReduxState;
  