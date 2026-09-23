import { Directive } from "@angular/core";
import {
    AbstractControl,
    NG_VALIDATORS,
    ValidationErrors,
    Validator
} from "@angular/forms";

@Directive({
    selector: "[minimoBusqueda]",
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: MinimoBusquedaDirective,
            multi: true
        }
    ]
})
export class MinimoBusquedaDirective implements Validator {

    public validate(control: AbstractControl): ValidationErrors | null {

        const valor = control.value;

        // Se permite vacío para poder limpiar el buscador.
        if (!valor) {
            return null;
        }

        // La búsqueda debe contener al menos 2 caracteres.
        if (valor.toString().trim().length < 2) {
            return {
                minimoBusqueda: true
            };
        }

        return null;
    }
}