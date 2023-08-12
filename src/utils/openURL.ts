/** url이 https://로 시작하지 않는 경우, base가 자신이 되는 이슈 처리 */
export default function openURL(url: string) {
  window.open(`https://${url.replaceAll(/^.*:\/\//g, "")}`, "_blank");
}
