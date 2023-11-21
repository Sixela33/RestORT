--------------------------------------------------------------------------------------------------

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

--------------------------------------------------------------------------------------------------

CREATE OR REPLACE PROCEDURE AgregarIngredientesAlMenu(
    nombre_platillo VARCHAR,
    valor_platillo DECIMAL,
    pk_ingredientes INT[],
    cantidad DECIMAL[]
)
AS
$$
DECLARE
    i INT;
    id_platillo INT;
BEGIN
    -- Insertar el platillo
    INSERT INTO platillos (nombre, valor) 
    VALUES (nombre_platillo, valor_platillo)
    RETURNING platilloID INTO id_platillo;

    -- Verificar si el platillo existe
    IF id_platillo IS NULL THEN
        RAISE EXCEPTION 'Error al insertar el platillo';
    END IF;

    -- Verificar que los arrays tengan la misma longitud
    IF array_length(pk_ingredientes, 1) <> array_length(cantidad, 1) THEN
        RAISE EXCEPTION 'Los arrays de ingredientes y cantidades deben tener la misma longitud';
    END IF;

    -- Recorrer los arrays e insertar los ingredientes en la tabla materiaPrimaXitemMenu
    FOR i IN 1..array_length(pk_ingredientes, 1) LOOP
        -- Verificar si el insumo existe
        IF NOT EXISTS (SELECT 1 FROM insumos WHERE insumoID = pk_ingredientes[i]) THEN
            RAISE EXCEPTION 'El insumo con ID % no existe', pk_ingredientes[i];
        END IF;

        -- Insertar el ingrediente en la tabla materiaPrimaXitemMenu
        INSERT INTO materiaPrimaXitemMenu (fk_platilloID, fk_insumoID, cantidad)
        VALUES (id_platillo, pk_ingredientes[i], cantidad[i]);
    END LOOP;
END;
$$ LANGUAGE plpgsql;