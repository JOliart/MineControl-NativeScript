import { createFeatureSelector, createSelector } from "@ngrx/store";

import {
    MineControlState,
    EquipoLectura
} from "./minecontrol.reducer";

/*
 * Nombre con el que registraremos este feature
 * dentro del Store global.
 *
 * Debe coincidir con StoreModule.forRoot()
 * o StoreModule.forFeature().
 */
export const MINECONTROL_FEATURE_KEY =
    "mineControl";

/*
 * Selecciona el estado completo correspondiente
 * al feature MineControl.
 */
export const selectMineControlState =
    createFeatureSelector<MineControlState>(
        MINECONTROL_FEATURE_KEY
    );

/*
 * Selector utilizado por la pantalla principal.
 *
 * Cada vez que el Reducer modifique leerAhora,
 * los componentes suscritos a este selector
 * recibirán automáticamente el nuevo arreglo.
 */
export const selectLeerAhora =
    createSelector(
        selectMineControlState,
        (
            state: MineControlState
        ): EquipoLectura[] => {

            if (!state) {
                return [];
            }

            return state.leerAhora;
        }
    );

/*
 * Selector que devuelve la cantidad de equipos
 * seleccionados para LEER AHORA.
 */
export const selectCantidadLeerAhora =
    createSelector(
        selectLeerAhora,
        (
            equipos: EquipoLectura[]
        ): number => {

            return equipos.length;
        }
    );