import { AbstractControl, ValidationErrors } from "@angular/forms";

export function atLeastFiveChars(ctrl: AbstractControl) {
    // check if null value return null 
    if (ctrl.value == null || ctrl.value.trim().length >= 5)
        return null

    return { atLeastFiveChars: true } as ValidationErrors
}

export function lessThanToday(ctrl: AbstractControl) {
    let today: Date = new Date();

    if (new Date(ctrl.value) < today)
        return { lessThanToday: true } as ValidationErrors

    return null
} 