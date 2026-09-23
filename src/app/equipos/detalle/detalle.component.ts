import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { alert, action } from "tns-core-modules/ui/dialogs";
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

    private descripciones: string[] = [
        "Inspeccion visual realizada sin observaciones",
        "Parametros electricos dentro del rango",
        "Equipo revisado por mantenimiento",
        "Temperatura de operacion verificada",
        "Se recomienda nueva inspeccion",
        "Condicion operativa verificada"
    ];

    constructor(
        private route: ActivatedRoute,
        private equiposService: EquiposService,
        private routerExtensions: RouterExtensions
    ) {}

    ngOnInit(): void {
        const id = +this.route.snapshot.params["id"];
        this.equipo = this.equiposService.getEquipo(id);
    }

    public volver(): void {
        this.routerExtensions.back();
    }

    public votoPositivo(observacion: Observacion): void {
        observacion.votosPositivos++;

        alert({
            title: "MineControl",
            message: "Voto positivo registrado correctamente.",
            okButtonText: "Aceptar"
        });
    }

    public votoNegativo(observacion: Observacion): void {
        observacion.votosNegativos++;

        alert({
            title: "MineControl",
            message: "Voto negativo registrado correctamente.",
            okButtonText: "Aceptar"
        });
    }

    public editarEstado(observacion: Observacion): void {

        action({
            message: "Seleccione el nuevo estado",
            cancelButtonText: "Cancelar",
            actions: [
                "NORMAL",
                "REVISAR",
                "MANTENIMIENTO",
                "CRITICO"
            ]
        }).then((resultado: string) => {

            if (resultado && resultado !== "Cancelar") {

                observacion.estado = resultado;
                makeText("Observacion actualizada correctamente").show();
            }
        });
    }

    public actualizar(args: any): void {

        const indice = Math.floor(
            Math.random() * this.descripciones.length
        );

        const nuevaObservacion: Observacion = {
            id: Date.now(),
            descripcion: this.descripciones[indice],
            usuario: "MineControl",
            estado: "NUEVO",
            icono: "⚡",
            votosPositivos: 0,
            votosNegativos: 0
        };

        this.equipo.observaciones.unshift(nuevaObservacion);

        if (args && args.object) {
            args.object.refresh();
        }
    }
}

