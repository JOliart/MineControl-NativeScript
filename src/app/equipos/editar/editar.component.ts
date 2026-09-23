import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
} from "@angular/forms";
import { alert } from "tns-core-modules/ui/dialogs";

import { Equipo, EquiposService } from "../equipos.service";

/*
 * Validador personalizado.
 * El nombre del equipo debe tener como minimo 5 caracteres.
 */
export function nombreEquipoValido(
    control: AbstractControl
): ValidationErrors | null {

    const valor = control.value ? control.value.trim() : "";

    // El campo obligatorio se valida por separado con Validators.required.
    if (valor && valor.length < 5) {
        return {
            nombreCorto: true
        };
    }

    return null;
}

@Component({
    selector: "EquipoEditar",
    moduleId: module.id,
    templateUrl: "./editar.component.html",
    styleUrls: ["./editar.component.css"]
})
export class EditarComponent implements OnInit {

    public equipo: Equipo;
    public formulario: FormGroup;
    public guardado = false;

    constructor(
        private route: ActivatedRoute,
        private equiposService: EquiposService,
        private routerExtensions: RouterExtensions
    ) {}

    ngOnInit(): void {

        const id = +this.route.snapshot.params["id"];

        this.equipo = this.equiposService.getEquipo(id);

        this.formulario = new FormGroup({

            nombre: new FormControl(
                this.equipo.nombre,
                [
                    Validators.required,
                    nombreEquipoValido
                ]
            ),

            area: new FormControl(
                this.equipo.area,
                [
                    Validators.required
                ]
            )
        });
    }

    public guardar(): void {

        this.guardado = true;

        if (this.formulario.invalid) {

            alert({
                title: "Validacion",
                message: "Revise los campos del formulario.",
                okButtonText: "Aceptar"
            });

            return;
        }

        this.equipo.nombre = this.formulario.value.nombre.trim();
        this.equipo.area = this.formulario.value.area.trim();

        alert({
            title: "MineControl",
            message: "Datos del equipo actualizados correctamente.",
            okButtonText: "Aceptar"
        }).then(() => {
            this.routerExtensions.back();
        });
    }

    public cancelar(): void {
        this.routerExtensions.back();
    }

    public get nombre(): FormControl {
        return this.formulario.get("nombre") as FormControl;
    }

    public get area(): FormControl {
        return this.formulario.get("area") as FormControl;
    }
}