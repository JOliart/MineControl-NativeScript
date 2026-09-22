import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { isAndroid } from "tns-core-modules/platform";

import { Equipo, EquiposService } from "../equipos.service";

@Component({
    selector: "EquiposLista",
    moduleId: module.id,
    templateUrl: "./lista.component.html",
    styleUrls: ["./lista.component.css"]
})
export class ListaComponent implements OnInit {

    public equipos: Equipo[];
    public plataforma = "iOS";

    constructor(
        private equiposService: EquiposService,
        private routerExtensions: RouterExtensions
    ) {}

    ngOnInit(): void {
        this.equipos = this.equiposService.getEquipos();

        // Requisito: asignacion de variable solo cuando se ejecuta en Android.
        if (isAndroid) {
            this.plataforma = "Android";
        }
    }

    public verDetalle(equipo: Equipo): void {
        this.routerExtensions.navigate(
            ["/equipos/detalle", equipo.id],
            {
                transition: {
                    name: "fade"
                }
            }
        );
    }
}
