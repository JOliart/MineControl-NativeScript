import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { registerElement } from "nativescript-angular/element-registry";
import { PullToRefresh } from "nativescript-pulltorefresh";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

/*
 * Registro del plugin PullToRefresh.
 *
 * El cast a any es necesario por compatibilidad entre las
 * definiciones TypeScript del plugin legado y NativeScript Angular.
 */
registerElement("PullToRefresh", () => PullToRefresh as any);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }