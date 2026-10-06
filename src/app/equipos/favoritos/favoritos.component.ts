import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import * as Toast from "nativescript-toast";
import * as SocialShare from "nativescript-social-share";
import { ImageSource } from "tns-core-modules/image-source";

import { Store } from "@ngrx/store";

import {
    Favorito,
    FavoritosService
} from "../favoritos.service";

import {
    LeerAhora
} from "../../store/minecontrol.actions";

import {
    MineControlState
} from "../../store/minecontrol.reducer";

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
        private routerExtensions: RouterExtensions,
        private store: Store<MineControlState>
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
     * Requisito Redux / NgRx:
     *
     * El boton LEER AHORA despacha una Action
     * al Store global.
     *
     * El componente NO modifica directamente
     * el estado Redux.
     */
    public leerAhora(
        favorito: Favorito
    ): void {

        this.store.dispatch(
            new LeerAhora({
                equipoId: favorito.equipoId,
                codigo: favorito.codigo,
                nombre: favorito.nombre,
                area: favorito.area,
                estado: favorito.estado
            })
        );

        Toast.makeText(
            "Leer ahora: " +
            favorito.nombre
        ).show();
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
     * Actualiza manualmente el listado
     * consultando nuevamente SQLite.
     */
    public actualizar(): void {

        this.cargarFavoritos();

        Toast.makeText(
            "Favoritos actualizados"
        ).show();
    }

    /*
     * Comparte una imagen desde un componente diferente
     * al utilizado para compartir texto.
     */
    public compartirImagen(): void {

        const imagen = ImageSource.fromFileSync(
            "~/images/minecontrol-local.png"
        );

        if (!imagen) {
            Toast.makeText(
                "No se pudo cargar la imagen"
            ).show();
            return;
        }

        SocialShare.shareImage(
            imagen,
            "MineControl - Gestion de equipos"
        );
    }
    public volver(): void {

        this.routerExtensions.back();
    }
}

