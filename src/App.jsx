import { useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.jsx'
import './App.css'

function Header({ titulo, subtitulo }) {
    return (
        <header className="text-center mb-5 border-bottom pb-3">
            <h1 className="text-success fw-bold">{titulo}</h1>
            <p className="text-muted">{subtitulo}</p>
        </header>
    );
}

function FotoCard({ foto }) {
    return (
        <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 border-0">
                <img src={foto.url} className="card-img-top" alt={foto.title} />
                <div className="card-body">
                    <p className="card-text text-capitalize small text-center fw-medium">
                        {foto.title}
                    </p>
                </div>
            </div>
        </div>
    );
}

function Catalogo({ fotos }) {
    return (
        <div className="row">
            {fotos.map(foto => (
                <FotoCard key={foto.id} foto={foto} />
            ))}
        </div>
    );
}

function App({ cargando, fotos }) {
    return (
        <div className="container py-5">
            <Header titulo="Axelrrotes" subtitulo="Catalogo Axelrrotes Oficial - AWP" />
            
            {}
            {cargando ? (
                <div className="text-center mt-5">
                    <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                    <h4 className="mt-3 text-secondary">Cargando fotos en 3 segundos...</h4>
                </div>
            ) : (
                <Catalogo fotos={fotos} />
            )}
        </div>
    );
}

export default App
