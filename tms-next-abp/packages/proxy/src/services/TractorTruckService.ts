/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TractorTruckDto } from '../models/TractorTruckDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TractorTruckService {
    /**
     * @returns StateDto Success
     * @throws ApiError
     */
    public static tractorTrucksGetList(): CancelablePromise<
        Array<TractorTruckDto>
    > {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/tracto-camion?MaxResultCount=100'
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addTractorTruck(
        requestBody?: any
    ): CancelablePromise<TractorTruckDto> {
        console.log('requestBody', requestBody);

        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/tracto-camion',
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
    public static updateTractorTruck(
        id: string,
        requestBody?: any
    ): CancelablePromise<TractorTruckDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/tracto-camion/{id}',
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
    public static deleteTractorTruck(id: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/tracto-camion/{id}',
            path: {
                id: id
            }
        });
    }
}
