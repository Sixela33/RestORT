CREATE TABLE IF NOT EXISTS usuarios (
    userID SERIAL PRIMARY KEY,
    documento VARCHAR(11) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    esAdmin BOOLEAN NOT NULL DEFAULT false,
    esSuperUser BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS insumos (
    insumoID SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    cantidad DECIMAL NOT NULL,
    costoXunidad DECIMAL,
    unidadDeMedida VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS platillos (
    platilloID SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    valor DECIMAL NOT NULL
);

CREATE TABLE IF NOT EXISTS materiaPrimaXitemMenu (
    fk_platilloID INT REFERENCES platillos(platilloID),
    fk_insumoID INT REFERENCES insumos(insumoID),
    cantidad DECIMAL NOT NULL
);

CREATE TABLE IF NOT EXISTS tickets (
    ticketID SERIAL PRIMARY KEY,
    fechaEmision DATE
);

CREATE TABLE IF NOT EXISTS DetallesTicket (
    id_detalle SERIAL PRIMARY KEY,
    id_ticket INT REFERENCES tickets(ticketID),
    id_platillo INT REFERENCES platillos(platilloID),
    cantidad INT NOT NULL
);


--------------------------------------------------------------------------------------------------
