import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as applicationSettings from "tns-core-modules/application-settings";

export interface Observacion {
    id: number;
    descripcion: string;
    usuario: string;
    estado: string;
    icono: string;
    votosPositivos: number;
    votosNegativos: number;
}

export interface Equipo {
    id: number;
    codigo: string;
    nombre: string;
    area: string;
    estado: string;
    observaciones?: Observacion[];
}

@Injectable({
    providedIn: "root"
})
export class EquiposService {

    /*
     * Clave utilizada para recuperar desde
     * Application Settings la URL configurada
     * por el usuario.
     *
     * Debe coincidir con la utilizada en
     * SettingsComponent.
     */
    private readonly CLAVE_URL_API =
        "urlApiMineControl";

    /*
     * URL por defecto.
     *
     * Se utiliza mientras el usuario no haya
     * guardado otra URL desde Settings.
     */
    private readonly URL_API_POR_DEFECTO =
        "https://washout-unleash-feast.ngrok-free.dev";

    constructor(
        private http: HttpClient
    ) {}

    /*
     * Obtiene la URL base de la API desde
     * Application Settings.
     *
     * Ejemplo:
     * https://xxxx.ngrok-free.dev
     */
    private obtenerUrlBase(): string {

        let url =
            applicationSettings.getString(
                this.CLAVE_URL_API,
                this.URL_API_POR_DEFECTO
            );

        /*
         * Eliminamos "/" finales para evitar:
         *
         * https://servidor.com//equipos
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

        return url;
    }

    /*
     * Construye dinámicamente el endpoint.
     *
     * URL configurada + /equipos
     */
    private obtenerUrlEquipos(): string {

        return this.obtenerUrlBase() +
            "/equipos";
    }

    /*
     * Obtiene el listado de equipos desde
     * Express mediante HTTP.
     *
     * Devuelve Observable<Equipo[]>.
     */
    public getEquipos(
        filtro?: string
    ): Observable<Equipo[]> {

        let url =
            this.obtenerUrlEquipos();

        /*
         * Si existe un filtro se envía mediante
         * QueryString al servidor Express.
         *
         * Ejemplo:
         * /equipos?buscar=bomba
         */
        if (
            filtro &&
            filtro.trim()
        ) {

            url +=
                "?buscar=" +
                encodeURIComponent(
                    filtro.trim()
                );
        }

        console.log(
            "MineControl API: " + url
        );

        return this.http.get<Equipo[]>(
            url
        );
    }

    /*
     * Obtiene los equipos para localizar posteriormente
     * el registro solicitado por su ID.
     */
    public getEquipo(
        id: number
    ): Observable<Equipo[]> {

        const url =
            this.obtenerUrlEquipos();

        console.log(
            "MineControl API detalle ID " +
            id +
            ": " +
            url
        );

        return this.http.get<Equipo[]>(
            url
        );
    }
}