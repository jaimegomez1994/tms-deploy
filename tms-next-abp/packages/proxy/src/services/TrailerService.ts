/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TrailerDto } from '../models/TrailerDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TrailerService {
    /**
     * @returns StateDto Success
     * @throws ApiError
     */
    public static trailersGetList(): CancelablePromise<Array<TrailerDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/remolque?MaxResultCount=100'
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addTrailer(requestBody?: any): CancelablePromise<TrailerDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/remolque',
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
    public static updateTrailer(
        id: string,
        requestBody?: any
    ): CancelablePromise<TrailerDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/remolque/{id}',
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
    public static deleteTrailer(id: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/remolque/{id}',
            path: {
                id: id
            }
        });
    }
}
