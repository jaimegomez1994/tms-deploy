/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BankAccountDto } from '../models/BankAccountDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BankAccountService {
    /**
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static bankAccountGetList(
        id: string
    ): CancelablePromise<Array<BankAccountDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/empresa/cuentas-bancarias-de-empresa/{id}',
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
    public static addBankAccount(
        id: string,
        requestBody?: any
    ): CancelablePromise<BankAccountDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/empresa/agregar-cuenta-bancaria-aEmpresa/{id}',
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
    public static updateBankAccount(
        empresaId: string,
        cuentaId: string,
        requestBody?: any
    ): CancelablePromise<BankAccountDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/empresa/editar-cuenta-bancaria-aEmpresa?empresaId={empresaId}&cuentaId={cuentaId}',
            path: {
                empresaId: empresaId,
                cuentaId: cuentaId
            },
            body: requestBody
        });
    }

    /**
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static deleteBankAccount(
        empresaId: string,
        cuentaId: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/empresa/borrar-cuenta-bancaria-de-empresa?empresaId={empresaId}&cuentaId={cuentaId}',
            path: {
                empresaId: empresaId,
                cuentaId: cuentaId
            }
        });
    }
}
