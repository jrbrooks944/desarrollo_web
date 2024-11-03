// src/app/clientes/page.js
"use client"; // Indica que este es un Client Component

import { useEffect, useState } from 'react';

const Clientes = () => { // Asegúrate de que esto sea una función de componente
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const fetchClientes = async () => {
            const response = await fetch('/api');
            const data = await response.json();
            setClientes(data);
            setLoading(false); // Cambiar estado de carga después de obtener los datos
        };

        fetchClientes();
    }, []);

    if (loading) {
        return <div>Cargando...</div>; // Mensaje mientras se cargan los datos
    }

    return (
        <div>
            <h1>Lista de Clientes</h1>
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente.ID}>
                        {cliente.NOMBRES} {cliente.APELLIDOS}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Clientes; // Asegúrate de que el componente se exporte correctamente


