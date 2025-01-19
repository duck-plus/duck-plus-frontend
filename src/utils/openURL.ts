import toast from 'react-hot-toast';

/** url이 https://로 시작하지 않는 경우, base가 자신이 되는 이슈 처리 */
export default function openURL(url: string) {
  toast.success('문의하기 기능은 준비중입니다.');
  // window.open(`https://${url.replaceAll(/^.*:\/\//g, "")}`, "_blank");
}
