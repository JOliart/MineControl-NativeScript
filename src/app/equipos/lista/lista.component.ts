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

    private contadorRefresco = 1;

    constructor(
        private equiposService: EquiposService,
        private routerExtensions: RouterExtensions
    ) {}

    ngOnInit(): void {

        this.equipos = this.equiposService.getEquipos();

        // Copia inicial para mostrar todos los equipos.
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

        // Si el buscador esta vacio mostramos todos los equipos.
        if (!texto) {
            this.resultadosBusqueda = this.equipos.slice();
            return;
        }

        // Filtrado por codigo, nombre, area o estado.
        this.resultadosBusqueda = this.equipos.filter(
            (equipo: Equipo) =>
                equipo.codigo.toLowerCase().indexOf(texto) !== -1 ||
                equipo.nombre.toLowerCase().indexOf(texto) !== -1 ||
                equipo.area.toLowerCase().indexOf(texto) !== -1 ||
                equipo.estado.toLowerCase().indexOf(texto) !== -1
        );

        Toast.makeText("Busqueda realizada").show();
    }

    public limpiarBusqueda(): void {

        this.textoBusqueda = "";

        this.resultadosBusqueda = this.equipos.slice();

        Toast.makeText("Busqueda limpiada").show();
    }

    /*
     * Dialogo Action.
     * Permite modificar el estado del objeto seleccionado.
     */
    public cambiarEstado(equipo: Equipo): void {

        const opciones = [
            "OPERATIVO",
            "MANTENIMIENTO",
            "ALARMA"
        ];

        action({
            title: "Estado del equipo",
            message: "Seleccione el nuevo estado de " + equipo.codigo,
            cancelButtonText: "Cancelar",
            actions: opciones
        }).then((resultado: string) => {

            if (resultado && resultado !== "Cancelar") {

                equipo.estado = resultado;

                Toast.makeText(
                    equipo.codigo + ": " + resultado
                ).show();
            }
        });
    }

    /*
     * Pull To Refresh.
     *
     * Cada vez que el usuario desliza hacia abajo:
     * 1. Se obtiene nuevamente la informacion del servicio.
     * 2. Se genera un nuevo equipo.
     * 3. El nuevo equipo se agrega al inicio del ListView.
     * 4. Se muestra un Toast.
     */
    public refrescar(args: any): void {

        const pullRefresh = args.object;

        setTimeout(() => {

            const equiposServicio = this.equiposService.getEquipos();

            /*
             * Se toma un equipo existente como plantilla.
             * De esta forma se conservan todas las propiedades
             * definidas en la interfaz Equipo.
             */
            const indiceAleatorio = Math.floor(
                Math.random() * equiposServicio.length
            );

            const equipoBase = equiposServicio[indiceAleatorio];

            const numeroAleatorio = Math.floor(
                Math.random() * 900 + 100
            );

            const nuevoEquipo = Object.assign(
                {},
                equipoBase,
                {
                    id: new Date().getTime(),
                    codigo: "MC-" + numeroAleatorio,
                    nombre: "Equipo actualizado " + this.contadorRefresco,
                    estado: "OPERATIVO"
                }
            ) as Equipo;

            this.contadorRefresco++;

            /*
             * Se agrega realmente un elemento nuevo
             * al arreglo utilizado por el ListView.
             */
            this.equipos = [
                nuevoEquipo
            ].concat(this.equipos);

            this.resultadosBusqueda = this.equipos.slice();

            // Limpia el formulario de busqueda.
            this.textoBusqueda = "";

            // Finaliza la animacion del PullToRefresh.
            if (pullRefresh) {
                pullRefresh.refreshing = false;
            }

            Toast.makeText(
                "Nuevo equipo agregado: " + nuevoEquipo.codigo
            ).show();

        }, 700);
    }

    /*
     * Navegacion programatica hacia el detalle.
     * Requisito RouterExtensions.navigate().
     */
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