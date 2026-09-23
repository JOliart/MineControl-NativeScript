import {
    Component,
    ElementRef,
    OnInit,
    ViewChild
} from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { action, alert } from "tns-core-modules/ui/dialogs";
import { Color } from "tns-core-modules/color";
import * as Toast from "nativescript-toast";

import {
    Equipo,
    Observacion,
    EquiposService
} from "../equipos.service";

@Component({
    selector: "EquipoDetalle",
    moduleId: module.id,
    templateUrl: "./detalle.component.html",
    styleUrls: ["./detalle.component.css"]
})
export class DetalleComponent implements OnInit {

    public equipo: Equipo = null;

    @ViewChild(
        "panelAnimado",
        { static: false }
    )
    public panelAnimado: ElementRef;

    constructor(
        private route: ActivatedRoute,
        private routerExtensions: RouterExtensions,
        private equiposService: EquiposService
    ) {}

    public ngOnInit(): void {

        const id = Number(
            this.route.snapshot.paramMap.get("id")
        );

        /*
         * El servicio obtiene los equipos mediante HTTP.
         * La respuesta es asincronica, por eso utilizamos
         * subscribe().
         */
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

                        /*
                         * El WebService de Express actualmente
                         * no devuelve observaciones.
                         * Creamos el arreglo para conservar
                         * las funciones de la practica anterior.
                         */
                        if (!this.equipo.observaciones) {
                            this.equipo.observaciones = [];
                        }

                    } else {

                        Toast.makeText(
                            "Equipo no encontrado"
                        ).show();
                    }
                },
                (error: any) => {

                    console.log(
                        "Error al obtener detalle del equipo:"
                    );

                    console.log(error);

                    Toast.makeText(
                        "Error al consultar el equipo"
                    ).show();
                }
            );
    }

    /*
     * Voto positivo de una observacion.
     */
    public votarPositivo(
        observacion: Observacion
    ): void {

        observacion.votosPositivos++;

        Toast.makeText(
            "Voto positivo registrado"
        ).show();
    }

    /*
     * Voto negativo de una observacion.
     */
    public votarNegativo(
        observacion: Observacion
    ): void {

        observacion.votosNegativos++;

        Toast.makeText(
            "Voto negativo registrado"
        ).show();
    }

    /*
     * Dialogo Action para modificar el estado
     * de una observacion.
     */
    public editarObservacion(
        observacion: Observacion
    ): void {

        action({
            title: "Estado de observacion",
            message:
                "Seleccione el nuevo estado",
            cancelButtonText: "Cancelar",
            actions: [
                "PENDIENTE",
                "EN PROCESO",
                "ATENDIDA"
            ]
        }).then((resultado: string) => {

            if (
                resultado &&
                resultado !== "Cancelar"
            ) {

                observacion.estado = resultado;

                Toast.makeText(
                    "Observacion actualizada: " +
                    resultado
                ).show();
            }
        });
    }

    /*
     * Funcion utilizada por las practicas anteriores.
     * Agrega una observacion local al equipo.
     */
    public agregarObservacion(): void {

        if (!this.equipo) {
            return;
        }

        if (!this.equipo.observaciones) {
            this.equipo.observaciones = [];
        }

        const numero =
            this.equipo.observaciones.length + 1;

        const nuevaObservacion: Observacion = {
            id: new Date().getTime(),
            descripcion:
                "Observacion generada " + numero,
            usuario: "MineControl",
            estado: "PENDIENTE",
            icono: "!",
            votosPositivos: 0,
            votosNegativos: 0
        };

        this.equipo.observaciones.push(
            nuevaObservacion
        );

        Toast.makeText(
            "Nueva observacion agregada"
        ).show();
    }

    /*
     * Mantiene la funcion de edicion utilizada
     * por la pantalla de detalle.
     */
    public editar(): void {

        if (!this.equipo) {
            return;
        }

        alert({
            title: "MineControl",
            message:
                "Equipo seleccionado: " +
                this.equipo.codigo +
                "\nEstado: " +
                this.equipo.estado,
            okButtonText: "Aceptar"
        });
    }

    /*
     * Animacion de color con retardo.
     */
    public animarColor(): void {

        if (
            !this.panelAnimado ||
            !this.panelAnimado.nativeElement
        ) {
            return;
        }

        const vista =
            this.panelAnimado.nativeElement;

        vista.animate({
            backgroundColor:
                new Color("#4CAF50"),
            duration: 1000,
            delay: 500
        }).then(() => {

            return vista.animate({
                backgroundColor:
                    new Color("#FFFFFF"),
                duration: 500
            });
        });
    }

    /*
     * Segunda animacion:
     * escala y rotacion.
     */
    public animarTransformacion(): void {

        if (
            !this.panelAnimado ||
            !this.panelAnimado.nativeElement
        ) {
            return;
        }

        const vista =
            this.panelAnimado.nativeElement;

        vista.animate({
            scale: {
                x: 1.2,
                y: 1.2
            },
            rotate: 360,
            duration: 1000
        }).then(() => {

            return vista.animate({
                scale: {
                    x: 1,
                    y: 1
                },
                rotate: 0,
                duration: 400
            });
        });
    }

    public volver(): void {
        this.routerExtensions.back();
    }
}