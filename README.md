# MineControl - NativeScript + Angular

Proyecto final desarrollado con NativeScript y Angular, basado en el template
`tns-template-drawer-navigation-ng` 6.5.4.

MineControl es una aplicación demostrativa para la gestión y visualización de
equipos eléctricos e industriales de una planta minera.

## Funcionalidades

La aplicación incorpora un nuevo módulo denominado **Equipos**, desde el cual
se puede visualizar una lista de equipos y acceder al detalle de cada uno.

Ejemplos incluidos:

- Transformador 5 MVA
- Generador CAT 800 kW
- Bomba de proceso
- UPS de sala eléctrica

## Requisitos del proyecto final

| # | Requisito | Implementación |
|---|-----------|----------------|
| 1 | Proyecto basado en Drawer Navigation | Basado en `tns-template-drawer-navigation-ng` 6.5.4 |
| 2 | Al menos dos componentes nuevos | `ListaComponent` y `DetalleComponent` |
| 3 | Nuevo módulo de funcionalidad | `EquiposModule` |
| 4 | Submódulo específico de routing | `EquiposRoutingModule` |
| 5 | Integración con SideDrawer | Opción `MineControl Equipos`, ruta `/equipos` |
| 6 | Servicio mediante Dependency Injection global | `EquiposService` con `providedIn: "root"` |
| 7 | Vista utilizando ngFor | `lista.component.html` utiliza `*ngFor` |
| 8 | CSS diferente Android/iOS | `lista.component.android.css` y `lista.component.ios.css` |
| 9 | Recurso personalizado en App_Resources | `minecontrol.png` para Android e iOS |
| 10 | Código TypeScript específico Android | `if (isAndroid)` en `ListaComponent` |

## Estructura del nuevo módulo

```text
src/app/equipos/
|
|-- equipos.module.ts
|-- equipos-routing.module.ts
|-- equipos.service.ts
|
|-- lista/
|   |-- lista.component.ts
|   |-- lista.component.html
|   |-- lista.component.css
|   |-- lista.component.android.css
|   `-- lista.component.ios.css
|
`-- detalle/
    |-- detalle.component.ts
    |-- detalle.component.html
    `-- detalle.component.css
