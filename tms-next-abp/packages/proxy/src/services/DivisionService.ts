/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DivisionDto } from '../models/DivisionDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DivisionService {
    /**
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static divisionGetList(
        id: string
    ): CancelablePromise<Array<DivisionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/empresa/divisiones-de-empresa/{id}',
            path: {
                id: id
            }
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static addDivision(
        id: string,
        requestBody?: any
    ): CancelablePromise<DivisionDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/empresa/agregar-division-aEmpresa/{id}',
            path: {
                id: id
            },
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
     * @param requestBody
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static updateDivision(
        id: string,
        requestBody?: any
    ): CancelablePromise<DivisionDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/empresa/{id}/agregar-division-aEmpresa',
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
    public static deleteDivision(
        empresaId: string,
        divisionId: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/empresa/borrar-division-de-empresa?empresaId={empresaId}&divisionId={divisionId}',
            path: {
                empresaId: empresaId,
                divisionId: divisionId
            }
        });
    }
}
