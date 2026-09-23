import { Injectable } from "@angular/core";

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
    observaciones: Observacion[];
}

@Injectable({
    providedIn: "root"
})
export class EquiposService {

    private equipos: Equipo[] = [
        {
            id: 1,
            codigo: "TR-001",
            nombre: "Transformador 5 MVA",
            area: "Subestacion",
            estado: "OPERATIVO",
            observaciones: [
                {
                    id: 1,
                    descripcion: "Temperatura dentro del rango normal",
                    usuario: "Operaciones",
                    estado: "NORMAL",
                    icono: "⚡",
                    votosPositivos: 3,
                    votosNegativos: 0
                },
                {
                    id: 2,
                    descripcion: "Inspeccion preventiva realizada",
                    usuario: "Mantenimiento",
                    estado: "OK",
                    icono: "🔧",
                    votosPositivos: 5,
                    votosNegativos: 0
                }
            ]
        },
        {
            id: 2,
            codigo: "GE-001",
            nombre: "Generador CAT 800 kW",
            area: "Planta Termica",
            estado: "OPERATIVO",
            observaciones: [
                {
                    id: 1,
                    descripcion: "Nivel de combustible verificado",
                    usuario: "Operaciones",
                    estado: "OK",
                    icono: "⚡",
                    votosPositivos: 2,
                    votosNegativos: 0
                }
            ]
        },
        {
            id: 3,
            codigo: "BM-001",
            nombre: "Bomba de Proceso",
            area: "Bombeo",
            estado: "MANTENIMIENTO",
            observaciones: [
                {
                    id: 1,
                    descripcion: "Revision de rodamientos pendiente",
                    usuario: "Mantenimiento",
                    estado: "REVISAR",
                    icono: "🔧",
                    votosPositivos: 1,
                    votosNegativos: 1
                }
            ]
        },
        {
            id: 4,
            codigo: "UPS-001",
            nombre: "UPS Sala Electrica",
            area: "Control",
            estado: "ALARMA",
            observaciones: [
                {
                    id: 1,
                    descripcion: "Autonomia de bateria reducida",
                    usuario: "Electricidad",
                    estado: "ALARMA",
                    icono: "⚠",
                    votosPositivos: 0,
                    votosNegativos: 3
                }
            ]
        }
    ];

    public getEquipos(): Equipo[] {
        return this.equipos;
    }

    public getEquipo(id: number): Equipo {
        return this.equipos.find(equipo => equipo.id === id);
    }
}