import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { isAndroid } from "tns-core-modules/platform";
import { action } from "tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toast";

import { Equipo, EquiposService } from "../equipos.service";
import { FavoritosService } from "../favoritos.service";

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

        // Codigo especifico para Android.
        if (isAndroid) {
            this.plataforma = "Android";
        }

        /*
         * Carga inicial asincronica desde el WebService.
         */
        this.cargarEquipos();
    }

    /*
     * Consume el WebService mediante un Observable.
     */
    public cargarEquipos(filtro?: string): void {

        this.cargando = true;

        this.equiposService
            .getEquipos(filtro)
            .subscribe(
                (datos: Equipo[]) => {

                    this.equipos = datos;
                    this.resultadosBusqueda = datos.slice();

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
     * Busqueda mediante querystring.
     *
     * Ejemplo:
     * /equipos?buscar=bomba
     */
    public buscar(): void {

        const texto = this.textoBusqueda.trim();

        if (!texto) {
            this.cargarEquipos();
            return;
        }

        this.equiposService
            .getEquipos(texto)
            .subscribe(
                (datos: Equipo[]) => {

                    this.equipos = datos;
                    this.resultadosBusqueda = datos.slice();

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

    public limpiarBusqueda(): void {

        this.textoBusqueda = "";

        this.cargarEquipos();

        Toast.makeText(
            "Busqueda limpiada"
        ).show();
    }

    /*
     * Guarda el equipo seleccionado como favorito.
     *
     * El servicio utiliza SQLite y almacena
     * los datos en la tabla favoritos.
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
     * Dialogo Action.
     * Modifica el estado del objeto seleccionado.
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
        }).then((resultado: string) => {

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
     * Obtiene nuevamente los datos del WebService.
     */
    public refrescar(args: any): void {

        const pullRefresh = args.object;

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
     * Navegacion programatica al detalle.
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
     * Abre la futura pantalla que mostrara
     * los registros almacenados en SQLite.
     */
    public verFavoritos(): void {

        this.routerExtensions.navigate(
            ["/equipos/favoritos"],
            {
                transition: {
                    name: "slideLeft"
                }
            }
        );
    }
}