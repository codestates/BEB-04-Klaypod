import { useEffect, useState, useCallback } from "react";
// import axios from "axios";
import "../styles/PoolMain.css";
import PoolList from "../pages/PoolList";
import { PoolListProps } from "../pages/PoolList";

const PoolMain = () => {
  const [poolList, setPoolList] = useState<PoolListProps[]>([]);
  const [savePoolList, setSavePoolList] = useState<PoolListProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const poolData = () => {
      setIsLoading(true); // 데이터를 불러오는중에는 로딩중 표시
      fetch(
        "https://gateway.pinata.cloud/ipfs/QmeFPnH8KAaK9p8grvCn46abgLc3m9KGUa5eC1XnY7JX2w"
      )
        .then((res) => res.json())
        .then((list) => {
          setPoolList(list.slice(0, 10)); // 서버에서 데이터를 10개만 보여주고
          setSavePoolList(list.slice(10)); // 보여주는 데이터 10개 제외한 나머지는 빈배열에 저장
          setIsLoading(false); // 데이터를 다 불러왔으면 로딩중 끝
        });
    };
    poolData();
  }, []);

  const poolSaveData = async () => {
    // 서버에서 데이터를 추가로 받아오는 함수 (비동기처리)
    if (savePoolList.length !== 0) {
      // useState 배열에 저장된 길이가 0이 아닐경우 실행
      setIsLoading(true); // 데이터를 불러오는중에는 로딩중 표시
      setTimeout(() => {
        // 바로 실행하지말고 1초 뒤에 실행시키기
        setPoolList([...poolList, ...savePoolList.slice(0, 10)]);
        // 서버에 담긴 값, 저장된 데이터 10개 꺼내기
        setSavePoolList(savePoolList.slice(10)); // 저장된 데이터 10개 출력
        setIsLoading(false); // 데이터를 다 불러왔으면 로딩중 끝
      }, 1000); // 👉 1초
    }
  };

  const infiniteScroll = useCallback(() => {
    //스크롤 높이를 감지해서 👉 조건에 만족하면 poolSaveData 함수 호출
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;

    scrollHeight -= 100; // 스크롤이 맨 끝 지점(100)에 왔을때

    if (scrollTop + clientHeight >= scrollHeight && isLoading === false) {
      poolSaveData();
    }
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll, true); // 스크롤 이벤트 등록
    return () => window.removeEventListener("scroll", infiniteScroll, true); //스크롤 이벤트 삭제
  }, [infiniteScroll]);

  return (
    <div className="pool_wrapper">
      <div className="pool_container">
        <div className="pool_title">
          <div className="pool_title_notice">KlayPod Scan</div>
        </div>
        <div>
          <div className="pool_list">
            <div className="pool_top">
              <div className="pool_pair">Pair</div>
              <div className="pool_project">Project</div>
              <div className="pool_tvl">TVL</div>
              <div className="pool_apr">APR</div>
              <div className="pool_link">Link</div>
            </div>
            <div>
              {poolList.map((list, index) => (
                <PoolList
                  key={index}
                  pair={list.pair}
                  logo1={list.logo1}
                  logo2={list.logo2}
                  project={list.project}
                  logo={list.logo}
                  tvl={list.tvl}
                  apr={list.apr}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolMain;
