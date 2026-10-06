import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { EquiposRoutingModule } from "./equipos-routing.module";

import { ListaComponent } from "./lista/lista.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { EditarComponent } from "./editar/editar.component";
import { FavoritosComponent } from "./favoritos/favoritos.component";
import { MapaComponent } from "./mapa/mapa.component";

import { MinimoBusquedaDirective } from "./minimo-busqueda.directive";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        NativeScriptHttpClientModule,
        EquiposRoutingModule
    ],
    declarations: [
        ListaComponent,
        DetalleComponent,
        EditarComponent,
        FavoritosComponent,
        MapaComponent,
        MinimoBusquedaDirective
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class EquiposModule {}