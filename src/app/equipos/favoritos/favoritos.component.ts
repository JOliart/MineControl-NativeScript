import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import * as Toast from "nativescript-toast";

import {
    Favorito,
    FavoritosService
} from "../favoritos.service";

@Component({
    selector: "EquiposFavoritos",
    moduleId: module.id,
    templateUrl: "./favoritos.component.html",
    styleUrls: ["./favoritos.component.css"]
})
export class FavoritosComponent implements OnInit {

    public favoritos: Favorito[] = [];
    public cargando = false;

    constructor(
        private favoritosService: FavoritosService,
        private routerExtensions: RouterExtensions
    ) {}

    public ngOnInit(): void {

        /*
         * Al ingresar a la pantalla consultamos
         * los registros almacenados en SQLite.
         */
        this.cargarFavoritos();
    }

    /*
     * Consulta SQLite mediante FavoritosService.
     *
     * El resultado se asigna al arreglo local
     * favoritos para actualizar el ListView.
     */
    public cargarFavoritos(): void {

        this.cargando = true;

        this.favoritosService
            .obtenerFavoritos()
            .then((datos: Favorito[]) => {

                this.favoritos = datos;

                this.cargando = false;

                if (datos.length === 0) {

                    Toast.makeText(
                        "No existen favoritos guardados"
                    ).show();
                }
            })
            .catch((error: any) => {

                console.log(
                    "Error al consultar favoritos:"
                );

                console.log(error);

                this.cargando = false;

                Toast.makeText(
                    "Error al consultar SQLite"
                ).show();
            });
    }

    /*
     * Elimina un registro de SQLite.
     */
    public eliminar(
        favorito: Favorito
    ): void {

        this.favoritosService
            .eliminarFavorito(
                favorito.equipoId
            )
            .then(() => {

                Toast.makeText(
                    "Favorito eliminado: " +
                    favorito.nombre
                ).show();

                /*
                 * Volvemos a consultar SQLite
                 * para actualizar el ListView.
                 */
                this.cargarFavoritos();
            })
            .catch((error: any) => {

                console.log(
                    "Error al eliminar favorito:"
                );

                console.log(error);

                Toast.makeText(
                    "No se pudo eliminar el favorito"
                ).show();
            });
    }

    /*
     * Permite actualizar manualmente el listado.
     */
    public actualizar(): void {

        this.cargarFavoritos();

        Toast.makeText(
            "Favoritos actualizados"
        ).show();
    }

    public volver(): void {

        this.routerExtensions.back();
    }
}