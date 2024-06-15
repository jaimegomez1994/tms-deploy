/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentUnitDto } from '../models/DocumentUnitDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TractorTruckDocumentUnitService {
    /**
     * @returns StateDto Success
     * @throws ApiError
     */
    public static documentUnitsGetList(
        tractorTruckId: string
    ): CancelablePromise<Array<DocumentUnitDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/tracto-camion/documentos-de-tractocamion/{tractorTruckId}',
            path: {
                tractorTruckId: tractorTruckId
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
        tractorTruckId: string,
        requestBody?: any
    ): CancelablePromise<DocumentUnitDto> {
        console.log('requestBody', requestBody);

        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/tracto-camion/agregar-documento-aTracto-camion/{tractorTruckId}',
            body: requestBody,
            path: {
                tractorTruckId: tractorTruckId
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
        tractorTruckId: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/tracto-camion/borrar-documento-de-tractocamion?tractocamionId={tractorTruckId}&doctoId={docId}',
            path: {
                tractorTruckId: tractorTruckId,
                docId: docId
            }
        });
    }
}
