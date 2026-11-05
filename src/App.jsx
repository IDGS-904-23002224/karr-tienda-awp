import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './AuthContext.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import './MiFooter.js';

import reactLogo from './assets/react.svg';
import appLogo from '/favicon.svg';
import PWABadge from './PWABadge.jsx';
import './App.css';

const PrivateRoute = ({ children }) => {
    const { state } = useContext(AuthContext);
    return state.isAuthenticated ? children : <Navigate to="/" />;
};

function Header({ titulo, subtitulo }) {
    return (
        <header className="text-center mb-5 border-bottom pb-3">
            <h1 className="text-success fw-bold">{titulo}</h1>
            <p className="text-muted">{subtitulo}</p>
        </header>
    );
}

const NotFound = () => <h2>404 - Página no encontrada</h2>;

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} /> {/* Ruta Not Found */}
                </Routes>
            </Router>
        </AuthProvider>
    );
}