// this import should be first in order to load some required settings
// (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import * as firebase from "nativescript-plugin-firebase";

import { AppModule } from "./app/app.module";

firebase.init({
    onPushTokenReceivedCallback: (_token: string) => {
        console.log("Token FCM recibido correctamente");
    },

    onMessageReceivedCallback: (message: firebase.Message) => {
        console.log("====================================");
        console.log("NOTIFICACION FIREBASE RECIBIDA");
        console.log(message);
        console.log("====================================");
    },

    showNotifications: true,
    showNotificationsWhenInForeground: true
}).then(
    () => {
        console.log("Firebase inicializado correctamente");
    },
    (error: any) => {
        console.log("Error al inicializar Firebase:");
        console.log(error);
    }
);

platformNativeScriptDynamic().bootstrapModule(AppModule);