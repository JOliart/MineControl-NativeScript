import { Injectable } from "@angular/core";

export interface Equipo {
    id: number;
    codigo: string;
    nombre: string;
    area: string;
    estado: string;
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
            estado: "OPERATIVO"
        },
        {
            id: 2,
            codigo: "GE-001",
            nombre: "Generador CAT 800 kW",
            area: "Planta Termica",
            estado: "OPERATIVO"
        },
        {
            id: 3,
            codigo: "BM-001",
            nombre: "Bomba de Proceso",
            area: "Bombeo",
            estado: "MANTENIMIENTO"
        },
        {
            id: 4,
            codigo: "UPS-001",
            nombre: "UPS Sala Electrica",
            area: "Control",
            estado: "ALARMA"
        }
    ];

    public getEquipos(): Equipo[] {
        return this.equipos;
    }

    public getEquipo(id: number): Equipo {
        return this.equipos.find(equipo => equipo.id === id);
    }
}
