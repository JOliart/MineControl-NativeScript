import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ListaComponent } from "./lista/lista.component";
import { DetalleComponent } from "./detalle/detalle.component";

const routes: Routes = [
    {
        path: "",
        component: ListaComponent
    },
    {
        path: "detalle/:id",
        component: DetalleComponent
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
