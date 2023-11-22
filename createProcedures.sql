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
    INSERT INTO platillos (nombre, valor) 
    VALUES (nombre_platillo, valor_platillo)
    RETURNING platilloID INTO id_platillo;

    IF id_platillo IS NULL THEN
        RAISE EXCEPTION 'Error al insertar el platillo';
    END IF;

    IF array_length(pk_ingredientes, 1) <> array_length(cantidad, 1) THEN
        RAISE EXCEPTION 'Los arrays de ingredientes y cantidades deben tener la misma longitud';
    END IF;

    FOR i IN 1..array_length(pk_ingredientes, 1) LOOP
        IF NOT EXISTS (SELECT 1 FROM insumos WHERE insumoID = pk_ingredientes[i]) THEN
            RAISE EXCEPTION 'El insumo con ID % no existe', pk_ingredientes[i];
        END IF;

        INSERT INTO materiaPrimaXitemMenu (fk_platilloID, fk_insumoID, cantidad)
        VALUES (id_platillo, pk_ingredientes[i], cantidad[i]);
    END LOOP;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE crearTicket(
    id_platillo INT[],
    cantidad_platillo INT[]
) AS $$ DECLARE
    i INT;
    id_ticket INT;
BEGIN
    INSERT INTO tickets (fechaEmision) 
    VALUES (CURRENT_DATE)
    RETURNING ticketID INTO id_ticket;

    IF id_ticket IS NULL THEN
        RAISE EXCEPTION 'Error al crear el Ticket';
    END IF;

    FOR i IN 1..array_length(id_platillo, 1) LOOP
       
        IF NOT EXISTS (SELECT 1 FROM platillos WHERE platilloID = id_platillo[i]) THEN
            RAISE EXCEPTION 'El platillo con ID % no existe', id_platillo[i];
        END IF;

        INSERT INTO DetallesTicket (id_ticket, id_platillo, cantidad)
        VALUES (id_ticket, id_platillo[i], cantidad_platillo[i]);

        UPDATE insumos
        SET cantidad = cantidad - 
                      (SELECT cantidad * cantidad_platillo[i] 
                       FROM materiaPrimaXitemMenu 
                       WHERE fk_platilloID = id_platillo[i] AND fk_insumoID = insumos.insumoID)
        WHERE insumoID IN (SELECT fk_insumoID 
                           FROM materiaPrimaXitemMenu 
                           WHERE fk_platilloID = id_platillo[i]);
                           
    END LOOP; 

END;
$$ LANGUAGE plpgsql;

        