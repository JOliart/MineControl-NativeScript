import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { EquiposRoutingModule } from "./equipos-routing.module";
import { ListaComponent } from "./lista/lista.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { EditarComponent } from "./editar/editar.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        EquiposRoutingModule
    ],
    declarations: [
        ListaComponent,
        DetalleComponent,
        EditarComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EquiposModule {}