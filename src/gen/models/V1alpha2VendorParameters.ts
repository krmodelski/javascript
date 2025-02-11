/**
 * Kubernetes
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: v1.30.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { HttpFile } from '../http/http.js';

/**
* VendorParameters are opaque parameters for one particular driver.
*/
export class V1alpha2VendorParameters {
    /**
    * DriverName is the name used by the DRA driver kubelet plugin.
    */
    'driverName'?: string;
    /**
    * Parameters can be arbitrary setup parameters. They are ignored while allocating a claim.
    */
    'parameters'?: any;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "driverName",
            "baseName": "driverName",
            "type": "string",
            "format": ""
        },
        {
            "name": "parameters",
            "baseName": "parameters",
            "type": "any",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1alpha2VendorParameters.attributeTypeMap;
    }

    public constructor() {
    }
}
