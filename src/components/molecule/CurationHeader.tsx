import { hScalePx } from '@/hooks/useHorizontalRatio';
import { styled } from 'styled-components';

const HeaderContainer = styled.div`
  padding: ${hScalePx(28)} ${hScalePx(20)} ${hScalePx(16)} ${hScalePx(20)};
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.div`
  ${({ theme }) => theme.fontFaces['title2/16-Medium']};
  color: ${({ theme }) => theme.colors.gray900};
`;

interface IProps {
  title: string;
}

const CurationHeader = ({ title }: IProps) => {
  return (
    <HeaderContainer>
      <HeaderText>{title}</HeaderText>
    </HeaderContainer>
  );
};

export default CurationHeader;
