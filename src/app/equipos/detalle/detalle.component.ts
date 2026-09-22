import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

import { Equipo, EquiposService } from "../equipos.service";

@Component({
    selector: "EquipoDetalle",
    moduleId: module.id,
    templateUrl: "./detalle.component.html",
    styleUrls: ["./detalle.component.css"]
})
export class DetalleComponent implements OnInit {

    public equipo: Equipo;

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
}
