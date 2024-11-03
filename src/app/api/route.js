// src/app/api/clientes/route.js
import connection from '../../lib/db';

export async function GET() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM CLIENTE', (err, results) => {
            if (err) {
                return reject(new Response('Database query error', { status: 500 }));
            }
            return resolve(new Response(JSON.stringify(results), { status: 200 }));
        });
    });
}

export async function POST(request) {
    const { nombres = 'Jorge', apellidos = 'Ubico', genero, fechaNac, estado, usuarioCreador } = await request.json();

    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO CLIENTE (NOMBRES, APELLIDOS, GENERO, FECHA_NAC, ESTADO, USUARIO_CREADOR) VALUES (?, ?, ?, ?, ?, ?)',
            [nombres, apellidos, genero, fechaNac, estado, usuarioCreador || 'Jorge Ubico'],
            (err, results) => {
                if (err) {
                    return reject(new Response('Error inserting into database', { status: 500 }));
                }
                return resolve(new Response(JSON.stringify({ message: 'Cliente creado', id: results.insertId }), { status: 201 }));
            }
        );
    });
}
