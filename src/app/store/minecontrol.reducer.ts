import {
    MineControlActions,
    MineControlActionTypes
} from "./minecontrol.actions";

/*
 * Elemento almacenado en el Store cuando
 * el usuario selecciona LEER AHORA.
 */
export interface EquipoLectura {
    equipoId: number;
    codigo: string;
    nombre: string;
    area: string;
    estado: string;
}

/*
 * Estado correspondiente al feature
 * MineControl.
 */
export interface MineControlState {
    leerAhora: EquipoLectura[];
}

/*
 * Estado inicial.
 *
 * Redux/NgRx trabaja con estados inmutables.
 */
export const initialState: MineControlState = {
    leerAhora: []
};

/*
 * Reducer de MineControl.
 *
 * Recibe el estado actual y una Action,
 * y devuelve un NUEVO estado.
 */
export function mineControlReducer(
    state: MineControlState = initialState,
    action: MineControlActions
): MineControlState {

    switch (action.type) {

        case MineControlActionTypes.LEER_AHORA:

            /*
             * Evitamos agregar dos veces
             * el mismo equipo.
             */
            const existe =
                state.leerAhora.some(
                    equipo =>
                        equipo.equipoId ===
                        action.payload.equipoId
                );

            if (existe) {
                return state;
            }

            /*
             * No modificamos directamente el arreglo.
             * Creamos uno nuevo para mantener
             * la inmutabilidad del Store.
             */
            return {
                ...state,
                leerAhora: [
                    ...state.leerAhora,
                    action.payload
                ]
            };


        case MineControlActionTypes.QUITAR_LECTURA:

            return {
                ...state,
                leerAhora:
                    state.leerAhora.filter(
                        equipo =>
                            equipo.equipoId !==
                            action.payload
                    )
            };


        default:

            return state;
    }
}