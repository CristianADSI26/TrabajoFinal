import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Inspeccion } from '../models/inspeccion';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionService } from './configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class GestionInspeccionService {
  formularioRegistroInspeccion = this.formBuilder.group({
    IdInspeccion: [0],
    Nombre: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    Apellido: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    DocumentoIdentificacion: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Telefono: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Direccion: ["", [Validators.required, Validators.maxLength(20)]],
    Municipio: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    Producto: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    PlantaElectrica: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    TipoVehiculo: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    CondicionesTerreno: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    ConexionesElectricas: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    TecnicoRequerido: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    HerramientasEquipos: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    Largo: ["", [Validators.required, Validators.maxLength(10), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Ancho: ["", [Validators.required, Validators.maxLength(10), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Fondo: ["", [Validators.required, Validators.maxLength(10), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Diametro: ["", [Validators.required, Validators.maxLength(10), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Capacidad: ["", [Validators.required, Validators.maxLength(10), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Material: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    Cantidad: ["", [Validators.required, Validators.maxLength(10), Validators.pattern(this.configuracion.exRegularNumeros)]],
    TecnicoRealizaInspeccion: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    PersonaAcompanaInspeccion: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    Observaciones: ["", [Validators.required]]
  })


  inspeccion: Inspeccion;
  listaInspeccion: Inspeccion[];
  filtroInspeccion: "";
  
  get Nombre() {
    return this.formularioRegistroInspeccion.controls["Nombre"];
}
get Apellido() {
    return this.formularioRegistroInspeccion.controls["Apellido"];
}
get DocumentoIdentificacion() {
    return this.formularioRegistroInspeccion.controls["DocumentoIdentificacion"];
}
get Telefono() {
    return this.formularioRegistroInspeccion.controls["Telefono"];
}
get Direccion() {
    return this.formularioRegistroInspeccion.controls["Direccion"];
}
get Municipio() {
    return this.formularioRegistroInspeccion.controls["Municipio"];
}
get Producto() {
    return this.formularioRegistroInspeccion.controls["Producto"];
}
get PlantaElectrica() {
    return this.formularioRegistroInspeccion.controls["PlantaElectrica"];
}get TipoVehiculo() {
    return this.formularioRegistroInspeccion.controls["TipoVehiculo"];
}
get CondicionesTerreno() {
    return this.formularioRegistroInspeccion.controls["CondicionesTerreno"];
}
get ConexionesElectricas() {
    return this.formularioRegistroInspeccion.controls["ConexionesElectricas"];
}
get TecnicoRequerido() {
    return this.formularioRegistroInspeccion.controls["TecnicoRequerido"];
}
get HerramientasEquipos() {
    return this.formularioRegistroInspeccion.controls["HerramientasEquipos"];
}
get Largo() {
    return this.formularioRegistroInspeccion.controls["Largo"];
}
get Ancho() {
    return this.formularioRegistroInspeccion.controls["Ancho"];
}
get Fondo() {
    return this.formularioRegistroInspeccion.controls["Fondo"];
}
get Diametro() {
    return this.formularioRegistroInspeccion.controls["Diametro"];
}
get Capacidad() {
    return this.formularioRegistroInspeccion.controls["Capacidad"];
}
get Material() {
    return this.formularioRegistroInspeccion.controls["Material"];
}
get Cantidad() {
    return this.formularioRegistroInspeccion.controls["Cantidad"];
}
get TecnicoRealizaInspeccion() {
    return this.formularioRegistroInspeccion.controls["TecnicoRealizaInspeccion"];
}
get PersonaAcompanaInspeccion() {
    return this.formularioRegistroInspeccion.controls["PersonaAcompanaInspeccion"];
}
get Observaciones() {
    return this.formularioRegistroInspeccion.controls["Observaciones"];
}


  constructor(private http: HttpClient, private configuracion: ConfiguracionService,private formBuilder: FormBuilder) { }

  guardarInspeccion() {
    if (this.inspeccion.IdInspeccion == null) {
      this.inspeccion.IdInspeccion = 0;
    }
    console.log(this.inspeccion);
    return this.http.post(this.configuracion.rootURL + '/Inspeccion', this.inspeccion)
  }

  refrescarListaInspeccion() {
    this.http.get(this.configuracion.rootURL + '/Inspeccion')
      .toPromise()
      .then(res => this.listaInspeccion = res as Inspeccion[])
  }

  editarInspeccion() {
    return this.http.put(this.configuracion.rootURL + '/Inspeccion/' + this.inspeccion.IdInspeccion, this.inspeccion)
  }

  eliminarInspeccion(id) {
    return this.http.delete(this.configuracion.rootURL + '/Inspeccion/' + id)
  }
}
