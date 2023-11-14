class Usuario {
    constructor(){
        this.userID
        this.documento
        this.nombre
        this.contrasena
        this.esAdmin
        this.esSuperUser
    }
}

class Insumo {
    constructor () {
        this.insumoID
        this.nombre
        this.cantidad
        this.costoXunidadhis.unidadDeMedida
    }
}

class Platillo {
    constructor () {
        this.platilloID
        this.nombre
        this.valor 
    }
}

class ReturnType {
    constructor(){
        this.exito
        this.mensaje
        this.status
    }
}

export default {
    ReturnType,
    Usuario,
    Insumo,
    Platillo,
};