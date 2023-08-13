import React, { useEffect, useRef } from "react";
import PageFrame from "@/components/atoms/PageFrame";
import AppTopBar from "../organisms/AppTopBar";
import { useGetCafeQuery } from "@/services/gql-outputs/graphql";
import styled from "styled-components";
import useHorizontalRatio, { hScalePx } from "@/hooks/useHorizontalRatio";
import { useTypedSearchParams } from "react-router-typesafe-routes/dom";
import { ROUTES } from "@/router";
import { Navigate } from "react-router-dom";
import LocationFill56SVG from "@/assets/svgr/ic/location-fill-56.svg";
import { ReactComponent as GPSSVGR } from "@/assets/svgr/ic/gps.svg";
import { ReactComponent as CopyFillSVGR } from "@/assets/svgr/ic/copy-fill.svg";
import copy from "copy-to-clipboard";
import sentry from "@/utils/sentry";

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - ${AppTopBar.CSSAppTopBarHeight});
  flex-grow: 1;
  position: relative;
  display: flex;
  justify-content: center;
`;

const NaverMap = styled.div`
  width: 100%;
  height: 100%;
`;

const Address = styled.div`
  ${({ theme }) => theme.fontFaces["body2/12-Regular"]};
  color: ${({ theme }) => theme.colors.gray900};
`;

const GotoMyLocationButton = styled.button`
  outline: 0;
  border: 0;
  top: ${hScalePx(40)};
  right: ${hScalePx(20)};
  padding: ${hScalePx(2)};
  border-radius: ${hScalePx(100)};
  background: #fff;
  position: absolute;
  box-shadow: 0px ${hScalePx(4)} ${hScalePx(9)} 0px rgba(0, 0, 0, 0.02);

  cursor: pointer;
`;

const OverlayTopBar = styled.div`
  position: absolute;
  top: ${hScalePx(12)};
  padding: ${hScalePx(4)} ${hScalePx(12)} ${hScalePx(4)} ${hScalePx(16)};
  gap: ${hScalePx(6)};
  display: flex;
  border-radius: ${hScalePx(100)};
  background: #fff;
  box-shadow: 0px ${hScalePx(4)} ${hScalePx(9)} 0px rgba(0, 0, 0, 0.02);
  align-items: center;
`;

const VerSep = styled.div`
  height: ${hScalePx(8)};
  border-right: ${hScalePx(1)} solid ${({ theme }) => theme.colors.gray200};
`;

const CopyButton = styled.button`
  border: 0;
  outline: 0;
  background: none;
  cursor: pointer;
`;

const CafeMapPage = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [{ code }] = useTypedSearchParams(ROUTES.CAFE.MAP);
  const { data: cafe } = useGetCafeQuery(
    {
      code,
    },
    {
      select: (s) => s.cafe,
    }
  );

  const hr = useHorizontalRatio();

  const mapRef = useRef<naver.maps.Map>();
  const selfMarkerRef = useRef<naver.maps.Marker>();
  const selfMarkerWatchIdRef = useRef<number | null>(null);

  // NaverMap
  useEffect(() => {
    if (!mapElement.current || !naver || !cafe) return;

    // 지도에 표시할 중심/마커의 위도와 경도 좌표.
    const [lng, lat] = cafe.address.location?.coordinates || [0, 0];
    const location = new naver.maps.LatLng(lat, lng);

    // 맵 생성
    const map = new naver.maps.Map(mapElement.current, {
      center: location,
      zoom: 17,
    });

    // 마커 배치
    new naver.maps.Marker({
      position: location,
      map,
      icon: {
        url: LocationFill56SVG,
      },
    });

    mapRef.current = map;
  }, [cafe]);

  const address = `${cafe?.address.briefAddress} ${cafe?.address.detailedAddress}`;

  const handleGotoMyLocationClick = () => {
    const map = mapRef.current;
    if (!map) {
      return;
    }
    if (navigator.geolocation) {
      // 새 마커 배치 (on)
      if (!selfMarkerRef.current) {
        // 내 위치 마커 초기화
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            const position = new naver.maps.LatLng(latitude, longitude);
            map.setCenter(position); // 얻은 좌표를 지도의 중심으로 설정합니다.
            map.setZoom(17); // 지도의 줌 레벨을 변경합니다.
            selfMarkerRef.current = new naver.maps.Marker({
              position,
              map,
            });
          },
          sentry.captureException,
          {
            enableHighAccuracy: true,
          }
        );

        // 내 위치 마커 모니터링
        selfMarkerWatchIdRef.current = navigator.geolocation.watchPosition(
          ({ coords: { latitude, longitude } }) => {
            const position = new naver.maps.LatLng(latitude, longitude);
            map.setCenter(position); // 얻은 좌표를 지도의 중심으로 설정합니다.
            selfMarkerRef.current?.setPosition(position);
          },
          sentry.captureException,
          {
            enableHighAccuracy: true,
          }
        );
      }
      // 기존 마커가 있으면 마커 제거 (off)
      else {
        // 맵에서 제거
        selfMarkerRef.current?.setMap(null);
        // 모니터 제거
        if (typeof selfMarkerWatchIdRef?.current === "number") {
          navigator.geolocation.clearWatch(selfMarkerWatchIdRef.current);
        }
      }
    } else {
      sentry.captureMessage("위치 권한이 없습니다", "warning");
    }
  };

  return !cafe ? (
    <Navigate to={ROUTES.CAFE.DETAILS.buildPath({}, { code })} />
  ) : (
    <PageFrame>
      <AppTopBar.Center>{cafe.name}</AppTopBar.Center>
      <MapContainer>
        {/* 지도 */}
        <NaverMap ref={mapElement} />
        {/* 상단 주소 오버레이 */}
        <OverlayTopBar>
          <Address>{address}</Address>
          <VerSep />
          <CopyButton onClick={() => copy(address)}>
            <CopyFillSVGR width={18 * hr} height={18 * hr} />
          </CopyButton>
        </OverlayTopBar>
        {/* 우상단 내 위치로 버튼 */}
        <GotoMyLocationButton onClick={handleGotoMyLocationClick}>
          <GPSSVGR width={32 * hr} height={32 * hr} />
        </GotoMyLocationButton>
      </MapContainer>
    </PageFrame>
  );
};

export default CafeMapPage;
