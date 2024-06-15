/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyDto } from '../models/CompanyDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CompanyService {
    /**
     * @returns StateDto Success
     * @throws ApiError
     */
    public static companiesGetList(): CancelablePromise<Array<CompanyDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/empresa?MaxResultCount=100'
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addCompany(requestBody?: any): CancelablePromise<CompanyDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/empresa',
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
    public static updateCompany(
        id: string,
        requestBody?: any
    ): CancelablePromise<CompanyDto> {
        console.log('requestBody', requestBody);

        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/empresa/{id}',
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
    public static deleteCompany(id: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/empresa/{id}',
            path: {
                id: id
            }
        });
    }
}
