import React from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'

async function obtenerFotos() {
    try {
        let respuesta = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=6');
        let datos = await respuesta.json();
        return datos;

    } catch (error) {
        console.error("Error al cargar API JSONPLACEHOLDER:", error);
        return [];
    }
}

const root = createRoot(document.getElementById('root'));

async function arrancarApp() {
    root.render(<App cargando={true} fotos={[]} />);

    let fotosAPI = await obtenerFotos();

    setTimeout(() => {
        root.render(<App cargando={false} fotos={fotosAPI} />);
    }, 3000);
}

arrancarApp();