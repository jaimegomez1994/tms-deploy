/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TrailerTypeDto } from '../models/TrailerTypeDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TrailerTypeService {
    /**
     * @returns StateDto Success
     * @throws ApiError
     */
    public static trailerTypesGetList(): CancelablePromise<
        Array<TrailerTypeDto>
    > {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/tipo-remolque?MaxResultCount=100'
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addTrailerType(
        requestBody?: any
    ): CancelablePromise<TrailerTypeDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/tipo-remolque',
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
    public static updateTrailerType(
        id: string,
        requestBody?: any
    ): CancelablePromise<TrailerTypeDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/tipo-remolque/{id}',
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
    public static deleteTrailerType(id: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/tipo-remolque/{id}',
            path: {
                id: id
            }
        });
    }
}
