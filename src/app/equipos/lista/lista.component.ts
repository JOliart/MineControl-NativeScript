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

    public equipos: Equipo[] = [];
    public resultadosBusqueda: Equipo[] = [];
    public textoBusqueda = "";
    public plataforma = "iOS";

    constructor(
        private equiposService: EquiposService,
        private routerExtensions: RouterExtensions
    ) {}

    ngOnInit(): void {
        this.equipos = this.equiposService.getEquipos();

        // Array que almacena los resultados de busqueda.
        this.resultadosBusqueda = this.equipos.slice();

        // Codigo especifico para Android.
        if (isAndroid) {
            this.plataforma = "Android";
        }
    }

    public buscar(): void {

        const texto = this.textoBusqueda
            .trim()
            .toLowerCase();

        if (!texto) {
            this.resultadosBusqueda = this.equipos.slice();
            return;
        }

        this.resultadosBusqueda = this.equipos.filter(
            (equipo: Equipo) =>
                equipo.codigo.toLowerCase().indexOf(texto) !== -1 ||
                equipo.nombre.toLowerCase().indexOf(texto) !== -1 ||
                equipo.area.toLowerCase().indexOf(texto) !== -1 ||
                equipo.estado.toLowerCase().indexOf(texto) !== -1
        );
    }

    public limpiarBusqueda(): void {
        this.textoBusqueda = "";
        this.resultadosBusqueda = this.equipos.slice();
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