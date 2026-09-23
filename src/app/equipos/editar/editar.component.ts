import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import * as Toast from "nativescript-toast";

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

    constructor(
        private route: ActivatedRoute,
        private routerExtensions: RouterExtensions,
        private equiposService: EquiposService
    ) {}

    public ngOnInit(): void {

        const id = Number(
            this.route.snapshot.paramMap.get("id")
        );

        this.cargarEquipo(id);
    }

    /*
     * Obtiene los equipos desde el WebService
     * utilizando el Observable retornado por
     * EquiposService.
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
     * Guarda los cambios localmente.
     *
     * La practica actual solicita consumir el listado
     * mediante GET. Por eso no implementamos PUT/POST
     * que no son requeridos por el WebService actual.
     */
    public guardar(): void {

        if (!this.equipo) {
            return;
        }

        Toast.makeText(
            "Cambios guardados en la aplicacion"
        ).show();

        this.routerExtensions.back();
    }

    public cancelar(): void {
        this.routerExtensions.back();
    }

    public volver(): void {
        this.routerExtensions.back();
    }
}