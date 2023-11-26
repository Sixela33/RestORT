import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../Context/APIContext';
import FormuEditarInsumo from './FormuEditarInsumo'; 

const EditarIngredienteContainer = () => {
  const { iid } = useParams();
  const { fetchData } = useApi();

  const [insumoAEditar, setInsumoAEditar] = useState({});

  useEffect(() => {
    const obtenerInsumo = async () => {
      try {
        const data = await fetchData(`/api/insumos/${iid}`);
        setInsumoAEditar(data[0]);
      } catch (error) {
        console.error("Error al cargar ingrediente", error);
      }
    };

    obtenerInsumo();
  }, []);

  return ( 
    <FormuEditarInsumo insumo={insumoAEditar} />
  );
};

export default EditarIngredienteContainer;

