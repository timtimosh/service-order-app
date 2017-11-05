import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {ApiAbstractService} from '../api.abstract.service';
import {StepTransporterService} from '../step.transporter.service';
import {Order} from '../interface/order';

@Injectable()
export class Step3Service extends ApiAbstractService {

    sendOrder() {
        const service = this.stepTransporter.service_container.getChosen();
        const product = service.getChosenProduct();
        const userinfo = this.stepTransporter.user_info;
        const url = this.api_url + 'order?';
        const post_data = new Object();
        post_data['id_category'] = service.id_category;
        post_data['id_tsc'] = product.getChosenTsc().id_tsc;
        post_data['details'] = userinfo.comment;
        post_data['total'] = product.getChosenTsc().price;
        post_data['email'] = userinfo.email;
        post_data['name'] = userinfo.name;
        post_data['phone'] = userinfo.phone;
        post_data['products'] = {};
        post_data['products'][0] = {};
        post_data['products'][0]['id_product'] = product.id_product;
        post_data['products'][0]['total'] = product.price;
        post_data['products'][0]['attributes'] = {};
        let i = 0;
        this.stepTransporter.service_container.getChosen().getOptions().forEach(service_type_option => {
            if (service_type_option.getValues().length > 0) {
                const temp_selected_option_type = service_type_option.getSelectedValue();
                const temp_attr = {};
                temp_attr['id_attribute'] = service_type_option.id_attribute;
                temp_attr['value'] = temp_selected_option_type.id_attr_val;
                post_data['products'][0]['attributes'][i] = temp_attr;
                i++;
            }
        });
        post_data['time'] = product.getChosenTsc().getEnroll().getDate();
        return this.getDataFromApi(url, post_data);

    }
}
