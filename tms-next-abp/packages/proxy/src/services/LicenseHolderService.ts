/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LicenseHolderDto } from '../models/LicenseHolderDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LicenseHolderService {
    /**
     * @returns StateDto Success
     * @throws ApiError
     */
    public static licenseHoldersGetList(): CancelablePromise<
        Array<LicenseHolderDto>
    > {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/permisionario?MaxResultCount=100'
        });
    }

    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addLicenseHolder(
        requestBody?: any
    ): CancelablePromise<LicenseHolderDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/permisionario',
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
    public static updateLicenseHolder(
        permisionarioid: string,
        requestBody?: any
    ): CancelablePromise<LicenseHolderDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/app/permisionario?permisionarioid={permisionarioid}',
            path: {
                permisionarioid: permisionarioid
            },
            body: requestBody
        });
    }

    /**
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static deleteLicenseHolder(id: string): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/permisionario/{id}',
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
    public static addArticulatedUnitToLicenseHolder(
        permisionarioid?: any,
        uaid?: any
    ): CancelablePromise<LicenseHolderDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/permisionario/agregar-unidad-articulada-aPermisionario?permisionarioid={permisionarioid}&uaid={uaid}',
            path: {
                permisionarioid: permisionarioid,
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

    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static getArticulatedUnitFromLicenseHolder(
        permisionarioid?: any
    ): CancelablePromise<LicenseHolderDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/permisionario/unidad-articulada-de-permisionario?permisionarioid={permisionarioid}',
            path: {
                permisionarioid: permisionarioid
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
    public static deleteArticulatedUnitFromLicenseHolder(
        permisionarioid?: any,
        uaid?: any
    ): CancelablePromise<LicenseHolderDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/permisionario/remover-unidad-articulada-de-permisionario?permisionarioid={permisionarioid}&uaid={uaid}',
            path: {
                permisionarioid: permisionarioid,
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

    // /**
    //  * @param id
    //  * @param redirectUri
    //  * @returns StateDto Success
    //  * @throws ApiError
    //  */
    // public static deleteArticulatedUnitFromLicenseHolder(
    //     uaid?: any,
    //     remolqueid?: any
    // ): CancelablePromise<LicenseHolderDto> {
    //     return __request(OpenAPI, {
    //         method: 'DELETE',
    //         url: '/api/app/permisionario/remover-unidad-articulada-de-permisionario?permisionarioid={permisionarioid}&uaid={uaid}',
    //         path: {
    //             uaid: uaid,
    //             remolqueid: remolqueid
    //         },
    //         mediaType: 'application/json',
    //         errors: {
    //             400: `Bad Request`,
    //             401: `Unauthorized`,
    //             403: `Forbidden`,
    //             404: `Not Found`,
    //             500: `Server Error`,
    //             501: `Server Error`
    //         }
    //     });
    // }

    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addContactToLicenseHolder(
        permisionarioid?: any,
        requestBody?: any
    ): CancelablePromise<LicenseHolderDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/permisionario/agregar-contacto-aPermisionario?permisionarioid={permisionarioid}',
            path: {
                permisionarioid: permisionarioid
            },
            mediaType: 'application/json',
            body: requestBody,
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
    public static getContactsFromLicenseHolder(
        permisionarioid?: any
    ): CancelablePromise<LicenseHolderDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/permisionario/contactos-de-permisionario?permisionarioid={permisionarioid}',
            path: {
                permisionarioid: permisionarioid
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
    public static deleteContactsFromLicenseHolder(
        permisionarioid?: any,
        contactoid?: any
    ): CancelablePromise<LicenseHolderDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/permisionario/remover-contacto-de-permisionario?permisionarioid={permisionarioid}&contactoid={contactoid}',
            path: {
                permisionarioid: permisionarioid,
                contactoid: contactoid
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
    //end
    /**
     * @param id
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static addBankAccountToLicenseHolder(
        permisionarioid?: any,
        requestBody?: any
    ): CancelablePromise<LicenseHolderDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/permisionario/agregar-cuenta-bancaria-aPermisionario?permisionarioid={permisionarioid}',
            path: {
                permisionarioid: permisionarioid
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
     * @param redirectUri
     * @returns StateDto Success
     * @throws ApiError
     */
    public static getBankAccountFromLicenseHolder(
        permisionarioid?: any
    ): CancelablePromise<LicenseHolderDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/permisionario/cuentas-bancarias-de-permisionario?permisionarioid={permisionarioid}',
            path: {
                permisionarioid: permisionarioid
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
    public static deleteBankAccountFromLicenseHolder(
        permisionarioid?: any,
        cuentaid?: any
    ): CancelablePromise<LicenseHolderDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/permisionario/remover-cuenta-bancaria-de-permisionario?permisionarioid={permisionarioid}&cuentaid={cuentaid}',
            path: {
                permisionarioid: permisionarioid,
                cuentaid: cuentaid
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
    //end
}
