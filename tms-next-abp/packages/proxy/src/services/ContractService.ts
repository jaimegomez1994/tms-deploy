/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContractDto } from '../models/ContractDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ContractService {
    /**
     * @returns StateDto Success
     * @throws ApiError
     */
    public static contractsGetList(): CancelablePromise<Array<ContractDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/contrato?MaxResultCount=100'
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addContract(
        requestBody?: any
    ): CancelablePromise<ContractDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/contrato',
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
    public static updateContract(
        contratoid: string,
        requestBody?: any
    ): CancelablePromise<ContractDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/contrato?contratoid={contratoid}',
            path: {
                contratoid: contratoid
            },
            body: requestBody
        });
    }

    /**
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static deleteContract(id: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/contrato/{id}',
            path: {
                id: id
            }
        });
    }

    /**
     * @param contratoid
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addFeeToContract(
        contratoid?: string,
        requestBody?: any
    ): CancelablePromise<ContractDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/contrato/agregar-tarifa-aContrato?contratoid={contratoid}',
            path: {
                contratoid: contratoid
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
     * @param contratoid
     * @param paisId
     * @returns StateDto Success
     * @throws ApiError
     */
    public static updateFeePriceOfContract(
        contratoid?: string,
        requestBody?: any
    ): CancelablePromise<ContractDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/contrato/modificar-precio-tarifa-de-un-contrato?contratoid={contratoid}',
            path: {
                contratoid: contratoid
            },
            body: requestBody
        });
    }

    /**
     * @param contratoid
     * @returns StateDto Success
     * @throws ApiError
     */
    public static contractsGetFees(
        contratoid?: string
    ): CancelablePromise<Array<ContractDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/contrato/lista-de-tarifas-de-contrato?contratoid={contratoid}',
            path: {
                contratoid: contratoid
            }
        });
    }

    /**
     * @param tarifaid
     * @returns StateDto Success
     * @throws ApiError
     */
    public static contractsGetFeeHistory(
        tarifaid?: string
    ): CancelablePromise<Array<ContractDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/historial-precios-de-tarifa?tarifaid={tarifaid}',
            path: {
                tarifaid: tarifaid
            }
        });
    }

    /**
     * @param contratoid
     * @param tarifaid
     * @returns any Success
     * @throws ApiError
     */
    public static deleteFeeFromContract(
        contratoid?: string,
        tarifaid?: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/contrato/remover-tarifa-de-contrato?contratoid={contratoid}&tarifaid={tarifaid}',
            path: {
                contratoid: contratoid,
                tarifaid: tarifaid
            }
        });
    }
}
