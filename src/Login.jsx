import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación del formulario
        if (!email.includes('@') || password.length < 6) {
            setError('Correo inválido o contraseña menor a 6 caracteres.');
            return;
        }

        // Simulación de Login exitoso
        setError('');
        dispatch({ type: 'LOGIN', payload: { email } });
        navigate('/dashboard');
    };

    return (
        <div>
            <h2>Acceso a la Aplicación</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Ingresar</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
