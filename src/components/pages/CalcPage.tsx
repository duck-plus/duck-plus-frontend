import React, { ChangeEventHandler, useState } from 'react';
import PageFrame from '@/components/atoms/PageFrame';
import { styled } from 'styled-components';
import { hScalePx } from '@/hooks/useHorizontalRatio';
import HSeperator from '../atoms/HSeperator';
import AppTopBar from '../organisms/AppTopBar';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router';
import ga from '@/utils/ga';

const InputRow = styled.div`
  display: flex;
  padding: 0 ${hScalePx(20)};
  justify-content: space-between;
`;

const InputItem = styled.div`
  padding: ${hScalePx(24)} 0 ${hScalePx(20)} 0;
  display: flex;
  flex-direction: column;
  gap: ${hScalePx(12)};
  color: ${({ theme }) => theme.colors.gray700};
`;

const Label = styled.label`
  ${({ theme }) => theme.fontFaces['body2/12-Medium']}
`;

const InputField = styled.div`
  width: 100%;
  padding: 0 ${hScalePx(2)} 0 0;
  height: ${hScalePx(40)};
  display: flex;
  align-items: flex-end;
  position: relative;
`;

const BaseInput = styled.input`
  ${({ theme }) => theme.fontFaces['Display3/32-Regular']}
  text-align: left;
  height: 100%;
  padding: 0;
  border: 0;
  outline: 0;
  border-top: solid ${hScalePx(1)} transparent;
  border-bottom: solid ${hScalePx(1)} ${({ theme }) => theme.colors.gray200};

  &:focus {
    border-bottom: solid ${hScalePx(1)} black;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray200};
  }
`;

const InputDayCnt = styled(BaseInput)`
  width: ${hScalePx(98)};
`;

const InputCost = styled(BaseInput)`
  width: ${hScalePx(190)};
`;

const Unit = styled.div`
  ${({ theme }) => theme.fontFaces['body2/12-Regular']}
  padding: ${hScalePx(4)};
  position: absolute;
  bottom: ${hScalePx(2)};
  right: 0;
  color: ${({ theme }) => theme.colors.gray700};
`;

const BottomFrame = styled.div`
  width: 100%;
  padding: ${hScalePx(12)} ${hScalePx(21)};
  position: absolute;
  border-top: ${hScalePx(1)} solid ${({ theme }) => theme.colors.gray100};
`;

const CalcButton = styled.button`
  ${({ theme }) => theme.fontFaces['body1/14-Regular']}
  cursor: pointer;
  padding: ${hScalePx(16)} ${hScalePx(46)};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  width: 100%;
  border: 0;
  outline: 0;

  &:not(:disabled):active {
  }

  &:disabled {
    cursor: default;
    background-color: ${({ theme }) => theme.colors.gray200};
  }
`;

const CalcPage = () => {
  const [dayCnt, setDayCnt] = useState<string>('');
  const [cost, setCost] = useState<string>('');
  const navigate = useNavigate();

  const handleCntChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.value === '') {
      return setDayCnt('');
    }
    const originalNumber = Number(e.target.value);
    const formattedNumber = originalNumber.toString();

    const maxNumLen = 4;
    if (Number.isNaN(originalNumber) || String(originalNumber).length > maxNumLen) {
      return;
    }

    setDayCnt(formattedNumber);
  };

  const handleCostChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.value === '') {
      return setCost('');
    }
    const originalNumber = Number(e.target.value.replace(/,/g, ''));
    const formattedNumber = originalNumber.toLocaleString();

    const maxNumLen = 8;
    if (Number.isNaN(originalNumber) || String(originalNumber).length > maxNumLen) {
      return;
    }
    setCost(formattedNumber);
  };

  const handleCalcClick = () => {
    const dailyCharge = Number(cost.replace(/,/g, '')) / Number(dayCnt);
    ga.send('calc_btn', {
      cost,
      dailyCharge: dailyCharge.toString(),
      dayCnt,
    });
    navigate(
      ROUTES.CALC.RESULT.buildPath(
        {},
        {
          dailyCharge,
        }
      )
    );
  };

  return (
    <PageFrame>
      <AppTopBar.Center>견적내기</AppTopBar.Center>
      <HSeperator />
      <InputRow>
        <InputItem>
          <Label>예상 대관기간</Label>
          <InputField>
            <InputDayCnt placeholder="1" value={dayCnt} onChange={handleCntChange} size={1} />
            <Unit>일</Unit>
          </InputField>
        </InputItem>
        <InputItem>
          <Label>예상비용</Label>
          <InputField>
            <InputCost placeholder="10,000" value={cost} onChange={handleCostChange} />
            <Unit>원</Unit>
          </InputField>
        </InputItem>
      </InputRow>
      <BottomFrame>
        <CalcButton disabled={!cost || !dayCnt} onClick={handleCalcClick}>
          견적내기
        </CalcButton>
      </BottomFrame>
    </PageFrame>
  );
};

export default CalcPage;
