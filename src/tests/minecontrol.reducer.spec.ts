import {
    LeerAhora,
    QuitarLectura
} from "../app/store/minecontrol.actions";

import {
    mineControlReducer,
    initialState,
    MineControlState
} from "../app/store/minecontrol.reducer";

describe("MineControl Actions y Reducer", () => {

    /*
     * Datos de prueba utilizados
     * durante los tests.
     */
    const equipoPrueba = {
        equipoId: 1,
        codigo: "EQ-001",
        nombre: "Bomba de proceso",
        area: "Planta",
        estado: "Operativo"
    };


    describe("Actions", () => {

        it("debe crear la action LeerAhora correctamente", () => {

            const action =
                new LeerAhora(equipoPrueba);

            expect(action.payload)
                .toEqual(equipoPrueba);

            expect(action.type)
                .toEqual("[MineControl] Leer Ahora");
        });


        it("debe crear la action QuitarLectura correctamente", () => {

            const action =
                new QuitarLectura(1);

            expect(action.payload)
                .toEqual(1);

            expect(action.type)
                .toEqual("[MineControl] Quitar Lectura");
        });

    });


    describe("Reducer", () => {

        it("debe devolver el estado inicial", () => {

            const estado =
                mineControlReducer(
                    undefined,
                    {} as any
                );

            expect(estado)
                .toEqual(initialState);

            expect(estado.leerAhora.length)
                .toEqual(0);
        });


        it("debe agregar un equipo con LeerAhora", () => {

            const action =
                new LeerAhora(equipoPrueba);

            const estado =
                mineControlReducer(
                    initialState,
                    action
                );

            expect(estado.leerAhora.length)
                .toEqual(1);

            expect(estado.leerAhora[0])
                .toEqual(equipoPrueba);
        });


        it("no debe agregar dos veces el mismo equipo", () => {

            const action =
                new LeerAhora(equipoPrueba);

            const primerEstado =
                mineControlReducer(
                    initialState,
                    action
                );

            const segundoEstado =
                mineControlReducer(
                    primerEstado,
                    action
                );

            expect(segundoEstado.leerAhora.length)
                .toEqual(1);

            expect(segundoEstado)
                .toBe(primerEstado);
        });


        it("debe quitar un equipo con QuitarLectura", () => {

            const estadoConEquipo: MineControlState = {
                leerAhora: [
                    equipoPrueba
                ]
            };

            const action =
                new QuitarLectura(
                    equipoPrueba.equipoId
                );

            const estado =
                mineControlReducer(
                    estadoConEquipo,
                    action
                );

            expect(estado.leerAhora.length)
                .toEqual(0);
        });


        it("debe mantener el estado ante una action desconocida", () => {

            const estado =
                mineControlReducer(
                    initialState,
                    {} as any
                );

            expect(estado)
                .toBe(initialState);
        });

    });

});