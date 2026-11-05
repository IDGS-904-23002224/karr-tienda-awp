import { createContext, useReducer, useEffect } from 'react';

// 1. Definir el Contexto
export const AuthContext = createContext();

// 2. Definir el Reducer
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

// 3. Crear el Provider
export const AuthProvider = ({ children }) => {
    // Inicializar estado leyendo de localStorage
    const initialState = {
        isAuthenticated: JSON.parse(localStorage.getItem('isAuth')) || false,
        user: JSON.parse(localStorage.getItem('user')) || null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Efecto para sincronizar el estado con localStorage
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