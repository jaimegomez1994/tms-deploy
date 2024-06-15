/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentUnitDto } from '../models/DocumentUnitDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TrailerDocumentUnitService {
    /**
     * @returns StateDto Success
     * @throws ApiError
     */
    public static documentUnitsGetList(
        trailerId: string
    ): CancelablePromise<Array<DocumentUnitDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/remolque/documentos-de-remolque/{trailerId}',
            path: {
                trailerId: trailerId
            }
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addDocumentUnit(
        trailerId: string,
        requestBody?: any
    ): CancelablePromise<DocumentUnitDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/remolque/agregar-documento-aRemolque/{trailerId}',
            body: requestBody,
            path: {
                trailerId: trailerId
            },
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
     * @returns any Success
     * @throws ApiError
     */
    public static deleteDocumentUnit(
        docId: string,
        trailerId: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/remolque/borrar-documento-de-remolque?tractocamionId={trailerId}&doctoId={docId}',
            path: {
                trailerId: trailerId,
                docId: docId
            }
        });
    }
}
