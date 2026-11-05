// FormUsuarios.js
import { useState, useEffect } from "react";

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export function FormUsuarios() {
    const [libros, setLibros] = useState([]);
    const [form, setForm] = useState({ albumId: null, title: '', url: ''});
    const [errores, setErrores] = useState({}); // Para los errores
    const [cargando, setCargando] = useState(false); // Para saber si se está cargando

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setULibros(data.slice(0, 2))) // Slice() => Para traerme solamente 2 registros
            .catch(err => console.log('Error al cargar los libros: ', err))
    }, []); // [] => Para que se ejecute solamente una vez.

    // Para la validación del formulario
    const validarFomulario = () => {
        let nuevosErrores = {}; // Para administrar todos mis errores

        // Validación del nombre: trim() => Quita espacios del inicio al final.
        if (!form.title.trim()) {
            nuevosErrores.title = "El nombre del libro es obligatorio";
        }

        if (!form.url.trim()) {
            nuevosErrores.url = "La url de la imagen es obligatorio";
        }

        setErrores(nuevosErrores); // Se actualiza el estado de los errores

        return Object.keys(nuevosErrores).length === 0; // Si es true, significa que el formulario es válido 
    };

    // target nos trae los valores de las caja de texto y con el evento
    // lo hace cada vez que hay un cambio en el formulario
    const handleChange = (e) => {
        const { title, value } = e.target

        setForm({ ...form, [title]: value }); // Mantenemos los valores anteriores

        if (errores[name]) {
            setErrores({ ...errores, [title]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se actualice

        if (!validarFomulario()) return; // Si no es válido, no continúa

        setCargando(true); // Se activa el estado de carga

        const esEdicion = form.albumId !== null; // Si es true, significa que es una edición

        // Si es edición, se usa PUT, si no, se usa POST
        const metodo = esEdicion ? 'PUT' : 'POST';
        const urlFinal = esEdicion ? `${API_URL}/${form.albumId}` : API_URL;

        try {
            const response = await fetch(urlFinal, {
                method: metodo,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: form.title, url: form.url })
            });

            if (!response.ok) throw new Error('Error en la operación del servidor');

            const dataServidor = await response.json();

            if (esEdicion) {
                setLibros(libros.map(l => (l.albumId === form.albumId ? { ...l, ...dataServidor } : l))); // Actualiza el usuario editado
                alert("Libro actualizado exitosamente");
            } else {
                const nuevoLibro = { ...dataServidor, id: Date.now() }; // Genera un número único para el id
                setLibros([...libros, nuevoLibro]); // Agrega el nuevo usuario al final del arreglo
                alert("Libro creado exitosamente");
            }

            // setForm({ id: null, name: '', email: '' });
        } catch (err) {
            console.log('Error: ', err)
            alert('Hubó un error al procesar la solicitud');
        } finally {
            setCargando(false); // Se desactiva el estado de carga.
        }
    }

    const seleccionarParaEditar = (libro) => {
        setForm({ albumId: libro.albumId, title: libro.title, url: libro.url});
        setErrores({}); // Se limpia los errores al editar
    }

    return (
        <div className="container mt-5" style={{ maxWidth: '750px' }}>
            <h2 className="mb-4 text-center text-primary fw-bold">Gestión de Usuarios</h2>

            {
                <div className="card shadow-sm mb-5 border-0 bg-light">
                    <div className="card-body p-4">
                        <h4 className="card-title mb-3 text-secondary">
                            {form.id != null ? 'Modificar usuario' : 'Crear nuevo usuario'}
                        </h4>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label fw-bold">Nombre:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={`form-control ${errores.name ? 'is-invalid' : ''}`}
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Ej. Juan Pérez"
                                />
                                {/* Clases nativas de Bootstrap para manejo de errores en formularios */}
                                <div className="invalid-feedback">{errores.name}</div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-bold">Correo Electrónico:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Ej. usuario@domain.com"
                                />
                                <div className="invalid-feedback">{errores.email}</div>
                            </div>

                            <div className="d-flex gap-2">
                                <button type="submit" disabled={cargando} className="btn btn-primary">
                                    {cargando ? 'Procesando...' : form.id != null ? 'Actualizar datos' : 'Guardar registro'}
                                </button>

                                {form.id != null && (
                                    <button type="button" disabled={cargando} className="btn btn-outline-secondary" onClick={() => setForm({ id: null, name: '', email: '' })}>
                                        Cancelar edición
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            }

            <h3 className="mb-3 text-secondary">Listado de Registros</h3>
            <ul className="list-group shadow-sm">
                {usuarios.map((usuario) => (
                    <li key={usuario.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                        <div>
                            <h5 className="mb-1 text-dark fw-bold">{usuario.name}</h5>
                            <span className="text-muted small">{usuario.email}</span>
                        </div>

                        <div className="btn-group" role="group">
                            <button onClick={() => seleccionarParaEditar(usuario)} className="btn btn-outline-warning btn-sm">
                                Editar
                            </button>

                            <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => eliminarUsuario(usuario.id)} >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}