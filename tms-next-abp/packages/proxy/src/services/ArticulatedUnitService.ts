/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArticulatedUnitDto } from '../models/ArticulatedUnitDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ArticulatedUnitService {
    /**
     * @returns StateDto Success
     * @throws ApiError
     */
    public static articulatedUnitsGetList(): CancelablePromise<
        Array<ArticulatedUnitDto>
    > {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/unidad-articulada?MaxResultCount=100'
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addArticulatedUnit(
        requestBody?: any
    ): CancelablePromise<ArticulatedUnitDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/unidad-articulada',
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
    public static updateArticulatedUnit(
        uaid: string,
        requestBody?: any
    ): CancelablePromise<ArticulatedUnitDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/unidad-articulada?uaid={uaid}',
            path: {
                uaid: uaid
            },
            body: requestBody
        });
    }

    /**
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static deleteArticulatedUnit(id: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/unidad-articulada/{id}',
            path: {
                id: id
            }
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addTrailerToArticulatedUnit(
        uaid?: any,
        remolqueid?: any
    ): CancelablePromise<ArticulatedUnitDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/unidad-articulada/agregar-remolque-aUnidad-articulada?uaid={uaid}&remolqueid={remolqueid}',
            path: {
                uaid: uaid,
                remolqueid: remolqueid
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
    public static deleteTrailerFromArticulatedUnit(
        uaid?: any,
        remolqueid?: any
    ): CancelablePromise<ArticulatedUnitDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/unidad-articulada/remover-remolque-de-unidad-articulada?uaid={uaid}&remolqueid={remolqueid}',
            path: {
                uaid: uaid,
                remolqueid: remolqueid
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
    public static getTrailerFromArticulatedUnit(
        uaid?: any
    ): CancelablePromise<ArticulatedUnitDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/unidad-articulada/lista-de-remolques-de-unidad-articulada?uaid={uaid}',
            path: {
                uaid: uaid
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

    //Accesories
    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addAccessoryToArticulatedUnit(
        uaid?: any,
        accesorioid?: any
    ): CancelablePromise<ArticulatedUnitDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/unidad-articulada/agregar-accesorio-aUnidad-articulada?uaid={uaid}&accesorioid={accesorioid}',
            path: {
                uaid: uaid,
                accesorioid: accesorioid
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
    public static deleteAccessoryFromArticulatedUnit(
        uaid?: any,
        accesorioid?: any
    ): CancelablePromise<ArticulatedUnitDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/unidad-articulada/remover-accesorio-de-unidad-articulada?uaid={uaid}&accesorioid={accesorioid}',
            path: {
                uaid: uaid,
                accesorioid: accesorioid
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
    public static getAccessoryFromArticulatedUnit(
        uaid?: any
    ): CancelablePromise<ArticulatedUnitDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/unidad-articulada/lista-de-accesorios-de-unidad-articulada?uaid={uaid}',
            path: {
                uaid: uaid
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
