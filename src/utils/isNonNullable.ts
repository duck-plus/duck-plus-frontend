// filter 등에서, NonNullable 타입가드를 쉽게 적용하기 위한 유틸 함수
/** undefined와 null이 아님 */
export default function isNonNullable<T>(x: T): x is NonNullable<T> {
  return x !== null && typeof x !== "undefined";
}
