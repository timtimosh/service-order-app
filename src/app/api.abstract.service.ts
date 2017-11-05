import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {StepTransporterService} from './step.transporter.service';
import {ApiError} from './interface/apiError';

@Injectable()
export abstract class ApiAbstractService {

    protected headers = new Headers({'Content-Type': 'application/json'});
    protected api_url = 'http://api-crm.ru/v1/web/';  // URL to web api

    constructor(protected stepTransporter: StepTransporterService, protected http: Http) {
    }

    protected getDataFromApi(url: string, post_data: any, callback_func = function (json_data) {
        return json_data;
    }) {
        //todo put it to config file
        url += '&access-token=any';
        const self = this;
        let query_to_api;
        const len = Object.keys(post_data).length;
        if (len > 0) {
            query_to_api = this.http.post(url, post_data, [this.headers]);
        } else {
            query_to_api = this.http.get(url);
        }
        return query_to_api.toPromise()
            .then(function (response) {
                    const reponse_decoded = response.json();
                    if (reponse_decoded.success) {
                        return callback_func(reponse_decoded.data);
                    } else {
                        return self.handleError(reponse_decoded.message);
                    }
                }
            )
            .catch(error => this.handleError(error.message || 'Ошибка при запросе, пожалуйста, повторите позже'));
    }

    protected handleError(message: string) {
        return this.stepTransporter.addError(new ApiError(message));
    }
}
