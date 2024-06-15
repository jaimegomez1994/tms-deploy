/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArticulatedUnitTypeDto } from '../models/ArticulatedUnitTypeDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ArticulatedUnitTypeService {
    /**
     * @returns StateDto Success
     * @throws ApiError
     */
    public static articulatedUnitTypesGetList(): CancelablePromise<
        Array<ArticulatedUnitTypeDto>
    > {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/tipo-unidad-articulada?MaxResultCount=100'
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addArticulatedUnitType(
        requestBody?: any
    ): CancelablePromise<ArticulatedUnitTypeDto> {
        console.log('requestBody', requestBody);

        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/tipo-unidad-articulada',
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
    public static updateArticulatedUnitType(
        id: string,
        requestBody?: any
    ): CancelablePromise<ArticulatedUnitTypeDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/tipo-unidad-articulada/{id}',
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
    public static deleteArticulatedUnitType(
        id: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/tipo-unidad-articulada/{id}',
            path: {
                id: id
            }
        });
    }
}
