/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductDto } from '../models/ProductDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductService {
    /**
     * @returns ProductDto Success
     * @throws ApiError
     */
    public static productsGetList(): CancelablePromise<Array<ProductDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/producto?MaxResultCount=100'
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns ProductDto Success
     * @throws ApiError
     */
    public static addProduct(requestBody?: any): CancelablePromise<ProductDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/producto',
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
     * @returns ProductDto Success
     * @throws ApiError
     */
    public static updateProduct(
        id: string,
        name?: string,
        clave?: string,
        tipoDeProducto?: number | null,
        precioUnitario?: number,
        moneda?: number,
        tipoDeUnidad?: number,
        peligroso?: number,
        normaAplicable?: string
    ): CancelablePromise<ProductDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/producto/{id}',
            path: {
                id: id
            },
            body: {
                nombre: name,
                clave: clave,
                tipoProducto: tipoDeProducto,
                precioUnitario: precioUnitario,
                moneda: moneda,
                tipoDeUnidad: tipoDeUnidad,
                peligroso: peligroso,
                normaAplicable: normaAplicable
            }
        });
    }

    /**
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static deleteProduct(id: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/producto/{id}',
            path: {
                id: id
            }
        });
    }
}
