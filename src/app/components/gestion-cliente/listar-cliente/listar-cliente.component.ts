import { Component, OnInit } from '@angular/core';
import { GestionClienteService } from 'src/app/services/gestion-cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  constructor(public gestionClienteService: GestionClienteService, private toastr: ToastrService) { }

  ngOnInit() {
    this.gestionClienteService.refrescarListaCliente();
  }

  llenarFormularioCliente(cliente: Cliente) {

    this.gestionClienteService.formularioRegistroCliente.patchValue(cliente);
  }

  eliminarCliente(id){
    if(confirm("¿Estas seguro de eliminar la cliente?")){
      this.gestionClienteService.eliminarCliente(id)
      .subscribe(res=>{
        this.gestionClienteService.refrescarListaCliente();
        this.toastr.error("Cliente eliminado con exíto", "Eliminar cliente");
      },
      err=>{
        console.log(err)
      })

    }

  }
}
