import { useState, useEffect } from 'react';
import { useCount } from './useCount'; // Custom hook

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const { count, increment } = useCount(0);

    // useEffect y READ (Leer de API)
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    // CREATE
    const handleCreate = () => {
        const newPost = { title: 'Nuevo Post', body: 'Contenido del post' };
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: { 'Content-type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => setPosts([...posts, data]));
    };

    // DELETE
    const handleDelete = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        }).then(() => setPosts(posts.filter(post => post.id !== id)));
    };

    return (
        <div>
            <h2>Panel CRUD</h2>
            <p>Acciones realizadas: {count}</p>
            <button onClick={() => { handleCreate(); increment(); }}>Crear Post</button>

            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        {post.title}
                        <button onClick={() => { handleDelete(post.id); increment(); }}>Eliminar</button>
                    </li>
                ))}
            </ul>
            {/* Integración del WebComponent */}
            <mi-footer texto="Derechos Reservados AWP 2026"></mi-footer>
        </div>
    );
}
