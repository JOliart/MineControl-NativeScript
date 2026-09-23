import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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
     * API publica creada con Express y expuesta mediante ngrok.
     *
     * Mientras ngrok este ejecutandose esta URL permitira
     * acceder al servidor Express que corre en el puerto 3000.
     */
    private apiUrl =
        "https://washout-unleash-feast.ngrok-free.dev/equipos";

    constructor(
        private http: HttpClient
    ) {}

    /*
     * Obtiene el listado de equipos desde el WebService.
     *
     * Devuelve un Observable para que el componente
     * pueda responder asincronicamente.
     */
    public getEquipos(filtro?: string): Observable<Equipo[]> {

        let url = this.apiUrl;

        /*
         * Si se proporciona un filtro se envia mediante
         * querystring al WebService Express.
         *
         * Ejemplo:
         * /equipos?buscar=bomba
         */
        if (filtro && filtro.trim()) {
            url += "?buscar=" +
                encodeURIComponent(filtro.trim());
        }

        return this.http.get<Equipo[]>(url);
    }

    /*
     * Obtiene un equipo utilizando el listado recibido
     * desde el WebService.
     *
     * Esta funcion se adaptara posteriormente si es
     * necesario para la pantalla de detalle.
     */
    public getEquipo(id: number): Observable<Equipo[]> {

        return this.http.get<Equipo[]>(
            this.apiUrl
        );
    }
}