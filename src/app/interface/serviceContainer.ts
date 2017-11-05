import {ServiceType} from './serviceType';
import {Step1Service} from '../step1/step1.service';
import {ApiError} from './apiError';

export class ServiceContainer {
    private services: Array<ServiceType> = [];
    private chosen_service: ServiceType = null;

    constructor(private api: Step1Service) {
        this.getServicesFromApi();
    }

    getServices(): Array<ServiceType> {
        return this.services;
    }

    getChosen(): ServiceType | null {
        return this.chosen_service;
    }

    setChosen(new_active_service: ServiceType): void {
        const current_chosen = this.getChosen();
        if (current_chosen) {
            current_chosen.setSelectedByUser(false);
        }
        const mark_this_element_as_active = this.getServices().filter(service => service.id_category === new_active_service.id_category)[0];
        mark_this_element_as_active.setSelectedByUser(true);
        this.attachChildProductsToService(mark_this_element_as_active);
        this.chosen_service = new_active_service;
    }

    updateProducts(service: ServiceType): void {
        this.attachChildProductsToService(service);
    }

    private getServicesFromApi() {
        const self = this;
        this.api.getServices()
            .then(
                function (response) {
                    if (response instanceof ApiError) {
                        return;
                    }
                    response.forEach(service => {
                        self.addService(service);
                    });
                    self.setDefaultService();
                }
            );
    }

    /**
     * api не отдает продукты вместе с категориями. придется вытянуть их дополнительно еще одним запросом при выборе сервиса
     * @param {Step1Service} api_service
     */
    private attachChildProductsToService(service: ServiceType) {
        this.api.getServiceChildProducts(service).then(
            function (products) {
                if (products instanceof ApiError) {
                    return;
                }
                service.removeAllProducts();
                products.forEach(product => {
                    service.addProduct(product);
                });
            }
        );
    }

    private addService(service: ServiceType) {
        this.services.push(service);
    }

    private setDefaultService() {
        if (this.getServices().length > 0) {
            this.setChosen(this.getServices()[0]);
        }
    }
}
