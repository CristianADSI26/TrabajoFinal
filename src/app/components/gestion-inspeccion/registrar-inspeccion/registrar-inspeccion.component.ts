import { Component, OnInit } from '@angular/core';
import { GestionInspeccionService } from 'src/app/services/gestion-inspeccion.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
    selector: 'app-registrar-inspeccion',
    templateUrl: './registrar-inspeccion.component.html',
    styleUrls: ['./registrar-inspeccion.component.css']
})
export class RegistrarInspeccionComponent implements OnInit {

    

    constructor(public gestionInspeccionService: GestionInspeccionService, private configuracion:ConfiguracionService,private formBuilder: FormBuilder, private toastr: ToastrService) { }

    ngOnInit() {

        
    }
    onSubmit() {
        this.gestionInspeccionService.inspeccion = this.gestionInspeccionService.formularioRegistroInspeccion.value;
                
        if (this.gestionInspeccionService.inspeccion.IdInspeccion==0) {
            this.guardarInspeccion();
        } else {
            this.editarInspeccion();
        }

    }
    guardarInspeccion() {
        this.gestionInspeccionService.guardarInspeccion().subscribe(
            res => {
                this.gestionInspeccionService.formularioRegistroInspeccion.reset();
                this.toastr.success("Se registró la Inspección", "Registro de Inspección");
                this.gestionInspeccionService.refrescarListaInspeccion();
            },
            err => {
                console.log(err);
            }
        )
    }
    editarInspeccion() {
        this.gestionInspeccionService.editarInspeccion().subscribe(
            res => {
                this.gestionInspeccionService.formularioRegistroInspeccion.reset();
                this.toastr.info("Se actualizó la Inspección", "Inspección");
                this.gestionInspeccionService.refrescarListaInspeccion();
            },
            err => {
                console.log(err);
            }
        )

    }

}




