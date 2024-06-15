/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CountryDto } from '../models/CountryDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CountryService {
    /**
     * @returns CountryDto Success
     * @throws ApiError
     */
    public static countryGetList(): CancelablePromise<Array<CountryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/paises'
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns CountryDto Success
     * @throws ApiError
     */
    public static addCountry(requestBody?: any): CancelablePromise<CountryDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/paises',
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
     * @returns CountryDto Success
     * @throws ApiError
     */
    public static countryUpdate(
        id: string,
        name?: string
    ): CancelablePromise<CountryDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/paises/{id}',
            path: {
                id: id
            },
            body: {
                nombre: name
            }
        });
    }

    /**
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static deleteCountry(id: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/paises/{id}',
            path: {
                id: id
            }
        });
    }
}
