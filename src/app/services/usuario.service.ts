import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionService } from './configuracion.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private configuracion:ConfiguracionService, private formBuilder:FormBuilder) { }

  usuario:Usuario;

  formularioRegistroUsuario = this.formBuilder.group({  
    NombreUsuario:["", [Validators.required,Validators.maxLength(20), Validators.pattern(this.configuracion.exLetrasNumeros)]],
    Email:["", [Validators.required, Validators.maxLength(40), Validators.pattern(this.configuracion.exRegularCorreo)]],
    Password:["", [Validators.required, Validators.maxLength(20), Validators.pattern(this.configuracion.exRegularPassword)]],
    ConfirmarPassword:["", [Validators.required]],
    Genero: ["", [Validators.required, Validators.maxLength(40)]],
    TipoDocumento:["", [Validators.required, Validators.maxLength(40)]],
    NumeroDocumento: ["", [Validators.required]],
    Nombre:["", [Validators.required, Validators.maxLength(40)]],
    Apellido: ["", [Validators.required, Validators.maxLength(40)]],
    Telefono: ["", [Validators.required]],
    Direccion: ["", [Validators.required]], 
   
  },
  {
    validator:this.compararPassword.bind(this)
  });


  get Email(){
    return this.formularioRegistroUsuario.controls["Email"];
  }
  get Genero(){
    return this.formularioRegistroUsuario.controls["Genero"];
  }

  get Nombre(){
    return this.formularioRegistroUsuario.controls["Nombre"];
  }
  get Apellido(){
    return this.formularioRegistroUsuario.controls["Apellido"];
  }
  get NombreUsuario(){
    return this.formularioRegistroUsuario.controls["NombreUsuario"];
  }
  get TipoDocumento(){
    return this.formularioRegistroUsuario.controls["TipoDocumento"];
  }
  get NumeroDocumento(){
    return this.formularioRegistroUsuario.controls["NumeroDocumento"];
  }
  
  get Telefono(){
    return this.formularioRegistroUsuario.controls["Telefono"];
  }

  get Direccion(){
    return this.formularioRegistroUsuario.controls["Direccion"];
  }

  get Password(){
    return this.formularioRegistroUsuario.controls["Password"];
  }

  get ConfirmarPassword(){
    return this.formularioRegistroUsuario.controls["ConfirmarPassword"];
  }

  registrarUsuario(){
    this.usuario = this.formularioRegistroUsuario.value;
    delete this.usuario['ConfirmarPassword']
    return this.http.post(this.configuracion.rootURL + '/Usuario/Registro', this.usuario);
  }


  compararPassword(formGroup:FormGroup){

    const password = formGroup.get('Password');
    const confirmarPassword = formGroup.get('ConfirmarPassword');

    if(confirmarPassword.errors==null || 'passwordDiferente' in confirmarPassword)
    if(password.value != confirmarPassword.value){
      confirmarPassword.setErrors({passwordDiferente:true})
    }else{
      confirmarPassword.setErrors(null);
    }

  };


};

