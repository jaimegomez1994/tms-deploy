/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OperatorDto } from '../models/OperatorDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OperatorService {
    /**
     * @returns StateDto Success
     * @throws ApiError
     */
    public static operatorsGetList(): CancelablePromise<Array<OperatorDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/operador?MaxResultCount=100'
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addOperator(
        requestBody?: any
    ): CancelablePromise<OperatorDto> {
        console.log('requestBody', requestBody);

        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/operador',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`
            }
        });
    }

    /**
     * @param id
     * @param paisId
     * @param displayName
     * @param postLogoutRedirectUris
     * @param redirectUris
     * @param permissions
     * @param type
     * @returns StateDto Success
     * @throws ApiError
     */
    public static updateOperator(
        id: string,
        requestBody?: any
    ): CancelablePromise<OperatorDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/operador/{id}',
            path: {
                id: id
            },
            body: requestBody
        });
    }

    /**
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static deleteOperator(id: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/operador/{id}',
            path: {
                id: id
            }
        });
    }
}
