// src/app/crear-cliente/page.js
"use client";

import { useState } from 'react';

const CrearCliente = () => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [genero, setGenero] = useState('');
    const [fechaNac, setFechaNac] = useState('');
    const [estado, setEstado] = useState('');
    const [direccion, setDireccion] = useState('');
    const [contactable, setContactable] = useState(false);
    const [infoFinanciera, setInfoFinanciera] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Paso 1: Insertar cliente
        const clienteResponse = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombres, apellidos, genero, fechaNac, estado }),
        });

        if (clienteResponse.ok) {
            const clienteData = await clienteResponse.json(); // Obtén el ID del nuevo cliente
            
            // Paso 2: Insertar info asociada
            const infoResponse = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    direccion,
                    contactable,
                    infoFinanciera,
                    idCliente: clienteData.id // Asegúrate de que esto coincida con la respuesta
                }),
            });

            if (infoResponse.ok) {
                alert('Cliente y su información creados con éxito');
                // Reiniciar campos
                setNombres('');
                setApellidos('');
                setGenero('');
                setFechaNac('');
                setEstado('');
                setDireccion('');
                setContactable(false);
                setInfoFinanciera('');
            } else {
                alert('Error al crear la información del cliente');
            }
        } else {
            alert('Error al crear el cliente');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Crear Cliente</h1>
            <form onSubmit={handleSubmit}>
                {/* Campos del cliente */}
                <div className="mb-3">
                    <label className="form-label">Nombres:</label>
                    <input type="text" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Apellidos:</label>
                    <input type="text" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Género:</label>
                    <input type="text" className="form-control" value={genero} onChange={(e) => setGenero(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha de Nacimiento:</label>
                    <input type="text" className="form-control" value={fechaNac} onChange={(e) => setFechaNac(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Estado:</label>
                    <input type="text" className="form-control" value={estado} onChange={(e) => setEstado(e.target.value)} />
                </div>
                
                {/* Campos de información adicional */}
                <div className="mb-3">
                    <label className="form-label">Dirección:</label>
                    <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contactable:</label>
                    <input type="checkbox" checked={contactable} onChange={(e) => setContactable(e.target.checked)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Información Financiera:</label>
                    <input type="text" className="form-control" value={infoFinanciera} onChange={(e) => setInfoFinanciera(e.target.value)} />
                </div>
                
                <button type="submit" className="btn btn-primary">Crear Cliente</button>
            </form>
        </div>
    );
};

export default CrearCliente;
