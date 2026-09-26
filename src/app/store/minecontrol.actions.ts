import { Action } from "@ngrx/store";

/*
 * Acciones disponibles en el Store de MineControl.
 */
export enum MineControlActionTypes {

    LEER_AHORA =
        "[MineControl] Leer Ahora",

    QUITAR_LECTURA =
        "[MineControl] Quitar Lectura"
}

/*
 * Acción disparada desde la pantalla Favoritos
 * cuando el usuario pulsa LEER AHORA.
 */
export class LeerAhora implements Action {

    readonly type =
        MineControlActionTypes.LEER_AHORA;

    constructor(
        public payload: {
            equipoId: number;
            codigo: string;
            nombre: string;
            area: string;
            estado: string;
        }
    ) {}
}

/*
 * Acción opcional para retirar un equipo
 * del listado Leer Ahora.
 */
export class QuitarLectura implements Action {

    readonly type =
        MineControlActionTypes.QUITAR_LECTURA;

    constructor(
        public payload: number
    ) {}
}

/*
 * Unión de todas las acciones que podrá
 * procesar el Reducer de MineControl.
 */
export type MineControlActions =
    LeerAhora |
    QuitarLectura;