import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as applicationSettings from "tns-core-modules/application-settings";
import * as Toast from "nativescript-toast";

@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {

    public nombreUsuario = "";
    public urlApi = "";

    private readonly CLAVE_USUARIO = "nombreUsuario";
    private readonly CLAVE_URL_API = "urlApiMineControl";

    constructor() {}

    public ngOnInit(): void {

        /*
         * Lee configuraciones persistentes almacenadas
         * mediante NativeScript Application Settings.
         */
        this.nombreUsuario =
            applicationSettings.getString(
                this.CLAVE_USUARIO,
                ""
            );

        this.urlApi =
            applicationSettings.getString(
                this.CLAVE_URL_API,
                ""
            );
    }

    /*
     * Persiste el nombre del usuario.
     */
    public guardarUsuario(): void {

        const nombre =
            this.nombreUsuario.trim();

        if (!nombre) {

            Toast.makeText(
                "Ingrese un nombre de usuario"
            ).show();

            return;
        }

        applicationSettings.setString(
            this.CLAVE_USUARIO,
            nombre
        );

        Toast.makeText(
            "Nombre de usuario guardado"
        ).show();
    }

    /*
     * Persiste la URL publica generada por Ngrok.
     *
     * Ejemplo:
     * https://xxxx.ngrok-free.dev
     */
    public guardarUrlApi(): void {

        let url =
            this.urlApi.trim();

        if (!url) {

            Toast.makeText(
                "Ingrese la URL de Ngrok"
            ).show();

            return;
        }

        /*
         * Evita guardar "/" al final para poder
         * construir posteriormente /equipos.
         */
        while (
            url.length > 0 &&
            url.charAt(url.length - 1) === "/"
        ) {
            url = url.substring(
                0,
                url.length - 1
            );
        }

        this.urlApi = url;

        applicationSettings.setString(
            this.CLAVE_URL_API,
            url
        );

        Toast.makeText(
            "URL de MineControl API guardada"
        ).show();
    }

    /*
     * Guarda ambas configuraciones.
     */
    public guardarConfiguracion(): void {

        const nombre =
            this.nombreUsuario.trim();

        let url =
            this.urlApi.trim();

        if (!nombre) {

            Toast.makeText(
                "Ingrese un nombre de usuario"
            ).show();

            return;
        }

        if (!url) {

            Toast.makeText(
                "Ingrese la URL de Ngrok"
            ).show();

            return;
        }

        while (
            url.length > 0 &&
            url.charAt(url.length - 1) === "/"
        ) {
            url = url.substring(
                0,
                url.length - 1
            );
        }

        this.nombreUsuario = nombre;
        this.urlApi = url;

        /*
         * Application Settings almacena pares
         * clave-valor de manera persistente.
         */
        applicationSettings.setString(
            this.CLAVE_USUARIO,
            nombre
        );

        applicationSettings.setString(
            this.CLAVE_URL_API,
            url
        );

        Toast.makeText(
            "Configuracion guardada correctamente"
        ).show();
    }

    public onDrawerButtonTap(): void {

        const sideDrawer =
            <RadSideDrawer>app.getRootView();

        sideDrawer.showDrawer();
    }
}