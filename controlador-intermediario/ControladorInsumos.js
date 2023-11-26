import ServicioInsumos from "../servicio-logica/ServicioInsumo.js";

class ControladorInsumos {
  constructor() {
    this.servicio = new ServicioInsumos();
  }

  crearInsumo = async (req, res) => {
    try {
      await this.servicio.crearInsumo(req.body);
      return res.status(201);
    } catch (error) {
      console.log(error);
      return res.status(error.status).send(error.message);
    }
  };

  traerInsumos = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await this.servicio.traerInsumos(id);
      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(error.status).send(error.message);
    }
  };

  editarInsumo = async (req, res) => {
    const { id } = req.params; // id que se pasa por parametro :id
    const insumo = req.body;
    try {
     await this.servicio.editarInsumo(id, insumo);
     return res.status(200).json({ message: 'Insumo editado correctamente' });
    } catch (error) {
      console.log(error);
      return res.status(error.status).send(error.message);
    }
  };

  agregarStock = async (req, res) => {
    try {
      await this.servicio.agregarStock(req.body);
    } catch (error) {
      return res.status(error.status).send(error.message);
    }
  };

  eliminarInsumo = async (req, res) => {
    const { id } = req.params;
    try {
      await this.servicio.eliminarInsumo(id);
      return res.status(200).json({ message: 'Insumo eliminado correctamente' });
    } catch (error) {
      console.log(error);
      return res.status(error.status).send(error.message);
    }
  };
}

export default ControladorInsumos;
