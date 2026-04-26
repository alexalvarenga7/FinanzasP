--base de datos
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    tipo VARCHAR(10) CHECK (tipo IN ('ingreso', 'gasto')),
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE transacciones (
    id SERIAL PRIMARY KEY,
    monto DECIMAL(12, 2) NOT NULL,
    descripcion VARCHAR(255),
    tipo VARCHAR(10) CHECK (tipo IN ('ingreso', 'gasto')),
    fecha DATE DEFAULT CURRENT_DATE,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE presupuestos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    categoria_id INTEGER REFERENCES categorias(id) ON DELETE CASCADE,
    monto_limite DECIMAL(12, 2) NOT NULL,
    mes INTEGER CHECK (mes BETWEEN 1 AND 12),
    anio INTEGER NOT NULL
);