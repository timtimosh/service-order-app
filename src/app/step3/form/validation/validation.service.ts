/**
 * copy past from here
 * https://coryrylan.com/blog/angular-form-builder-and-validation-management
 */
export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        const config = {
            'required': 'Поле обязательно для заполнения',
            'invalidEmailAddress': 'Неправильный формат email',
            'invalidPhone': 'Неправильный формат. Номер телефона должен содержать 11 цифр',
            'invalidName': 'Неправильный формат имени. Минимум 3 символов',
            'minlength': `Минимальная длина ${validatorValue.requiredLength}`
        };

        return config[validatorName];
    }

    static nameValidator(control) {
        if (control.value.length < 3) {
            return {'invalidName': true};
        }
        return null;
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return {'invalidEmailAddress': true};
        }
    }

    static phoneValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (!control.value) {
            return {'invalidPhone': true};
        }
        if (control.value.length < 17) {
            return {'invalidPhone': true};
        }
        const numbers_count = control.value.replace(/[^0-9]/g, '').length;
        if (numbers_count < 11) {
            return {'invalidPhone': true};
        }
        return null;
    }
}
