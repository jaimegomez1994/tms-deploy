/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientDto } from '../models/ClientDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClientService {
    /**
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static clientGetList(): CancelablePromise<Array<ClientDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/clientes'
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static addClient(requestBody?: any): CancelablePromise<ClientDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/clientes',
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
    public static updateClient(
        id: string,
        requestBody?: any
    ): CancelablePromise<ClientDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/clientes/{id}',
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
    public static deleteClient(id: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/clientes/{id}',
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
    public static clientAddRedirectUri(
        id: string,
        redirectUri?: string
    ): CancelablePromise<ClientDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/client-management/add-redirect-uri/{id}',
            path: {
                id: id
            },
            query: {
                redirectUri: redirectUri
            }
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static clientAddPostLogoutRedirectUri(
        id: string,
        redirectUri?: string
    ): CancelablePromise<ClientDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/client-management/add-post-logout-redirect-uri/{id}',
            path: {
                id: id
            },
            query: {
                redirectUri: redirectUri
            }
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addContractToClients(
        clienteid?: any,
        contratoid?: any
    ): CancelablePromise<ClientDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/clientes/agregar-contrato-aCliente?clienteid={clienteid}&contratoid={contratoid}',
            path: {
                clienteid: clienteid,
                contratoid: contratoid
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
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static deleteContractFromClients(
        clienteid?: any,
        contratoid?: any
    ): CancelablePromise<ClientDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/clientes/remover-contrato-de-cliente?clienteid={clienteid}&contratoid={contratoid}',
            path: {
                clienteid: clienteid,
                contratoid: contratoid
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
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static getContractFromClients(
        clienteid?: any
    ): CancelablePromise<ClientDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/clientes/lista-de-contratos-de-cliente?clienteid={clienteid}',
            path: {
                clienteid: clienteid
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
}
