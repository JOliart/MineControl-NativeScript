import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { EquiposRoutingModule } from "./equipos-routing.module";
import { ListaComponent } from "./lista/lista.component";
import { DetalleComponent } from "./detalle/detalle.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EquiposRoutingModule
    ],
    declarations: [
        ListaComponent,
        DetalleComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EquiposModule {}
