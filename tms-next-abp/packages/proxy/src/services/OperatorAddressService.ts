/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressDto } from '../models/AddressDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OperatorAddressService {
    /**
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addressesGetList(
        operadorId: string
    ): CancelablePromise<Array<AddressDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/operador/obtener-domicilio-de-operador/{operadorId}',
            path: {
                operadorId: operadorId
            }
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addAddress(
        operatorId: string,
        requestBody?: any
    ): CancelablePromise<AddressDto> {
        console.log('requestBody', requestBody);

        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/operador/agregar-domicilio-aOperador/{operatorId}',
            body: requestBody,
            path: {
                operatorId: operatorId
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
     * @param paisId
     * @param displayName
     * @param postLogoutRedirectUris
     * @param redirectUris
     * @param permissions
     * @param type
     * @returns StateDto Success
     * @throws ApiError
     */
    public static updateAddress(
        id: string,
        requestBody?: any
    ): CancelablePromise<AddressDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/operador/{id}',
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
    public static deleteAddress(operadorId: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/operador/borrar-domicilio-de-operador/{operadorId}',
            path: {
                operadorId: operadorId
            }
        });
    }
}
