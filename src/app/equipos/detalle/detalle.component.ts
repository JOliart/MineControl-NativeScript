import {
    Component,
    ElementRef,
    OnInit,
    ViewChild
} from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { alert, action } from "tns-core-modules/ui/dialogs";
import { Color } from "tns-core-modules/color";
import { makeText } from "nativescript-toast";

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

    public equipo: Equipo;

    // Practica de animaciones:
    // referencia al control #panelAnimado de la vista.
    @ViewChild("panelAnimado", { static: false })
    public panelAnimado: ElementRef;

    constructor(
        private route: ActivatedRoute,
        private equiposService: EquiposService,
        private routerExtensions: RouterExtensions
    ) {}

    ngOnInit(): void {
        const id = +this.route.snapshot.params["id"];
        this.equipo = this.equiposService.getEquipo(id);
    }

    public votarPositivo(observacion: Observacion): void {

        observacion.votosPositivos++;

        alert({
            title: "MineControl",
            message: "Se registro un voto positivo.",
            okButtonText: "Aceptar"
        });
    }

    public votarNegativo(observacion: Observacion): void {

        observacion.votosNegativos++;

        alert({
            title: "MineControl",
            message: "Se registro un voto negativo.",
            okButtonText: "Aceptar"
        });
    }

    public editarObservacion(observacion: Observacion): void {

        action({
            message: "Seleccione el nuevo estado",
            cancelButtonText: "Cancelar",
            actions: [
                "PENDIENTE",
                "REVISADO",
                "ATENDIDO"
            ]
        }).then((resultado: string) => {

            if (
                resultado &&
                resultado !== "Cancelar"
            ) {
                observacion.estado = resultado;

                makeText(
                    "Observacion actualizada correctamente"
                ).show();
            }
        });
    }

    public actualizar(args: any): void {

        const pullRefresh = args.object;

        if (this.equipo && this.equipo.observaciones) {

            const numero =
                this.equipo.observaciones.length + 1;

            this.equipo.observaciones.push({
                id: numero,
                descripcion: "Nueva observacion " + numero,
                usuario: "Sistema",
                estado: "PENDIENTE",
                icono: "&#xf075;",
                votosPositivos: 0,
                votosNegativos: 0
            });
        }

        if (pullRefresh) {
            pullRefresh.refreshing = false;
        }
    }

    public editar(): void {

        this.routerExtensions.navigate(
            ["/equipos/editar", this.equipo.id],
            {
                transition: {
                    name: "slide"
                }
            }
        );
    }

    // Requisito 3:
    // animacion de color con delay.
    public animarColor(): void {

        if (!this.panelAnimado) {
            return;
        }

        const vista = this.panelAnimado.nativeElement;

        vista.animate({
            backgroundColor: new Color("#4CAF50"),
            duration: 1000,
            delay: 500
        }).then(() => {

            return vista.animate({
                backgroundColor: new Color("#FFFFFF"),
                duration: 1000
            });
        });
    }

    // Requisito 4:
    // segunda animacion usando scale y rotate.
    public animarTransformacion(): void {

        if (!this.panelAnimado) {
            return;
        }

        const vista = this.panelAnimado.nativeElement;

        vista.animate({
            scale: {
                x: 1.15,
                y: 1.15
            },
            rotate: 360,
            duration: 1200
        }).then(() => {

            return vista.animate({
                scale: {
                    x: 1,
                    y: 1
                },
                rotate: 0,
                duration: 500
            });
        });
    }

    public volver(): void {
        this.routerExtensions.back();
    }
}