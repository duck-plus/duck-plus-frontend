import type {
  Day,
  GetCafeCurationsQuery,
  GetCafeListQuery,
  GetCafeQuery,
  GetMainCafeBannerQuery,
  SnsType,
} from '@/services/gql-outputs/graphql';
import { faker } from '@faker-js/faker';

import {
  generateCafeDescription,
  generateRandomBreifAddress,
  generateRandomCafeName,
  generateRandomDetailedAddress,
  generateRandomLocation,
  generateRandomSigungu,
} from './generator';

faker.seed(2012147551);

export interface IMockQueryOptions {
  enabled?: boolean;
}

interface ISNS {
  __typename: 'Sns';
  type: SnsType;
  channelName: string;
  url: string;
}

const cafeCount = 100;
const lengthObject = { length: cafeCount };
const cafeCodes = Array.from(lengthObject).map(() => faker.database.mongodbObjectId());

const concepts = ['모던', '아기자기', '코지', '내추럴'] as const;
const featureList = ['생카성지', '무료대관', '특전맛집'] as const;
const specialBenefitList = [
  '포토 컵홀더 제작 및 제공',
  '생일 기념 포토카드 세트',
  '커스텀 브랜딩 텀블러 또는 머그컵',
  '생일 축하 케이크 조각 무료 제공',
  '직접 구워낸 미니 브레드 또는 쿠키',
  '포토존 설치 및 개인 사진 촬영 서비스',
  '특별 제작 스티커 세트',
  '이벤트 한정 랜덤 포토카드 뽑기',
  '팬아트 전시 및 기념 엽서 제공',
  '생일 파티 한정 키링 또는 핀뱃지',
  '기념 로고와 이름이 들어간 에코백',
  '커스텀 브랜딩 음료 컵슬리브',
  '생일 테마 한정 음료 레시피 제공',
  '기념 촛불 세팅이 가능한 디저트 플레이트',
  '이벤트 참여자 명단에 이름 새기기',
  '생일 축하 동영상 메시지 상영',
  '공유 가능한 인스타그램 AR 필터 제작',
  '한정판 폴라로이드 즉석 사진 촬영',
  '생일 축하 메시지를 담은 컬러풍선 장식',
  '기념일 테마를 담은 배경음악 플레이리스트',
];

function hasValue<T>(x: T | null | undefined | false): x is T {
  return x !== undefined && x !== null;
}

function generateSNSList(): ISNS[] {
  const snsKakao: ISNS = {
    __typename: 'Sns',
    type: 'KAKAO',
    channelName: faker.internet.username(),
    url: faker.internet.url(),
  };
  const snsInstagram: ISNS = {
    __typename: 'Sns',
    type: 'INSTAGRAM',
    channelName: faker.internet.username(),
    url: faker.internet.url(),
  };
  const snsTwitter: ISNS = {
    __typename: 'Sns',
    type: 'TWITTER',
    channelName: faker.internet.username(),
    url: faker.internet.url(),
  };
  return [
    faker.datatype.boolean() && snsKakao,
    faker.datatype.boolean() && snsInstagram,
    faker.datatype.boolean() && snsTwitter,
  ].filter(hasValue);
}

function generateBusinessDayList(): Array<Day | null> {
  const days: Day[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  return days.map(day => (faker.datatype.boolean() ? day : null));
}

export const mockCafeDataList: GetCafeQuery[] = Array.from(cafeCodes, code => {
  const sigungu = generateRandomSigungu();

  const briefAddress = generateRandomBreifAddress();

  const detailedAddress = generateRandomDetailedAddress();

  const location = generateRandomLocation();

  const cafeDescription = generateCafeDescription();

  const mockData: GetCafeQuery = {
    __typename: 'Query',
    cafe: {
      address: {
        __typename: 'CafeAddress',
        briefAddress: briefAddress,
        detailedAddress: detailedAddress,
        location: location,
        sigungu: sigungu,
      },
      askingUrl: '',
      briefInfo: cafeDescription.breifInfo,
      businessHour: {
        __typename: undefined,
        businessDayList: generateBusinessDayList(),
        closingTime: undefined,
        openingTime: undefined,
        workingOnHoliday: faker.datatype.boolean(),
      },
      code,
      concept:
        concepts[
          faker.number.int({
            min: 0,
            max: 3,
          })
        ],
      detailedInfo: cafeDescription.description,
      featureList: featureList.filter(() => faker.datatype.boolean()),
      feeInfo: {
        __typename: 'CafeFeeInfo',
        bookingAmount: faker.number.int({
          min: 0,
          max: 10,
        }),
        dailyCharge: faker.number.int({
          min: 10000,
          max: 50000,
        }),
        depositAmount: faker.number.int({
          min: 10000,
          max: 50000,
        }),
        guaranteeCount: faker.number.int({
          min: 0,
          max: 10,
        }),
        minPeriod: faker.number.int({
          min: 0,
          max: 100,
        }),
        note: undefined,
      },
      imageFileList: Array.from(
        {
          length: faker.number.int({ min: 3, max: 10 }),
        },
        () => ({
          __typename: 'ImageFile',
          url: faker.image.urlPicsumPhotos({
            blur: 0,
            height: 600,
            width: 800,
          }),
          filename: faker.system.fileName(),
          category: 'LANDSCAPE',
        })
      ),
      isPopular: faker.datatype.boolean(),
      isSpecialBenefitCustomable: faker.datatype.boolean(),
      name: generateRandomCafeName(),
      region: sigungu,
      seatCount: faker.number.int({ min: 10, max: 100 }),
      specialBenefit: faker.helpers
        .arrayElements(specialBenefitList, { min: 0, max: 3 })
        .join('\n'),
      snsList: generateSNSList(),
    },
  };
  return mockData;
});

export const mockCafeListData: GetCafeListQuery = {
  __typename: 'Query',
  cafeList: mockCafeDataList
    .map(({ cafe }) => cafe)
    .filter(hasValue)
    .map(cafe => ({
      __typename: 'Cafe',
      address: cafe.address,
      askingUrl: cafe.askingUrl,
      briefInfo: cafe.briefInfo,
      businessHour: cafe.businessHour,
      code: cafe.code,
      concept: cafe.concept,
      detailedInfo: cafe.detailedInfo,
      facility: cafe.facility,
      featureList: cafe.featureList,
      feeInfo: cafe.feeInfo,
      hashtag: cafe.hashtag,
      imageFileList: cafe.imageFileList,
      isPopular: cafe.isPopular,
      isSpecialBenefitCustomable: cafe.isSpecialBenefitCustomable,
      name: cafe.name,
      region: cafe.region,
      remarkList: cafe.remarkList,
      seatCount: cafe.seatCount,
      snsList: cafe.snsList,
      specialBenefit: cafe.specialBenefit,
    })),
};

export const mockMainCafeBannerData: GetMainCafeBannerQuery = {
  __typename: 'Query',
  imageFileList: faker.helpers
    .arrayElements(mockCafeDataList.map(({ cafe }) => cafe).filter(hasValue), 4)
    .map(cafe => ({
      __typename: 'ImageFile',
      cafeCode: cafe.code,
      category: 'BANNER',
      filename: faker.system.fileName(),
      url: faker.image.urlPicsumPhotos({
        blur: 0,
        height: 800,
        width: 600,
      }),
    })),
};

export const mockCafeCurationsData: GetCafeCurationsQuery = {
  __typename: 'Query',
  cafeList: mockCafeListData.cafeList?.filter(() => faker.datatype.boolean()),
};
