import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cotizacion } from '../models/cotizacion';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionService } from './configuracion.service';


@Injectable({
  providedIn: 'root'
})
export class GestionCotizacionService {
   formularioRegistroCotizacion = this.formBuilder.group({

    IdCotizacion: [0],

    NombreEmpresa: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    CC_NIT: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(11), Validators.pattern(this.configuracion.exRegularNumeros)]],
    NumeroTelefono: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(15), Validators.pattern(this.configuracion.exRegularNumeros)]],
    ValorProducto: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern(this.configuracion.exRegularNumeros)]],
    NombreProducto: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    Departameto: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    Municipio: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    Direccion: ["", [Validators.required, Validators.maxLength(60)]],
    NombreAsesor: ["", [Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    CorreoAsesor: ["", [Validators.required, Validators.maxLength(40), Validators.pattern(this.configuracion.exRegularCorreo)]],
    Comentarios: [""],
  });

  

 
  
  cotizacion: Cotizacion;
  listaCotizacion: Cotizacion[];
  filtroCotizacion:"";

  get NombreEmpresa() {
    return this.formularioRegistroCotizacion.controls["NombreEmpresa"];
  }
  get CC_NIT() {
    return this.formularioRegistroCotizacion.controls["CC_NIT"];
  }
  get NumeroTelefono() {
    return this.formularioRegistroCotizacion.controls["NumeroTelefono"];
  }
  get ValorProducto() {
    return this.formularioRegistroCotizacion.controls["ValorProducto"];
  }
  get NombreProducto() {
    return this.formularioRegistroCotizacion.controls["NombreProducto"];
  }
  get Departameto() {
    return this.formularioRegistroCotizacion.controls["Departameto"];
  }
  get Municipio() {
    return this.formularioRegistroCotizacion.controls["Municipio"];
  }
  get Direccion() {
    return this.formularioRegistroCotizacion.controls["Direccion"];
  }
  get NombreAsesor() {
    return this.formularioRegistroCotizacion.controls["NombreAsesor"];
  }
  get CorreoAsesor() {
    return this.formularioRegistroCotizacion.controls["CorreoAsesor"];
  }

  constructor(private http: HttpClient,private configuracion:ConfiguracionService,private formBuilder: FormBuilder) { }


  guardarCotizacion() {
    if (this.cotizacion.IdCotizacion==null) {
      this.cotizacion.IdCotizacion=0;
    }
    console.log(this.cotizacion);
    return this.http.post(this.configuracion.rootURL + '/Cotizacion', this.cotizacion)
  }

  refrescarListaCotizacion() {
    this.http.get(this.configuracion.rootURL + '/Cotizacion')
      .toPromise()
      .then(res => this.listaCotizacion = res as Cotizacion[])
  }

  editarCotizacion() {
  return this.http.put(this.configuracion.rootURL + '/Cotizacion/' + this.cotizacion.IdCotizacion, this.cotizacion)
  }

  eliminarCotizacion(id) {
  return this.http.delete(this.configuracion.rootURL + '/Cotizacion/' + id)
  }
}

