import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { registerElement } from "nativescript-angular/element-registry";
import { PullToRefresh } from "nativescript-pulltorefresh";

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