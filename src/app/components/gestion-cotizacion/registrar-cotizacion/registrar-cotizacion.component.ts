import { Component, OnInit } from '@angular/core';
import { GestionCotizacionService } from 'src/app/services/gestion-cotizacion.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registrar-cotizacion',
  templateUrl: './registrar-cotizacion.component.html',
  styleUrls: ['./registrar-cotizacion.component.css']
})
export class RegistrarCotizacionComponent implements OnInit {


  
 


  constructor(public gestioncotizacionservice: GestionCotizacionService, private formBuilder: FormBuilder, private toastr: ToastrService) { }


  ngOnInit() {

   
  }

  onSubmit() {

    this.gestioncotizacionservice.cotizacion = this.gestioncotizacionservice.formularioRegistroCotizacion.value;
    
    
    if (this.gestioncotizacionservice.cotizacion.IdCotizacion == 0||this.gestioncotizacionservice.cotizacion.IdCotizacion==null) {
      this.guardarCotizacion();
    } else {
      this.editarCotizacion();
    }
  }



  guardarCotizacion() {

    this.gestioncotizacionservice.guardarCotizacion().subscribe(
      res => {
        this.gestioncotizacionservice.formularioRegistroCotizacion.reset();
        this.toastr.success("Se registró la Cotización", "Registro de Cotización");
        this.gestioncotizacionservice.refrescarListaCotizacion();
      },
      err => {
        console.log(err);
      }
    )
  }


  editarCotizacion() {

    this.gestioncotizacionservice.editarCotizacion().subscribe(
      res => {
        this.gestioncotizacionservice.formularioRegistroCotizacion.reset();
        this.toastr.info("Se actualizó la Cotización", "Cotización");
        this.gestioncotizacionservice.refrescarListaCotizacion();
      },
      err => {
        console.log(err);
      }
    )
  }


}





