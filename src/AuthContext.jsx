import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isAuthenticated: true, user: action.payload };
        case 'LOGOUT':
            return { ...state, isAuthenticated: false, user: null };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const initialState = {
        isAuthenticated: JSON.parse(localStorage.getItem('isAuth')) || false,
        user: JSON.parse(localStorage.getItem('user')) || null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        localStorage.setItem('isAuth', JSON.stringify(state.isAuthenticated));
        localStorage.setItem('user', JSON.stringify(state.user));
    }, [state.isAuthenticated, state.user]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};