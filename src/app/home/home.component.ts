import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import {
    EquipoLectura,
    MineControlState
} from "../store/minecontrol.reducer";

import {
    selectLeerAhora
} from "../store/minecontrol.selectors";

import {
    QuitarLectura
} from "../store/minecontrol.actions";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    /*
     * Observable conectado al Store de NgRx.
     *
     * Cuando el reducer modifica leerAhora,
     * este Observable recibe automáticamente
     * el nuevo estado.
     */
    public leerAhora$: Observable<EquipoLectura[]>;

    /*
     * Arreglo utilizado por el ListView.
     */
    public equiposLeerAhora: EquipoLectura[] = [];

    constructor(
        private store: Store<MineControlState>
    ) {}

    public ngOnInit(): void {

        /*
         * REQUISITO REDUX:
         *
         * La pantalla principal consulta el estado
         * utilizando la API select() del Store.
         */
        this.leerAhora$ =
            this.store.select(selectLeerAhora);

        /*
         * Suscripción reactiva.
         *
         * Cada vez que LEER AHORA modifica el Store,
         * actualizamos el listado mostrado en Home.
         */
        this.leerAhora$
            .subscribe(
                (
                    equipos: EquipoLectura[]
                ) => {

                    this.equiposLeerAhora =
                        equipos;
                }
            );
    }

    /*
     * Permite retirar un equipo del listado
     * mediante otra Action de Redux.
     */
    public quitar(
        equipo: EquipoLectura
    ): void {

        this.store.dispatch(
            new QuitarLectura(
                equipo.equipoId
            )
        );
    }

    /*
     * Abre el SideDrawer original
     * del template NativeScript.
     */
    public onDrawerButtonTap(): void {

        const sideDrawer =
            <RadSideDrawer>app.getRootView();

        sideDrawer.showDrawer();
    }
}