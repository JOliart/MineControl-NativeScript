import { Component, OnInit } from "@angular/core";
import {
    FormControl,
    FormGroup,
    Validators,
    AbstractControl,
    ValidationErrors
} from "@angular/forms";

import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

import * as Toast from "nativescript-toast";
import * as camera from "nativescript-camera";
import * as SocialShare from "nativescript-social-share";

import {
    Equipo,
    EquiposService
} from "../equipos.service";

@Component({
    selector: "EquipoEditar",
    moduleId: module.id,
    templateUrl: "./editar.component.html",
    styleUrls: ["./editar.component.css"]
})
export class EditarComponent implements OnInit {

    public equipo: Equipo = null;
    public cargando = false;

    public formulario: FormGroup;
    public nombre: FormControl;
    public area: FormControl;

    public guardado = false;

    constructor(
        private route: ActivatedRoute,
        private routerExtensions: RouterExtensions,
        private equiposService: EquiposService
    ) {}

    public ngOnInit(): void {

        /*
         * Controles del formulario reactivo.
         */
        this.nombre = new FormControl(
            "",
            [
                Validators.required,
                this.validarNombreCorto
            ]
        );

        this.area = new FormControl(
            "",
            [
                Validators.required
            ]
        );

        /*
         * FormGroup utilizado por la vista.
         */
        this.formulario = new FormGroup({
            nombre: this.nombre,
            area: this.area
        });

        /*
         * Obtiene el ID enviado por la ruta.
         */
        const id = Number(
            this.route.snapshot.paramMap.get("id")
        );

        this.cargarEquipo(id);
    }

    /*
     * Validador personalizado.
     *
     * El nombre debe contener al menos
     * cinco caracteres.
     */
    public validarNombreCorto(
        control: AbstractControl
    ): ValidationErrors | null {

        if (!control.value) {
            return null;
        }

        const valor = String(control.value).trim();

        if (valor.length < 5) {
            return {
                nombreCorto: true
            };
        }

        return null;
    }

    /*
     * Obtiene el equipo desde el WebService.
     */
    private cargarEquipo(id: number): void {

        this.cargando = true;

        this.equiposService
            .getEquipo(id)
            .subscribe(
                (equipos: Equipo[]) => {

                    const encontrado = equipos.find(
                        (item: Equipo) =>
                            item.id === id
                    );

                    if (encontrado) {

                        this.equipo = encontrado;

                        if (!this.equipo.observaciones) {
                            this.equipo.observaciones = [];
                        }

                        /*
                         * Carga los datos recibidos desde
                         * el WebService en el formulario.
                         */
                        this.formulario.patchValue({
                            nombre: this.equipo.nombre,
                            area: this.equipo.area
                        });

                    } else {

                        Toast.makeText(
                            "Equipo no encontrado"
                        ).show();
                    }

                    this.cargando = false;
                },
                (error: any) => {

                    console.log(
                        "Error al obtener equipo para editar:"
                    );

                    console.log(error);

                    this.cargando = false;

                    Toast.makeText(
                        "Error al consultar MineControl API"
                    ).show();
                }
            );
    }

    /*
     * Guarda los cambios.
     *
     * Primero se validan los controles.
     */
    public guardar(): void {

        this.guardado = true;

        if (!this.equipo || !this.formulario) {
            return;
        }

        if (this.formulario.invalid) {

            Toast.makeText(
                "Revise los datos ingresados"
            ).show();

            return;
        }

        /*
         * Actualiza el objeto local con los
         * valores del formulario.
         */
        this.equipo.nombre = this.nombre.value;
        this.equipo.area = this.area.value;

        /*
         * La practica actual utiliza GET para
         * consumir el WebService.
         *
         * No se realiza PUT/POST porque el API
         * actual no lo requiere.
         */
        Toast.makeText(
            "Cambios guardados en la aplicacion"
        ).show();

        this.routerExtensions.back();
    }

    /*
     * PRACTICA CAMARA + SOCIAL SHARE
     *
     * Solicita permisos para utilizar la camara,
     * toma una fotografia y posteriormente la
     * comparte utilizando Social Share.
     */
    public tomarFotoYCompartir(): void {

        camera.requestPermissions()
            .then(() => {

                return camera.takePicture({
                    width: 800,
                    height: 800,
                    keepAspectRatio: true,
                    saveToGallery: false
                });

            })
            .then((imageAsset) => {

                if (!imageAsset) {

                    Toast.makeText(
                        "No se obtuvo ninguna fotografia"
                    ).show();

                    return;
                }

                SocialShare.shareImage(
                    imageAsset.nativeImage,
                    "MineControl - Fotografia del equipo"
                );

            })
            .catch((error: any) => {

                console.log(
                    "Error al utilizar la camara:"
                );

                console.log(error);

                Toast.makeText(
                    "No se pudo tomar o compartir la fotografia"
                ).show();
            });
    }

    public cancelar(): void {
        this.routerExtensions.back();
    }

    public volver(): void {
        this.routerExtensions.back();
    }
}