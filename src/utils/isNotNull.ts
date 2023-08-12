// filter 등에서, NonNullable 타입가드를 쉽게 적용하기 위한 유틸 함수
export default function isNotNull<T>(x: T): x is NonNullable<T> {
  return x !== null;
}
