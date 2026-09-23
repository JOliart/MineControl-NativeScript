import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { EquiposRoutingModule } from "./equipos-routing.module";
import { ListaComponent } from "./lista/lista.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { MinimoBusquedaDirective } from "./minimo-busqueda.directive";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        EquiposRoutingModule
    ],
    declarations: [
        ListaComponent,
        DetalleComponent,
        MinimoBusquedaDirective
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EquiposModule {}