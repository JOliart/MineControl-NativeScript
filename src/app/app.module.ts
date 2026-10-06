import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { registerElement } from "nativescript-angular/element-registry";

import { PullToRefresh } from "@nstudio/nativescript-pulltorefresh";

import { StoreModule } from "@ngrx/store";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import {
    mineControlReducer
} from "./store/minecontrol.reducer";

/*
 * Registro del plugin PullToRefresh.
 */
registerElement(
    "PullToRefresh",
    () => PullToRefresh as any
);

@NgModule({
    bootstrap: [
        AppComponent
    ],

    imports: [
        AppRoutingModule,
        NativeScriptModule,

        /*
         * Habilita HttpClient a nivel global.
         *
         * Es necesario para los servicios que
         * consumen el WebService de MineControl.
         */
        NativeScriptHttpClientModule,

        NativeScriptUISideDrawerModule,

        /*
         * Store global de NgRx.
         *
         * El feature "mineControl" contiene
         * los equipos seleccionados mediante
         * la accion LEER AHORA.
         */
        StoreModule.forRoot({
            mineControl: mineControlReducer
        })
    ],

    declarations: [
        AppComponent
    ],

    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {}