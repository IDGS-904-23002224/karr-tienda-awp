import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useCount } from './useCount';

const fotografiasAbarrotes = [
    'https://cdn-icons-png.flaticon.com/512/3724/3724720.png',
    'https://cdn-icons-png.flaticon.com/512/2553/2553691.png',
    'https://cdn-icons-png.flaticon.com/512/3081/3081840.png',
    'https://cdn-icons-png.flaticon.com/512/869/869687.png'  
];

export default function Dashboard() {
    const [productos, setProductos] = useState([]);
    const [formData, setFormData] = useState({ title: '', body: '', imageIndex: 0 });
    const [editingId, setEditingId] = useState(null);

    const { count, increment } = useCount(0);
    const { dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=4')
            .then(res => res.json())
            .then(data => {
                const productosConImagen = data.map((item, index) => ({
                    ...item,
                    imagen: fotografiasAbarrotes[index % fotografiasAbarrotes.length]
                }));
                setProductos(productosConImagen);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // CREATE:
    const handleCreate = (e) => {
        e.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                const nuevoProducto = {
                    ...data,
                    id: Date.now(),
                    imagen: fotografiasAbarrotes[formData.imageIndex % fotografiasAbarrotes.length]
                };
                setProductos([...productos, nuevoProducto]);
                setFormData({ title: '', body: '', imageIndex: 0 });
                increment();
            });
    };

    // UPDATE: prepaModi
    const handleEdit = (producto) => {
        setEditingId(producto.id);
        setFormData({ title: producto.title, body: producto.body, imageIndex: 0 });
    };

    // UPDATE: guardar
    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`https://jsonplaceholder.typicode.com/posts/${editingId}`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: { 'Content-type': 'application/json' },
        })
            .then(res => res.json())
            .then(() => {
                const productosActualizados = productos.map(prod =>
                    prod.id === editingId ? { ...prod, title: formData.title, body: formData.body } : prod
                );
                setProductos(productosActualizados);
                setEditingId(null);
                setFormData({ title: '', body: '', imageIndex: 0 });
                increment();
            });
    };

    // DELETE:
    const handleDelete = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        }).then(() => {
            setProductos(productos.filter(prod => prod.id !== id));
            increment();
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Panel CRUD - Tienda de Abarrotes</h2>
            <button onClick={handleLogout} style={{ background: 'red', color: 'white', marginBottom: '15px' }}>
                Cerrar Sesión
            </button>
            <p>Acciones realizadas: {count}</p>

            {/* Formulario con campos para el CRUD */}
            <form onSubmit={editingId ? handleUpdate : handleCreate} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h3>{editingId ? 'Modificar Producto' : 'Agregar Producto'}</h3>
                <input
                    type="text"
                    name="title"
                    placeholder="Nombre del producto"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    style={{ display: 'block', margin: '5px 0' }}
                />
                <textarea
                    name="body"
                    placeholder="Descripción del producto"
                    value={formData.body}
                    onChange={handleChange}
                    required
                    style={{ display: 'block', margin: '5px 0', width: '200px' }}
                />
                {!editingId && (
                    <select name="imageIndex" value={formData.imageIndex} onChange={handleChange} style={{ display: 'block', margin: '5px 0' }}>
                        <option value={0}>Imagen Genérica</option>
                        <option value={1}>Verduras</option>
                        <option value={2}>Panadería</option>
                        <option value={3}>Lácteos</option>
                    </select>
                )}
                <button type="submit" style={{ background: 'blue', color: 'white', marginTop: '10px' }}>
                    {editingId ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
                {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', body: '', imageIndex: 0 }); }} style={{ marginLeft: '10px' }}>
                        Cancelar
                    </button>
                )}
            </form>

            {/* Listado de fotos*/}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {productos.map(producto => (
                    <div key={producto.id} style={{ border: '1px solid #ddd', padding: '10px', width: '200px', textAlign: 'center' }}>
                        <img src={producto.imagen} alt={producto.title} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        <h4>{producto.title}</h4>
                        <p>{producto.body}</p>
                        <button onClick={() => handleEdit(producto)} style={{ marginRight: '5px', background: 'orange' }}>Editar</button>
                        <button onClick={() => handleDelete(producto.id)} style={{ background: 'red', color: 'white' }}>Eliminar</button>
                    </div>
                ))}
            </div>

            <mi-footer texto="Derechos Reservados AWP 2026"></mi-footer>
        </div>
    );
}