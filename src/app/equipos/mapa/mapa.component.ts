import { Component } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";

import {
    MapView,
    Marker,
    Position
} from "nativescript-google-maps-sdk";

/*
 * Registro del componente nativo MapView
 * para poder utilizar <MapView> en Angular.
 */
registerElement(
    "MapView",
    () => require("nativescript-google-maps-sdk").MapView
);

@Component({
    selector: "EquipoMapa",
    moduleId: module.id,
    templateUrl: "./mapa.component.html",
    styleUrls: ["./mapa.component.css"]
})
export class MapaComponent {

    /*
     * Se ejecuta cuando Google Maps esta listo.
     */
    public onMapReady(args: any): void {

        const mapView = args.object as MapView;

        console.log("Google Maps listo");

        /*
         * Posicion inicial de ejemplo.
         */
        mapView.latitude = -7.1638;
        mapView.longitude = -78.5003;
        mapView.zoom = 13;

        /*
         * Marcador de ejemplo para MineControl.
         */
        const marcador = new Marker();

        marcador.position = Position.positionFromLatLng(
            -7.1638,
            -78.5003
        );

        marcador.title = "MineControl";
        marcador.snippet = "Ubicacion de ejemplo";

        mapView.addMarker(marcador);

        console.log("Marcador agregado al mapa");
    }
}