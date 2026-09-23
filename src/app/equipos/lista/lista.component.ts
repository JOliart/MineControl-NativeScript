import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { isAndroid } from "tns-core-modules/platform";
import { action } from "tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toast";

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
    public cargando = false;

    constructor(
        private equiposService: EquiposService,
        private routerExtensions: RouterExtensions
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
     *
     * El servicio retorna Observable<Equipo[]> y subscribe()
     * recibe la respuesta asincronicamente.
     */
    public cargarEquipos(filtro?: string): void {

        this.cargando = true;

        this.equiposService
            .getEquipos(filtro)
            .subscribe(
                (datos: Equipo[]) => {

                    /*
                     * Variable de estado local.
                     * Al actualizar este arreglo, el ListView
                     * se actualiza reactivamente.
                     */
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

        /*
         * Vuelve a consultar todos los equipos
         * desde Express.
         */
        this.cargarEquipos();

        Toast.makeText(
            "Busqueda limpiada"
        ).show();
    }

    /*
     * Dialogo Action.
     * Modifica el estado del objeto seleccionado
     * dentro de la aplicacion.
     */
    public cambiarEstado(equipo: Equipo): void {

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
     *
     * Ahora el refresco obtiene nuevamente
     * los datos desde el WebService.
     */
    public refrescar(args: any): void {

        const pullRefresh = args.object;

        this.equiposService
            .getEquipos()
            .subscribe(
                (datos: Equipo[]) => {

                    /*
                     * Actualiza el arreglo local con
                     * la respuesta HTTP.
                     */
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
    public verDetalle(equipo: Equipo): void {

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
}