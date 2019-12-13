import { Component, OnInit } from '@angular/core';
import { GestionInspeccionService } from 'src/app/services/gestion-inspeccion.service';
import { ToastrService } from 'ngx-toastr';
import { Inspeccion } from 'src/app/models/inspeccion';

@Component({
  selector: 'app-listar-inspeccion',
  templateUrl: './listar-inspeccion.component.html',
  styleUrls: ['./listar-inspeccion.component.css']
})
export class ListarInspeccionComponent implements OnInit {
  constructor(public gestionInspeccionService: GestionInspeccionService, private toastr: ToastrService) { }

  ngOnInit() {
    this.gestionInspeccionService.refrescarListaInspeccion();
  }

  llenarFormularioInspeccion(inspeccion: Inspeccion) {

    this.gestionInspeccionService.formularioRegistroInspeccion.patchValue(inspeccion);
  }

  eliminarInspeccion(id){
    if(confirm("¿Estas seguro de eliminar la Inspección?")){
      this.gestionInspeccionService.eliminarInspeccion(id)
      .subscribe(res=>{
        this.gestionInspeccionService.refrescarListaInspeccion();
        this.toastr.error("Inspección eliminada con exíto", "Eliminar Inspección");
      },
      err=>{
        console.log(err)
      })

    }

  }

}
