import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { isAndroid } from "tns-core-modules/platform";
import { action } from "tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toast";

import {
    Equipo,
    EquiposService
} from "../equipos.service";

import {
    FavoritosService
} from "../favoritos.service";

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
    public cargando = false;

    constructor(
        private equiposService: EquiposService,
        private routerExtensions: RouterExtensions,
        private favoritosService: FavoritosService
    ) {}

    public ngOnInit(): void {

        /*
         * Detecta la plataforma actual.
         */
        if (isAndroid) {
            this.plataforma = "Android";
        }

        /*
         * Carga inicial de equipos desde
         * MineControl API.
         */
        this.cargarEquipos();
    }

    /*
     * Obtiene los equipos desde el WebService.
     *
     * Puede recibir opcionalmente un filtro
     * para realizar una busqueda.
     */
    public cargarEquipos(filtro?: string): void {

        this.cargando = true;

        this.equiposService
            .getEquipos(filtro)
            .subscribe(
                (datos: Equipo[]) => {

                    this.equipos = datos;

                    this.resultadosBusqueda =
                        datos.slice();

                    this.cargando = false;
                },
                (error: any) => {

                    console.log(
                        "Error al consultar MineControl API:"
                    );

                    console.log(error);

                    this.cargando = false;

                    Toast.makeText(
                        "No se pudo conectar con MineControl API"
                    ).show();
                }
            );
    }

    /*
     * Realiza la busqueda utilizando
     * el WebService.
     */
    public buscar(): void {

        const texto =
            this.textoBusqueda.trim();

        if (!texto) {

            this.cargarEquipos();

            return;
        }

        this.equiposService
            .getEquipos(texto)
            .subscribe(
                (datos: Equipo[]) => {

                    this.equipos = datos;

                    this.resultadosBusqueda =
                        datos.slice();

                    Toast.makeText(
                        "Resultados recibidos del WebService"
                    ).show();
                },
                (error: any) => {

                    console.log(
                        "Error en la busqueda:"
                    );

                    console.log(error);

                    Toast.makeText(
                        "Error al realizar la busqueda"
                    ).show();
                }
            );
    }

    /*
     * Limpia el campo de busqueda y
     * vuelve a cargar todos los equipos.
     */
    public limpiarBusqueda(): void {

        this.textoBusqueda = "";

        this.cargarEquipos();

        Toast.makeText(
            "Busqueda limpiada"
        ).show();
    }

    /*
     * Guarda el equipo seleccionado
     * dentro de favoritos.
     */
    public agregarFavorito(
        equipo: Equipo
    ): void {

        this.favoritosService
            .agregarFavorito(equipo)
            .then(() => {

                Toast.makeText(
                    "Favorito agregado: " +
                    equipo.nombre
                ).show();

            })
            .catch((error: any) => {

                console.log(
                    "Error al guardar favorito:"
                );

                console.log(error);

                Toast.makeText(
                    "No se pudo guardar el favorito"
                ).show();
            });
    }

    /*
     * Permite cambiar localmente
     * el estado de un equipo.
     */
    public cambiarEstado(
        equipo: Equipo
    ): void {

        const opciones = [
            "OPERATIVO",
            "MANTENIMIENTO",
            "ALARMA"
        ];

        action({
            title: "Estado del equipo",
            message:
                "Seleccione el nuevo estado de " +
                equipo.codigo,
            cancelButtonText: "Cancelar",
            actions: opciones
        })
        .then((resultado: string) => {

            if (
                resultado &&
                resultado !== "Cancelar"
            ) {

                equipo.estado = resultado;

                Toast.makeText(
                    equipo.codigo +
                    ": " +
                    resultado
                ).show();
            }
        });
    }

    /*
     * Pull To Refresh.
     *
     * Vuelve a consultar el WebService
     * y actualiza la lista.
     */
    public refrescar(args: any): void {

        const pullRefresh =
            args.object;

        this.equiposService
            .getEquipos()
            .subscribe(
                (datos: Equipo[]) => {

                    this.equipos = datos;

                    this.resultadosBusqueda =
                        datos.slice();

                    this.textoBusqueda = "";

                    if (pullRefresh) {
                        pullRefresh.refreshing = false;
                    }

                    Toast.makeText(
                        "Datos actualizados desde el API"
                    ).show();
                },
                (error: any) => {

                    console.log(
                        "Error al actualizar:"
                    );

                    console.log(error);

                    if (pullRefresh) {
                        pullRefresh.refreshing = false;
                    }

                    Toast.makeText(
                        "Error al actualizar datos"
                    ).show();
                }
            );
    }

    /*
     * Navega hacia el detalle
     * del equipo seleccionado.
     */
    public verDetalle(
        equipo: Equipo
    ): void {

        this.routerExtensions.navigate(
            [
                "/equipos/detalle",
                equipo.id
            ],
            {
                transition: {
                    name: "fade"
                }
            }
        );
    }

    /*
     * Navega hacia la pantalla
     * de favoritos.
     */
    public verFavoritos(): void {

        this.routerExtensions.navigate(
            [
                "/equipos/favoritos"
            ],
            {
                transition: {
                    name: "slideLeft"
                }
            }
        );
    }

    /*
     * PRACTICA GOOGLE MAPS
     *
     * Navega hacia MapaComponent.
     *
     * Los mensajes de consola permiten
     * comprobar si el evento TAP funciona
     * y si Angular completa la navegacion.
     */
    public verMapa(): void {

        console.log(
            "BOTON VER MAPA PRESIONADO"
        );

        this.routerExtensions
            .navigate(
                [
                    "/equipos/mapa"
                ],
                {
                    transition: {
                        name: "slideLeft"
                    }
                }
            )
            .then(() => {

                console.log(
                    "NAVEGACION AL MAPA CORRECTA"
                );

            })
            .catch((error: any) => {

                console.log(
                    "ERROR AL NAVEGAR AL MAPA:"
                );

                console.log(error);
            });
    }
}