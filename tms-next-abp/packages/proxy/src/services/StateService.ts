/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StateDto } from '../models/StateDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StateService {
    /**
     * @returns StateDto Success
     * @throws ApiError
     */
    public static statesGetList(): CancelablePromise<Array<StateDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/estados?MaxResultCount=100'
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addState(requestBody?: any): CancelablePromise<StateDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/estados',
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
    public static updateState(
        id: string,
        countryName?: string,
        stateName?: string
    ): CancelablePromise<StateDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/estados/{id}',
            path: {
                id: id
            },
            body: {
                nombre: stateName,
                pais: countryName
            }
        });
    }

    /**
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static deleteState(id: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/estados/{id}',
            path: {
                id: id
            }
        });
    }
}
