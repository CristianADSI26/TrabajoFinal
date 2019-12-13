import { Component, OnInit } from '@angular/core';
import { GestionCotizacionService } from 'src/app/services/gestion-cotizacion.service';
import { Cotizacion } from 'src/app/models/cotizacion';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-cotizacion',
  templateUrl: './listar-cotizacion.component.html',
  styleUrls: ['./listar-cotizacion.component.css']
})
export class ListarCotizacionComponent implements OnInit {

  constructor(public gestionCotizacionService: GestionCotizacionService, private toastr: ToastrService) { }

  ngOnInit() {
    this.gestionCotizacionService.refrescarListaCotizacion();
  }

  llenarFormularioCotizacion(cotizacion: Cotizacion) {

    this.gestionCotizacionService.formularioRegistroCotizacion.patchValue(cotizacion);
  }

  eliminarCotizacion(id){
    if(confirm("¿Estas seguro de eliminar la Cotización?")){
      this.gestionCotizacionService.eliminarCotizacion(id)
      .subscribe(res=>{
        this.gestionCotizacionService.refrescarListaCotizacion();
        this.toastr.error("Cotización eliminada con exíto", "Eliminar cotización");
      },
      err=>{
        console.log(err)
      })

    }

  }
}
