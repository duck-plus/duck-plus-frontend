import { faker } from '@faker-js/faker';

const sigunguList = [
  '서울특별시 강남구',
  '서울특별시 성동구',
  '서울특별시 송파구',
  '서울특별시 용산구',
  '부산광역시 동구',
  '부산광역시 해운대구',
  '인천광역시 부평구',
  '대전광역시 유성구',
  '울산광역시 중구',
  '경기도 가평군',
  '경기도 고양시',
  '경기도 김포시',
  '경기도 포천시',
  '충청북도 괴산군',
  '전라남도 나주시',
  '경상남도 고성군',
  '제주도 제주시',
  '제주도 서귀포시',
] as const;

const cafeNameList = [
  '별다방',
  '달콤한 하루',
  '커피앤드림',
  '비밀의 정원',
  '모모의 카페',
  '창밖의 풍경',
  '오후의 나른함',
  '레트로 카페',
  '빈티지 무드',
  '소소한 행복',
  '구름 속 휴식',
  '아침의 시작',
  '밤의 향기',
  '테라스 커피',
  '달빛 정원',
  '바람을 마시다',
  '너와 나의 시간',
  '카페 포레스트',
  '루프탑 모먼트',
  '카페 1987',
  '감성 충전소',
  '파스텔 카페',
  '한잔의 여유',
  '그림 같은 풍경',
  '나른한 오후',
  '별빛 카페',
  '꽃과 커피',
  '온기 가득',
  '미드나잇 라떼',
  '블루문 카페',
  '안녕, 커피',
  '너구리 카페',
  '산들바람 커피',
  '달콤한 기억',
  '도란도란 카페',
  '소나기와 커피',
  '비 오는 날',
  '카페 수채화',
  '구름 카페',
  '사랑의 향기',
  '그림자 카페',
  '포근한 공간',
  '흑백 필름',
  '숲속 쉼터',
  '에델바이스 커피',
  '바닐라 구름',
  '고양이와 커피',
  '피크닉 카페',
  '달려라 커피',
  '여행자의 쉼터',
  '타임리스 카페',
  '봄날의 커피',
  '작은 불빛',
  '멜로디 커피',
  '그날의 카페',
  '달이 머무는 곳',
  '겨울의 온기',
  '소금과 설탕',
  '호숫가의 여유',
  '행복한 우체통',
  '초록빛 아침',
  '햇살 한 스푼',
  '느리게 걷는 시간',
  '너와 나의 정원',
  '리틀 비앙카',
  '문라이트 브루',
  '비오는 날의 커피',
  '몽환 카페',
  '카페 낙원',
  '휴식의 온도',
  '꿈꾸는 마을',
  '토요일 아침',
  '별빛 도시',
  '여름의 노래',
  '초코 라떼',
  '숨겨진 이야기',
  '아메리카노 한 잔',
  '새벽의 창문',
  '까페 코코',
  '파도 소리 카페',
  '천사의 휴식',
  '겨울나무',
  '커피 향 가득히',
  '동화 속 카페',
  '봄의 기운',
  '작은 온기',
  '행복한 순간',
  '달콤한 커피숍',
  '비밀스러운 곳',
  '하늘 카페',
  '느린 오후',
  '노을빛 카페',
  '라라랜드 커피',
  '밤하늘의 카페',
  '햇살 커피숍',
  '따뜻한 발걸음',
  '새벽의 노래',
  '모래사장의 커피',
  '한 여름의 정원',
  '푸른 나무',
  '별빛과 커피',
];

const shuffledCafeNameList = faker.helpers.shuffle(cafeNameList);

const cafeDescriptionList = [
  {
    breifInfo: '여유로운 힐링 카페',
    description:
      '도심 속에서 한 템포 쉬어가는 공간입니다. 잔잔한 음악과 함께 마음을 내려놓을 수 있는 여유를 선물합니다. 따뜻한 커피 한 잔으로 일상의 피로를 녹여보세요.',
  },
  {
    breifInfo: '감성 가득한 공간',
    description:
      '따뜻한 조명과 감성적인 인테리어가 특징입니다. 소중한 사람들과 잊지 못할 추억을 만들어보세요. 창가 자리에서 햇살을 느끼며 커피를 즐길 수 있어요.',
  },
  {
    breifInfo: '달콤한 디저트의 천국',
    description:
      '갓 구운 디저트와 진한 커피의 완벽한 조화를 느껴보세요. 입안 가득 퍼지는 달콤함이 하루를 더 특별하게 만들어줍니다. 오직 이곳에서만 만날 수 있는 특별한 맛이 기다립니다.',
  },
  {
    breifInfo: '자연과 함께하는 카페',
    description:
      '마치 숲속에 있는 듯한 편안한 공간을 제공합니다. 녹음이 가득한 풍경 속에서 진한 커피의 향을 즐겨보세요. 자연의 품속에서 몸도 마음도 힐링하세요.',
  },
  {
    breifInfo: '커피 한 잔의 여유',
    description:
      '한 모금마다 진심이 담긴 커피를 제공합니다. 바쁜 일상 속 잠시 멈추고, 여유를 만끽해보세요. 당신을 위한 특별한 시간이 기다리고 있습니다.',
  },
  {
    breifInfo: '아침을 여는 브런치 카페',
    description:
      '매일 아침 신선한 재료로 만든 브런치를 준비합니다. 커피와 함께 완벽한 아침을 시작하세요. 하루를 활기차게 만들어줄 특별한 한 끼를 선물합니다.',
  },
  {
    breifInfo: '책과 함께하는 공간',
    description:
      '책 한 권과 따뜻한 커피가 어우러진 아늑한 공간입니다. 조용한 분위기에서 나만의 시간을 보내보세요. 지친 마음에 작은 위로를 더해드립니다.',
  },
  {
    breifInfo: '계절의 맛을 담은 카페',
    description:
      '계절마다 바뀌는 특별한 메뉴를 선보입니다. 자연이 주는 신선한 재료로 만든 음료와 디저트를 즐겨보세요. 계절의 감성을 담은 맛을 느껴보세요.',
  },
  {
    breifInfo: '당신만의 비밀 공간',
    description:
      '도심 한가운데 숨겨진 작은 쉼터입니다. 혼자만의 시간을 보내기에 딱 좋은 곳이에요. 마음속 비밀스러운 이야기를 나눌 수 있는 특별한 장소입니다.',
  },
  {
    breifInfo: '정성을 담은 커피',
    description:
      '한 잔의 커피에도 진심을 담았습니다. 정성스럽게 내린 커피로 특별한 맛을 경험해보세요. 당신의 하루를 더욱 특별하게 만들어드릴게요.',
  },
];

const businessHourList = [
  { openingTime: '오전 10:00', closingTime: '오후 4:00' },
  { openingTime: '오전 10:00', closingTime: '오후 5:00' },
  { openingTime: '오전 10:00', closingTime: '오후 6:00' },
  { openingTime: '오전 10:00', closingTime: '오후 7:00' },
  { openingTime: '오전 10:00', closingTime: '오후 8:00' },
  { openingTime: '오전 10:15', closingTime: '오후 6:45' },
  { openingTime: '오전 10:30', closingTime: '오후 7:30' },
  { openingTime: '오전 11:00', closingTime: '오후 7:00' },
  { openingTime: '오전 11:00', closingTime: '오후 8:00' },
  { openingTime: '오전 11:30', closingTime: '오후 7:30' },
  { openingTime: '오전 11:30', closingTime: '오후 9:00' },
  { openingTime: '오전 12:00', closingTime: '오후 8:00' },
  { openingTime: '오전 7:00', closingTime: '오후 12:00' },
  { openingTime: '오전 7:00', closingTime: '오후 3:00' },
  { openingTime: '오전 7:30', closingTime: '오후 3:30' },
  { openingTime: '오전 8:00', closingTime: '오후 2:00' },
  { openingTime: '오전 8:00', closingTime: '오후 4:00' },
  { openingTime: '오전 8:00', closingTime: '오후 5:00' },
  { openingTime: '오전 8:00', closingTime: '오후 6:00' },
  { openingTime: '오전 8:30', closingTime: '오후 5:30' },
  { openingTime: '오전 8:45', closingTime: '오후 4:45' },
  { openingTime: '오전 9:00', closingTime: '오후 4:30' },
  { openingTime: '오전 9:00', closingTime: '오후 5:00' },
  { openingTime: '오전 9:00', closingTime: '오후 5:30' },
  { openingTime: '오전 9:00', closingTime: '오후 6:00' },
  { openingTime: '오전 9:00', closingTime: '오후 6:30' },
  { openingTime: '오전 9:15', closingTime: '오후 5:45' },
  { openingTime: '오전 9:30', closingTime: '오후 3:30' },
  { openingTime: '오전 9:30', closingTime: '오후 5:30' },
  { openingTime: '오전 9:45', closingTime: '오후 6:15' },
];

const concepts = ['모던', '아기자기', '코지', '내추럴'] as const;

const imageUrls = Array.from({ length: 35 }).map((_, i) => `/images/cafe/${i + 1}.jpg`);

export function generateRandomSigungu() {
  return faker.helpers.arrayElement(sigunguList);
}

export function generateRandomBreifAddress() {
  const sigungu = generateRandomSigungu();
  return `${sigungu} ${faker.helpers.arrayElement([
    '테헤란로',
    '청계천로',
    '종로',
    '강남대로',
    '서초대로',
  ])}`;
}

export function generateRandomDetailedAddress() {
  const briefAddress = generateRandomBreifAddress();
  return `${briefAddress} ${faker.number.int({
    min: 1,
    max: 100,
  })}길 ${faker.number.int({ min: 1, max: 100 })}`;
}

export function generateRandomCafeName() {
  const nextName = shuffledCafeNameList.pop();

  if (!nextName) {
    throw Error('TOO MANY CAFE NAMES');
  }
  return nextName;
}

export function generateRandomLocation() {
  return {
    latitude: faker.location.latitude({ min: 33.0, max: 38.0 }), // 대한민국 범위 위도
    longitude: faker.location.longitude({ min: 125.0, max: 130.0 }), // 대한민국 범위 경도
  };
}

export function generateCafeDescription() {
  return faker.helpers.arrayElement(cafeDescriptionList);
}

export function generateBusinessHour() {
  return faker.helpers.arrayElement(businessHourList);
}

export function generateConcept() {
  return faker.helpers.arrayElement(concepts);
}

export function generateFeeInfo() {
  return {
    bookingAmount:
      faker.number.int({
        min: 0,
        max: 10,
      }) * 1000,
    dailyCharge:
      faker.number.int({
        min: 1,
        max: 50,
      }) * 1000,
    depositAmount:
      faker.number.int({
        min: 1,
        max: 50,
      }) * 1000,
    guaranteeCount: faker.number.int({
      min: 0,
      max: 10,
    }),
    minPeriod: faker.number.int({
      min: 0,
      max: 100,
    }),
  };
}

export function generateCafeImages() {
  return faker.helpers.arrayElements(imageUrls, 4);
}
