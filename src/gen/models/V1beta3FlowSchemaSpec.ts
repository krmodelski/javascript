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

import { V1beta3FlowDistinguisherMethod } from '../models/V1beta3FlowDistinguisherMethod.js';
import { V1beta3PolicyRulesWithSubjects } from '../models/V1beta3PolicyRulesWithSubjects.js';
import { V1beta3PriorityLevelConfigurationReference } from '../models/V1beta3PriorityLevelConfigurationReference.js';
import { HttpFile } from '../http/http.js';

/**
* FlowSchemaSpec describes how the FlowSchema\'s specification looks like.
*/
export class V1beta3FlowSchemaSpec {
    'distinguisherMethod'?: V1beta3FlowDistinguisherMethod;
    /**
    * `matchingPrecedence` is used to choose among the FlowSchemas that match a given request. The chosen FlowSchema is among those with the numerically lowest (which we take to be logically highest) MatchingPrecedence.  Each MatchingPrecedence value must be ranged in [1,10000]. Note that if the precedence is not specified, it will be set to 1000 as default.
    */
    'matchingPrecedence'?: number;
    'priorityLevelConfiguration': V1beta3PriorityLevelConfigurationReference;
    /**
    * `rules` describes which requests will match this flow schema. This FlowSchema matches a request if and only if at least one member of rules matches the request. if it is an empty slice, there will be no requests matching the FlowSchema.
    */
    'rules'?: Array<V1beta3PolicyRulesWithSubjects>;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "distinguisherMethod",
            "baseName": "distinguisherMethod",
            "type": "V1beta3FlowDistinguisherMethod",
            "format": ""
        },
        {
            "name": "matchingPrecedence",
            "baseName": "matchingPrecedence",
            "type": "number",
            "format": "int32"
        },
        {
            "name": "priorityLevelConfiguration",
            "baseName": "priorityLevelConfiguration",
            "type": "V1beta3PriorityLevelConfigurationReference",
            "format": ""
        },
        {
            "name": "rules",
            "baseName": "rules",
            "type": "Array<V1beta3PolicyRulesWithSubjects>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1beta3FlowSchemaSpec.attributeTypeMap;
    }

    public constructor() {
    }
}
