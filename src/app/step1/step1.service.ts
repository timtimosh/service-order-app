import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {ServiceType} from '../interface/serviceType';
import {ServiceTypeProduct} from '../interface/serviceTypeProduct';
import {ServiceTypeOption} from '../interface/serviceTypeOption';
import {ServiceTypeOptionValue} from '../interface/serviceTypeOptionValue';
import {ApiAbstractService} from '../api.abstract.service';

@Injectable()
export class Step1Service extends ApiAbstractService {

    getServices(): Promise<ServiceType[]> {
        const url = this.api_url + 'categories-services?';
        return this.getDataFromApi(url, [], this.getServicesFormat);
    }

    getServiceChildProducts(service: ServiceType): Promise<ServiceTypeProduct[]> {
        let url = this.api_url + 'service?';
        url += 'include=childs,price&id_category=' + service.id_category;
        const post_data = {};
        /*const post_data = {
            include: 'childs,price',
            id_category: service.id_category,
            attributes: {}
        };*/
        let i = 0;
        service.getOptions().forEach(service_type_option => {
            if (service_type_option.getValues().length > 0) {
                const temp_selected_option_type = service_type_option.getSelectedValue();
                url += '&attributes[' + i + '][id_attribute]=' + service_type_option.id_attribute;
                url += '&attributes[' + i + '][value]=' + temp_selected_option_type.id_attr_val;
                i++;
            }
        });
        return this.getDataFromApi(url, post_data, this.getServiceChildsFormat);
    }

    private getServiceChildsFormat(apiResponse): Array<ServiceTypeProduct> {
        // console.log(' api response: ');
        // console.log(apiResponse);
        const formatedResponse: ServiceTypeProduct[] = [];
        apiResponse.forEach(element => {
            const product = new ServiceTypeProduct(
                element.id_product,
                element.name,
                element.price
            );
            if (element.childs) {
                element.childs.forEach(child_product => {
                    const tempChildProduct = new ServiceTypeProduct(
                        /**
                         * простите/ все дело в апи/ оно возвращает лишний ключ product
                         */
                        child_product.product.id_product,
                        child_product.product.name
                    );
                    product.addChildProduct(tempChildProduct);
                });
            }
            formatedResponse.push(product);
        });
        return formatedResponse;
    }

    private getServicesFormat(apiResponse): ServiceType[] {
        const formatedResponse: ServiceType[] = [];
        apiResponse.forEach(element => {
            const tempService = new ServiceType(
                element.id_category,
                element.name,
            );
            if (element.options) {
                for (let i = 0, len = element.options.length; i < len; i++) {
                    const optionElement = element.options[i];
                    if (!optionElement) {
                        continue;
                    }
                    const tempServiceOption = new ServiceTypeOption(
                        optionElement.id_attribute,
                        optionElement.name
                    );
                    if (optionElement.values) {
                        optionElement.values.forEach(optionValueElement => {
                            const tempServiceOptionValue = new ServiceTypeOptionValue(
                                optionValueElement.id_attr_val,
                                optionValueElement.value
                            );
                            tempServiceOption.addValue(tempServiceOptionValue);
                        });
                    }
                    tempService.addOption(tempServiceOption);
                }
            }
            formatedResponse.push(tempService);
        });
        return formatedResponse;
    }
}
