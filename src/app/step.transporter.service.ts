import {Injectable} from '@angular/core';
import {ServiceContainer} from './interface/serviceContainer';
import {User} from './interface/user';
import {Order} from './interface/order';
import {ApiError} from './interface/apiError';


@Injectable()
export class StepTransporterService {
    service_container: ServiceContainer = null;
    user_info: User = new User();
    order: Order = null;
    private errors: Array<ApiError> = [];

    isStep2ButtonDisabled() {
        if (this.service_container && this.service_container.getChosen().getChosenProduct()) {
            return false;
        }
        return true;
    }

    isStep3ButtonDisabled(): boolean {
        if (this.isStep2ButtonDisabled() === false) {
            const chosen_product = this.service_container.getChosen().getChosenProduct();
            if (chosen_product.getChosenTsc() && chosen_product.getChosenTsc().getEnroll()) {
                return false;
            }
        }
        return true;
    }

    addError(error: ApiError) {
        this.errors.push(error);
        return error;
    }

    removeError(index: number) {
        delete this.errors[index];
        this.errors = this.errors.filter(Boolean);
    }

    getErrors() {
        return this.errors;
    }
}
