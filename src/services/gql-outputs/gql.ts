/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query GetCafeList {\n  cafeList {\n    code\n    name\n    briefInfo\n    detailedInfo\n    imageFileList {\n      url\n      filename\n      category\n    }\n    snsList {\n      type\n      channelName\n      url\n    }\n    askingUrl\n    seatCount\n    facility\n    specialBenefit\n    hashtag\n    remarkList\n    featureList\n    concept\n    isSpecialBenefitCustomable\n    isPopular\n    region\n    businessHour {\n      openingTime\n      closingTime\n      businessDayList\n      workingOnHoliday\n    }\n    address {\n      sigungu\n      briefAddress\n      detailedAddress\n      location\n    }\n    feeInfo {\n      minPeriod\n      dailyCharge\n      guaranteeCount\n      depositAmount\n      bookingAmount\n      note\n    }\n  }\n}": types.GetCafeListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCafeList {\n  cafeList {\n    code\n    name\n    briefInfo\n    detailedInfo\n    imageFileList {\n      url\n      filename\n      category\n    }\n    snsList {\n      type\n      channelName\n      url\n    }\n    askingUrl\n    seatCount\n    facility\n    specialBenefit\n    hashtag\n    remarkList\n    featureList\n    concept\n    isSpecialBenefitCustomable\n    isPopular\n    region\n    businessHour {\n      openingTime\n      closingTime\n      businessDayList\n      workingOnHoliday\n    }\n    address {\n      sigungu\n      briefAddress\n      detailedAddress\n      location\n    }\n    feeInfo {\n      minPeriod\n      dailyCharge\n      guaranteeCount\n      depositAmount\n      bookingAmount\n      note\n    }\n  }\n}"): (typeof documents)["query GetCafeList {\n  cafeList {\n    code\n    name\n    briefInfo\n    detailedInfo\n    imageFileList {\n      url\n      filename\n      category\n    }\n    snsList {\n      type\n      channelName\n      url\n    }\n    askingUrl\n    seatCount\n    facility\n    specialBenefit\n    hashtag\n    remarkList\n    featureList\n    concept\n    isSpecialBenefitCustomable\n    isPopular\n    region\n    businessHour {\n      openingTime\n      closingTime\n      businessDayList\n      workingOnHoliday\n    }\n    address {\n      sigungu\n      briefAddress\n      detailedAddress\n      location\n    }\n    feeInfo {\n      minPeriod\n      dailyCharge\n      guaranteeCount\n      depositAmount\n      bookingAmount\n      note\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;