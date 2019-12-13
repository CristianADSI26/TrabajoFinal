import { Component, OnInit } from '@angular/core';
import { GestionClienteService } from 'src/app/services/gestion-cliente.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {

  

  constructor(public gestionClienteService:GestionClienteService, private configuracion:ConfiguracionService, private formbuilder: FormBuilder, private toastr: ToastrService ) { }

  ngOnInit() {
   
  }
  onSubmit(){

    this.gestionClienteService.cliente = this.gestionClienteService.formularioRegistroCliente.value;
          
    if (this.gestionClienteService.cliente.IdCliente==0 || this.gestionClienteService.cliente.IdCliente==null) {
     this.guardarCliente();
    }else{
      this.editarCliente();
      
    }

  }

  guardarCliente() {
  
    this.gestionClienteService.guardarCliente().subscribe(
      res =>{
        this.gestionClienteService.formularioRegistroCliente.reset();

        this.toastr.success("Se Registro el cliente Exitosamente")
      },
      err=>{
        console.log(err);
      }
    )
  

    }
    
  editarCliente() {

    this.gestionClienteService.editarCliente().subscribe(
      res => {
        this.gestionClienteService.formularioRegistroCliente.reset();
        this.toastr.info("Se actualizó el Cliente", "Cliente");
        this.gestionClienteService.refrescarListaCliente();
      },
      err => {
        console.log(err);
      }
    )
  }
}
