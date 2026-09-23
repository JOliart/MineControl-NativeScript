import { Injectable } from "@angular/core";
import { Equipo } from "./equipos.service";

const Sqlite = require("nativescript-sqlite");

export interface Favorito {
    id?: number;
    equipoId: number;
    codigo: string;
    nombre: string;
    area: string;
    estado: string;
}

@Injectable({
    providedIn: "root"
})
export class FavoritosService {

    private database: any;

    constructor() {
        this.inicializarBaseDatos();
    }

    /*
     * Abre o crea la base de datos local.
     */
    private inicializarBaseDatos(): Promise<any> {

        if (this.database) {
            return Promise.resolve(this.database);
        }

        return new Sqlite("minecontrol.db")
            .then((db: any) => {

                this.database = db;

                return db.execSQL(
                    `CREATE TABLE IF NOT EXISTS favoritos (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        equipoId INTEGER UNIQUE,
                        codigo TEXT,
                        nombre TEXT,
                        area TEXT,
                        estado TEXT
                    )`
                );
            })
            .then(() => {
                return this.database;
            })
            .catch((error: any) => {

                console.log(
                    "Error al inicializar SQLite:"
                );

                console.log(error);

                throw error;
            });
    }

    /*
     * Guarda un equipo como favorito.
     *
     * INSERT OR REPLACE evita duplicados utilizando
     * equipoId como campo UNIQUE.
     */
    public agregarFavorito(
        equipo: Equipo
    ): Promise<any> {

        return this.inicializarBaseDatos()
            .then((db: any) => {

                return db.execSQL(
                    `INSERT OR REPLACE INTO favoritos
                    (
                        equipoId,
                        codigo,
                        nombre,
                        area,
                        estado
                    )
                    VALUES (?, ?, ?, ?, ?)`,
                    [
                        equipo.id,
                        equipo.codigo,
                        equipo.nombre,
                        equipo.area,
                        equipo.estado
                    ]
                );
            });
    }

    /*
     * Consulta todos los favoritos almacenados
     * en SQLite.
     */
    public obtenerFavoritos(): Promise<Favorito[]> {

        return this.inicializarBaseDatos()
            .then((db: any) => {

                return db.all(
                    `SELECT
                        id,
                        equipoId,
                        codigo,
                        nombre,
                        area,
                        estado
                     FROM favoritos
                     ORDER BY nombre`
                );
            })
            .then((filas: any[]) => {

                const favoritos: Favorito[] = [];

                if (!filas) {
                    return favoritos;
                }

                filas.forEach((fila: any) => {

                    /*
                     * nativescript-sqlite devuelve cada fila
                     * como un arreglo cuando no se solicita
                     * explícitamente el modo de objetos.
                     */
                    favoritos.push({
                        id: fila[0],
                        equipoId: fila[1],
                        codigo: fila[2],
                        nombre: fila[3],
                        area: fila[4],
                        estado: fila[5]
                    });
                });

                return favoritos;
            });
    }

    /*
     * Elimina un equipo de favoritos.
     */
    public eliminarFavorito(
        equipoId: number
    ): Promise<any> {

        return this.inicializarBaseDatos()
            .then((db: any) => {

                return db.execSQL(
                    "DELETE FROM favoritos WHERE equipoId = ?",
                    [equipoId]
                );
            });
    }

    /*
     * Permite saber si un equipo ya está
     * almacenado como favorito.
     */
    public esFavorito(
        equipoId: number
    ): Promise<boolean> {

        return this.inicializarBaseDatos()
            .then((db: any) => {

                return db.get(
                    "SELECT COUNT(*) FROM favoritos WHERE equipoId = ?",
                    [equipoId]
                );
            })
            .then((fila: any) => {

                if (!fila) {
                    return false;
                }

                return Number(fila[0]) > 0;
            });
    }
}