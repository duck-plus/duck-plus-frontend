/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useFetchData } from '@/services/gqlFetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * GPS 좌표를 나타내는 스칼라 타입
   *
   *   { type: 'Point', coordinates: [ 127.0276 // longitude, 37.4979 // latitude ] }
   */
  Point: { input: any; output: any; }
};

export type Cafe = {
  __typename?: 'Cafe';
  address: CafeAddress;
  askingUrl: Scalars['String']['output'];
  /** ex.) #30평, 층고 3.3m 규모의 넓고 쾌적한 공간 */
  briefInfo: Scalars['String']['output'];
  businessHour: CafeBusinessHour;
  code: Scalars['ID']['output'];
  /** 컨셉 ex.) 힙한 무드, 우드톤 무드, 핑크 무드 ... */
  concept?: Maybe<Scalars['String']['output']>;
  detailedInfo: Scalars['String']['output'];
  /** 시설 안내 */
  facility?: Maybe<Scalars['String']['output']>;
  /** 카페 특색 ex.) 무료대관, 생카성지, 무료대관, 특전맛집, 대형카페 */
  featureList: Array<Maybe<Scalars['String']['output']>>;
  feeInfo: CafeFeeInfo;
  hashtag?: Maybe<Scalars['String']['output']>;
  imageFileList: Array<Maybe<ImageFile>>;
  /** 마감임박, 놓치면 한 달 이상 대기 */
  isPopular: Scalars['Boolean']['output'];
  /** 커스텀 특전 여부 */
  isSpecialBenefitCustomable: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  /** 지역 ex.) 홍대/합정, 강남/서초/삼성, 성수/건대, 영등포, 부산 */
  region: Scalars['String']['output'];
  /** 특이 사항 */
  remarkList?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** 카페 좌석 수 */
  seatCount?: Maybe<Scalars['Int']['output']>;
  /** 카페 SNS 정보 목록 */
  snsList: Array<Maybe<Sns>>;
  /** 특전 안내 */
  specialBenefit?: Maybe<Scalars['String']['output']>;
};

export type CafeAddress = {
  __typename?: 'CafeAddress';
  /** 도로명 주소 ex.) 서울 마포구 토정로 27 */
  briefAddress: Scalars['String']['output'];
  /** 상세주소 ex.) 13층 */
  detailedAddress: Scalars['String']['output'];
  /** GPS 정보 */
  location?: Maybe<Scalars['Point']['output']>;
  sigungu: Scalars['String']['output'];
};

export type CafeBusinessHour = {
  __typename?: 'CafeBusinessHour';
  /** 운영일 */
  businessDayList: Array<Maybe<Day>>;
  closingTime?: Maybe<Scalars['String']['output']>;
  openingTime?: Maybe<Scalars['String']['output']>;
  /** 공휴일 휴무 여부 */
  workingOnHoliday?: Maybe<Scalars['Boolean']['output']>;
};

export type CafeFeeInfo = {
  __typename?: 'CafeFeeInfo';
  /** 예약금 */
  bookingAmount: Scalars['Int']['output'];
  /** 일일 평균 대관료 */
  dailyCharge: Scalars['Int']['output'];
  /** 보증금 */
  depositAmount: Scalars['Int']['output'];
  /** 보증 인원 수 */
  guaranteeCount: Scalars['Int']['output'];
  /** 최소 예약 일수 */
  minPeriod: Scalars['Int']['output'];
  /** 추가 사항 ex.) 금토일은 최소 기간 2일/ 평일은 하루도 가능합니다. */
  note?: Maybe<Scalars['String']['output']>;
};

export type CafeQryArgs = {
  concept?: InputMaybe<Scalars['String']['input']>;
  feature?: InputMaybe<Scalars['String']['input']>;
  isPopular?: InputMaybe<Scalars['Boolean']['input']>;
  isSpecialBenefitCustomable?: InputMaybe<Scalars['Boolean']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
};

export type Day =
  | 'FRI'
  | 'MON'
  | 'SAT'
  | 'SUN'
  | 'THU'
  | 'TUE'
  | 'WED';

export type FileCategory =
  /** 카페 사진 */
  | 'LANDSCAPE'
  /** 메뉴 사진 */
  | 'MENU'
  /** 썸네일 */
  | 'THUMBNAIL';

export type ImageFile = {
  __typename?: 'ImageFile';
  category: FileCategory;
  filename: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  cafe?: Maybe<Cafe>;
  cafeList?: Maybe<Array<Maybe<Cafe>>>;
};


export type QuerycafeArgs = {
  code: Scalars['ID']['input'];
};


export type QuerycafeListArgs = {
  args?: InputMaybe<CafeQryArgs>;
};

export type Sns = {
  __typename?: 'Sns';
  channelName: Scalars['String']['output'];
  type: SnsType;
  url: Scalars['String']['output'];
};

export type SnsType =
  | 'INSTAGRAM'
  | 'KAKAO'
  | 'TWITTER';

export type GetCafeQueryVariables = Exact<{
  code: Scalars['ID']['input'];
}>;


export type GetCafeQuery = { __typename?: 'Query', cafe?: { __typename?: 'Cafe', code: string, name: string, briefInfo: string, detailedInfo: string, askingUrl: string, seatCount?: number | null, facility?: string | null, specialBenefit?: string | null, hashtag?: string | null, remarkList?: Array<string | null> | null, featureList: Array<string | null>, concept?: string | null, isSpecialBenefitCustomable: boolean, isPopular: boolean, region: string, imageFileList: Array<{ __typename?: 'ImageFile', url: string, filename: string, category: FileCategory } | null>, snsList: Array<{ __typename?: 'Sns', type: SnsType, channelName: string, url: string } | null>, businessHour: { __typename?: 'CafeBusinessHour', openingTime?: string | null, closingTime?: string | null, businessDayList: Array<Day | null>, workingOnHoliday?: boolean | null }, address: { __typename?: 'CafeAddress', sigungu: string, briefAddress: string, detailedAddress: string, location?: any | null }, feeInfo: { __typename?: 'CafeFeeInfo', minPeriod: number, dailyCharge: number, guaranteeCount: number, depositAmount: number, bookingAmount: number, note?: string | null } } | null };

export type GetCafeListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCafeListQuery = { __typename?: 'Query', cafeList?: Array<{ __typename?: 'Cafe', code: string, name: string, briefInfo: string, detailedInfo: string, askingUrl: string, seatCount?: number | null, facility?: string | null, specialBenefit?: string | null, hashtag?: string | null, remarkList?: Array<string | null> | null, featureList: Array<string | null>, concept?: string | null, isSpecialBenefitCustomable: boolean, isPopular: boolean, region: string, imageFileList: Array<{ __typename?: 'ImageFile', url: string, filename: string, category: FileCategory } | null>, snsList: Array<{ __typename?: 'Sns', type: SnsType, channelName: string, url: string } | null>, businessHour: { __typename?: 'CafeBusinessHour', openingTime?: string | null, closingTime?: string | null, businessDayList: Array<Day | null>, workingOnHoliday?: boolean | null }, address: { __typename?: 'CafeAddress', sigungu: string, briefAddress: string, detailedAddress: string, location?: any | null }, feeInfo: { __typename?: 'CafeFeeInfo', minPeriod: number, dailyCharge: number, guaranteeCount: number, depositAmount: number, bookingAmount: number, note?: string | null } } | null> | null };


export const GetCafeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCafe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cafe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"briefInfo"}},{"kind":"Field","name":{"kind":"Name","value":"detailedInfo"}},{"kind":"Field","name":{"kind":"Name","value":"imageFileList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}},{"kind":"Field","name":{"kind":"Name","value":"snsList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"channelName"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"askingUrl"}},{"kind":"Field","name":{"kind":"Name","value":"seatCount"}},{"kind":"Field","name":{"kind":"Name","value":"facility"}},{"kind":"Field","name":{"kind":"Name","value":"specialBenefit"}},{"kind":"Field","name":{"kind":"Name","value":"hashtag"}},{"kind":"Field","name":{"kind":"Name","value":"remarkList"}},{"kind":"Field","name":{"kind":"Name","value":"featureList"}},{"kind":"Field","name":{"kind":"Name","value":"concept"}},{"kind":"Field","name":{"kind":"Name","value":"isSpecialBenefitCustomable"}},{"kind":"Field","name":{"kind":"Name","value":"isPopular"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"businessHour"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"openingTime"}},{"kind":"Field","name":{"kind":"Name","value":"closingTime"}},{"kind":"Field","name":{"kind":"Name","value":"businessDayList"}},{"kind":"Field","name":{"kind":"Name","value":"workingOnHoliday"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sigungu"}},{"kind":"Field","name":{"kind":"Name","value":"briefAddress"}},{"kind":"Field","name":{"kind":"Name","value":"detailedAddress"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"Field","name":{"kind":"Name","value":"feeInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minPeriod"}},{"kind":"Field","name":{"kind":"Name","value":"dailyCharge"}},{"kind":"Field","name":{"kind":"Name","value":"guaranteeCount"}},{"kind":"Field","name":{"kind":"Name","value":"depositAmount"}},{"kind":"Field","name":{"kind":"Name","value":"bookingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]}}]}}]} as unknown as DocumentNode<GetCafeQuery, GetCafeQueryVariables>;
export const GetCafeListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCafeList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cafeList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"briefInfo"}},{"kind":"Field","name":{"kind":"Name","value":"detailedInfo"}},{"kind":"Field","name":{"kind":"Name","value":"imageFileList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}},{"kind":"Field","name":{"kind":"Name","value":"snsList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"channelName"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"askingUrl"}},{"kind":"Field","name":{"kind":"Name","value":"seatCount"}},{"kind":"Field","name":{"kind":"Name","value":"facility"}},{"kind":"Field","name":{"kind":"Name","value":"specialBenefit"}},{"kind":"Field","name":{"kind":"Name","value":"hashtag"}},{"kind":"Field","name":{"kind":"Name","value":"remarkList"}},{"kind":"Field","name":{"kind":"Name","value":"featureList"}},{"kind":"Field","name":{"kind":"Name","value":"concept"}},{"kind":"Field","name":{"kind":"Name","value":"isSpecialBenefitCustomable"}},{"kind":"Field","name":{"kind":"Name","value":"isPopular"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"businessHour"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"openingTime"}},{"kind":"Field","name":{"kind":"Name","value":"closingTime"}},{"kind":"Field","name":{"kind":"Name","value":"businessDayList"}},{"kind":"Field","name":{"kind":"Name","value":"workingOnHoliday"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sigungu"}},{"kind":"Field","name":{"kind":"Name","value":"briefAddress"}},{"kind":"Field","name":{"kind":"Name","value":"detailedAddress"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"Field","name":{"kind":"Name","value":"feeInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minPeriod"}},{"kind":"Field","name":{"kind":"Name","value":"dailyCharge"}},{"kind":"Field","name":{"kind":"Name","value":"guaranteeCount"}},{"kind":"Field","name":{"kind":"Name","value":"depositAmount"}},{"kind":"Field","name":{"kind":"Name","value":"bookingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]}}]}}]} as unknown as DocumentNode<GetCafeListQuery, GetCafeListQueryVariables>;
export const DAY = ['FRI', 'MON', 'SAT', 'SUN', 'THU', 'TUE', 'WED'] as const;
export const FILE_CATEGORY = ['LANDSCAPE', 'MENU', 'THUMBNAIL'] as const;
export const SNS_TYPE = ['INSTAGRAM', 'KAKAO', 'TWITTER'] as const;

export const GetCafeQueryString = `
    query GetCafe($code: ID!) {
  cafe(code: $code) {
    code
    name
    briefInfo
    detailedInfo
    imageFileList {
      url
      filename
      category
    }
    snsList {
      type
      channelName
      url
    }
    askingUrl
    seatCount
    facility
    specialBenefit
    hashtag
    remarkList
    featureList
    concept
    isSpecialBenefitCustomable
    isPopular
    region
    businessHour {
      openingTime
      closingTime
      businessDayList
      workingOnHoliday
    }
    address {
      sigungu
      briefAddress
      detailedAddress
      location
    }
    feeInfo {
      minPeriod
      dailyCharge
      guaranteeCount
      depositAmount
      bookingAmount
      note
    }
  }
}
    `;
export const useGetCafeQuery = <
      TData = GetCafeQuery,
      TError = unknown
    >(
      variables: GetCafeQueryVariables,
      options?: UseQueryOptions<GetCafeQuery, TError, TData>
    ) =>
    useQuery<GetCafeQuery, TError, TData>(
      ['GetCafe', variables],
      useFetchData<GetCafeQuery, GetCafeQueryVariables>(GetCafeQueryString).bind(null, variables),
      options
    );

useGetCafeQuery.getKey = (variables: GetCafeQueryVariables) => ['GetCafe', variables];
;

export const useInfiniteGetCafeQuery = <
      TData = GetCafeQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetCafeQueryVariables,
      variables: GetCafeQueryVariables,
      options?: UseInfiniteQueryOptions<GetCafeQuery, TError, TData>
    ) =>{
    const query = useFetchData<GetCafeQuery, GetCafeQueryVariables>(GetCafeQueryString)
    return useInfiniteQuery<GetCafeQuery, TError, TData>(
      ['GetCafe.infinite', variables],
      (metaData) => query({...variables, ...(metaData.pageParam ?? {})}),
      options
    )};


useInfiniteGetCafeQuery.getKey = (variables: GetCafeQueryVariables) => ['GetCafe.infinite', variables];
;

export const GetCafeListQueryString = `
    query GetCafeList {
  cafeList {
    code
    name
    briefInfo
    detailedInfo
    imageFileList {
      url
      filename
      category
    }
    snsList {
      type
      channelName
      url
    }
    askingUrl
    seatCount
    facility
    specialBenefit
    hashtag
    remarkList
    featureList
    concept
    isSpecialBenefitCustomable
    isPopular
    region
    businessHour {
      openingTime
      closingTime
      businessDayList
      workingOnHoliday
    }
    address {
      sigungu
      briefAddress
      detailedAddress
      location
    }
    feeInfo {
      minPeriod
      dailyCharge
      guaranteeCount
      depositAmount
      bookingAmount
      note
    }
  }
}
    `;
export const useGetCafeListQuery = <
      TData = GetCafeListQuery,
      TError = unknown
    >(
      variables?: GetCafeListQueryVariables,
      options?: UseQueryOptions<GetCafeListQuery, TError, TData>
    ) =>
    useQuery<GetCafeListQuery, TError, TData>(
      variables === undefined ? ['GetCafeList'] : ['GetCafeList', variables],
      useFetchData<GetCafeListQuery, GetCafeListQueryVariables>(GetCafeListQueryString).bind(null, variables),
      options
    );

useGetCafeListQuery.getKey = (variables?: GetCafeListQueryVariables) => variables === undefined ? ['GetCafeList'] : ['GetCafeList', variables];
;

export const useInfiniteGetCafeListQuery = <
      TData = GetCafeListQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetCafeListQueryVariables,
      variables?: GetCafeListQueryVariables,
      options?: UseInfiniteQueryOptions<GetCafeListQuery, TError, TData>
    ) =>{
    const query = useFetchData<GetCafeListQuery, GetCafeListQueryVariables>(GetCafeListQueryString)
    return useInfiniteQuery<GetCafeListQuery, TError, TData>(
      variables === undefined ? ['GetCafeList.infinite'] : ['GetCafeList.infinite', variables],
      (metaData) => query({...variables, ...(metaData.pageParam ?? {})}),
      options
    )};


useInfiniteGetCafeListQuery.getKey = (variables?: GetCafeListQueryVariables) => variables === undefined ? ['GetCafeList.infinite'] : ['GetCafeList.infinite', variables];
;
