/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RouteDto } from '../models/RouteDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RouteService {
    /**
     * @returns RouteDto Success
     * @throws ApiError
     */
    public static routesGetList(): CancelablePromise<Array<RouteDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/ruta?MaxResultCount=100'
        });
    }

    /**
     * @param requestBody
     * @returns RouteDto Success
     * @throws ApiError
     */
    public static addRoute(requestBody?: any): CancelablePromise<RouteDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/ruta',
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
     * @param rutaid
     * @param requestBody
     * @returns RouteDto Success
     * @throws ApiError
     */
    public static updateRoute(
        rutaid: string,
        requestBody?: any
    ): CancelablePromise<RouteDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/ruta?rutaid={rutaid}',
            path: {
                rutaid: rutaid
            },
            body: requestBody
        });
    }

    /**
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static deleteRoute(id: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/ruta/{id}',
            path: {
                id: id
            }
        });
    }

    /**
     * @param rutaid
     * @param requestBody
     * @returns RouteDto Success
     * @throws ApiError
     */
    public static addCostToRoute(
        rutaid?: string,
        requestBody?: any
    ): CancelablePromise<RouteDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/ruta/agregar-ruta-costo-aRuta?rutaid={rutaid}',
            body: requestBody,
            path: {
                rutaid:rutaid
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
     * @param rutaid
     * @param requestBody
     * @returns RouteDto Success
     * @throws ApiError
     */
    public static updateCostOfRoute(
        rutaid?: string,
        requestBody?: any
    ): CancelablePromise<RouteDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/ruta/modificar-ruta-costo-de-una-ruta?rutaid={rutaid}',
            path: {
                rutaid: rutaid
            },
            body: requestBody
        });
    }

    /**
     * @param rutaid
     * @returns RouteDto Success
     * @throws ApiError
     */
    public static routesGetCosts(rutaid?:string): CancelablePromise<Array<RouteDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            path: {
                rutaid:rutaid
            },
            url: '/api/app/ruta/lista-de-ruta-costos-de-ruta?rutaid={rutaid}'
        });
    }

    /**
     * @param rutacostoid
     * @returns RouteDto Success
     * @throws ApiError
     */
    public static routesGetHistoryCosts(rutacostoid?:string): CancelablePromise<Array<RouteDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            path: {
                rutacostoid:rutacostoid
            },
            url: '/api/app/ruta/historial-ruta-costo-de-ruta-costo?rutacostoid={rutacostoid}'
        });
    }

    /**
     * @param rutaid
     * @param rutacostoid
     * @returns any Success
     * @throws ApiError
     */
    public static deleteRouteCost(
        rutaid?: string,
        rutacostoid?: string
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/ruta/remover-ruta-costo-de-ruta?rutaid={rutaid}&rutacostoid={rutacostoid}',
            path: {
                rutaid: rutaid,
                rutacostoid: rutacostoid
            }
        });
    }
}
