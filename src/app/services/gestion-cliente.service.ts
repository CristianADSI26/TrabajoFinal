import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../models/cliente';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionService } from './configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class GestionClienteService {

  formularioRegistroCliente = this.formbuilder.group({
    IdCliente:[0],
    PrimerNombre:["",[Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    SegundoNombre:["",[Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    PrimerApellido:["",[Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    SegundoApellido:["",[Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    TipoDocumento:["",[Validators.required,Validators.pattern(this.configuracion.exRegularLetras)]],
    NumeroDocumento:["",[Validators.required, Validators.minLength(5), Validators.maxLength(11), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Email:["",[Validators.required, Validators.maxLength(40), Validators.pattern(this.configuracion.exRegularCorreo)]],
    Genero:["",[Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
    Telefono:["",[Validators.required, Validators.minLength(7), Validators.maxLength(15), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Celular:["",[Validators.required, Validators.minLength(7), Validators.maxLength(15), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Comentarios:["",[Validators.required, Validators.pattern(this.configuracion.exRegularLetras)]],
  });
  

 cliente: Cliente;
  listaCliente: Cliente[];
  filtroCliente:"";
  get PrimerNombre(){
    return this.formularioRegistroCliente.controls["PrimerNombre"]
  }
  get SegundoNombre(){
    return this.formularioRegistroCliente.controls["SegundoNombre"]
  }
  get PrimerApellido(){
    return this.formularioRegistroCliente.controls["PrimerApellido"]
  }
  get SegundoApellido(){
    return this.formularioRegistroCliente.controls["SegundoApellido"]
  }
  get TipoDocumento(){
    return this.formularioRegistroCliente.controls["TipoDocumento"]
  }
  get NumeroDocumento(){
    return this.formularioRegistroCliente.controls["NumeroDocumento"]
  }
  
  get Email(){
    return this.formularioRegistroCliente.controls["Email"]
  }
  get Genero(){
    return this.formularioRegistroCliente.controls["Genero"]
  }
  get Telefono(){
    return this.formularioRegistroCliente.controls["Telefono"]
  }
  
  get Celular(){
    return this.formularioRegistroCliente.controls["Celular"]
  }
  get Comentarios(){
    return this.formularioRegistroCliente.controls["Comentarios"]
  }
  
    
  constructor(private http: HttpClient, private configuracion:ConfiguracionService, private formbuilder:FormBuilder) { }


  guardarCliente() {
    if (this.cliente.IdCliente==null) {
      this.cliente.IdCliente=0;
    }
    console.log(this.cliente);
    return this.http.post(this.configuracion.rootURL + '/Cliente', this.cliente)
  }

  refrescarListaCliente() {
    this.http.get(this.configuracion.rootURL + '/Cliente')
      .toPromise()
      .then(res => this.listaCliente = res as Cliente[])
  }

  editarCliente() {
  return this.http.put(this.configuracion.rootURL + '/Cliente/' + this.cliente.IdCliente, this.cliente)
  }

  eliminarCliente(id) {
  return this.http.delete(this.configuracion.rootURL + '/Cliente/' + id)
  }
}
