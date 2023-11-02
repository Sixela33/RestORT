CREATE TABLE IF NOT EXISTS usuarios (
    userID SERIAL PRIMARY KEY,
    documento VARCHAR(11) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    contrasena VARCHAR(50) NOT NULL,
    esAdmin BOOLEAN DEFAULT false,
    esSuperUser BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS insumos (
    insumoID SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    cantidad DECIMAL NOT NULL,
    costoXunidad DECIMAL,
    unidadDeMedida VARCHAR(50) NOT NULL,
    CHECK (unidadDeMedida IN ('KG', 'UNIDADES'))
);

CREATE TABLE IF NOT EXISTS platillos (
    platilloID SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    valor DECIMAL NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredientes (
    fk_platilloID INT REFERENCES platillos(platilloID),
    fk_insumoID INT REFERENCES insumos(insumoID),
    cantidad DECIMAL NOT NULL
);
