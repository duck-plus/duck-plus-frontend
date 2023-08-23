import { useInView } from 'react-cool-inview';

/** InView를 바탕으로, idx를 설정해주는 훅 */
export default function useInViewIdxObserver(
  idx: number,
  setSelectedIdx: (idx: number) => void,
  options?: Parameters<typeof useInView>[0]
) {
  return useInView({
    threshold: 0.7,
    onEnter: e => {
      if (e.scrollDirection.vertical === 'up') {
        setSelectedIdx(idx);
      }
    },
    onLeave: e => {
      if (e.scrollDirection.vertical === 'down') {
        setSelectedIdx(Math.max(idx - 1, 0));
      }
    },
    ...options,
  });
}
