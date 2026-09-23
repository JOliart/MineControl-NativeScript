import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ListaComponent } from "./lista/lista.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { EditarComponent } from "./editar/editar.component";
import { FavoritosComponent } from "./favoritos/favoritos.component";

const routes: Routes = [
    {
        path: "",
        component: ListaComponent
    },
    {
        path: "favoritos",
        component: FavoritosComponent
    },
    {
        path: "detalle/:id",
        component: DetalleComponent
    },
    {
        path: "editar/:id",
        component: EditarComponent
    }
];

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(routes)
    ],
    exports: [
        NativeScriptRouterModule
    ]
})
export class EquiposRoutingModule {}