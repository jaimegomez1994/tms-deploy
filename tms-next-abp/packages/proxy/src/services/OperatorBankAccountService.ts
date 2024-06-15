/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BankAccountDto } from '../models/BankAccountDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OperatorBankAccountService {
    /**
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static bankAccountGetList(
        operadorId: string
    ): CancelablePromise<Array<BankAccountDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/operador/obtener-cuenta-bancaria-de-operador/{operadorId}',
            path: {
                operadorId: operadorId
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
        operadorId: string,
        requestBody?: any
    ): CancelablePromise<BankAccountDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/operador/agregar-cuenta-bancaria-aOperador/{operadorId}',
            path: {
                operadorId: operadorId
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
     * @returns any Success
     * @throws ApiError
     */
    public static deleteBankAccount(
        operadorId: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/operador/borrar-cuenta-bancaria-de-operador/{operadorId}',
            path: {
                operadorId: operadorId
            }
        });
    }
}
