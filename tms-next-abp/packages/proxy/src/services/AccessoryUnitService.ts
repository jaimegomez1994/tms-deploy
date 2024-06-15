/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccessoryUnitDto } from '../models/AccessoryUnitDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AccessoryUnitService {
    /**
     * @returns StateDto Success
     * @throws ApiError
     */
    public static accessoryUnitsGetList(): CancelablePromise<
        Array<AccessoryUnitDto>
    > {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/unidad-accesorio?MaxResultCount=100'
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addAccessoryUnit(
        requestBody?: any
    ): CancelablePromise<AccessoryUnitDto> {
        console.log('requestBody', requestBody);

        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/unidad-accesorio',
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
    public static updateAccessoryUnit(
        id: string,
        requestBody?: any
    ): CancelablePromise<AccessoryUnitDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/unidad-accesorio/{id}',
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
    public static deleteAccessoryUnit(id: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/unidad-accesorio/{id}',
            path: {
                id: id
            }
        });
    }
}
