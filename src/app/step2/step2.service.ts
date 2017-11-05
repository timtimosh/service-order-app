import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {ServiceTypeProduct} from '../interface/serviceTypeProduct';
import {ApiAbstractService} from '../api.abstract.service';
import {Tsc} from '../interface/tsc';
import {TscTime} from '../interface/tscTime';
import {ServiceType} from '../interface/serviceType';

@Injectable()
export class Step2Service extends ApiAbstractService {

    /**
     *
     * @param {ServiceTypeProduct} product
     * @param {string} date: 2017-08-17
     * @returns {Promise<Tsc[]>}
     */
    getAvailableTscByParams(service: ServiceType, product: ServiceTypeProduct, date: string = ''): Promise<Tsc[]> {
        if (date === '') {
            const datePipe = new DatePipe('en-US');
            date = datePipe.transform(new Date(), 'yyyy-MM-dd');
        }
        let url = this.api_url + 'tsc-calendar?';
        url += 'id_product=' + product.id_product;
        url += '&begin_date=' + date;
        let i = 0;
        service.getOptions().forEach(service_type_option => {
            const temp_selected_option_type = service_type_option.getSelectedValue();
            url += '&attributes[' + i + '][id_attribute]=' + service_type_option.id_attribute;
            url += '&attributes[' + i + '][value]=' + temp_selected_option_type.id_attr_val;
            i++;
        });
        return this.getDataFromApi(url, [], this.tscFormat);
    }

    tscFormat(apiResponse): Array<Tsc> {
        const formatedResponse: Tsc[] = [];
        apiResponse.forEach(tsc => {
            const new_tsc = new Tsc(
                tsc.id_tsc,
                tsc.lat,
                tsc.lng,
                tsc.name,
                tsc.phone,
                ''
            );
            const new_tsc_time: any[] = [];
            tsc.calendar.forEach(begin_time => {
                new_tsc.addTime(
                    new TscTime(
                        begin_time.time_begin.date,
                        begin_time.available,
                        begin_time.time_begin.timezone_type,
                        begin_time.time_begin.timezone)
                );
            });
            new_tsc.setPrice(tsc.price);
            formatedResponse.push(new_tsc);
        });
        return formatedResponse;
    }
}
