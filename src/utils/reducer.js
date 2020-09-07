
// Handler of userReducer which manages user data and updates the state
export const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        sessionStorage.setItem('isLoggedIn', true);
        sessionStorage.setItem("user", JSON.stringify(action.fullName));
        return {
          ...state,
          isLoggedIn: true,
          user: action.fullName,
        };
  
      case "LOGOUT":
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('prevUrl');
        return {  
          ...state,
          isLoggedIn: false,
          user: null
        };

      default:
        return state;
    }
  };