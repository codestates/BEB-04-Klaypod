import { useEffect, useState, useCallback } from "react";
import "../../styles/AprMain.css";
import AprList, { AprListProps } from "../apr/AprList";
import FillterButton from "../apr/FillterButton";
import AprNav from "../apr/AprNav";

const TvlMain = () => {
  const [firstPoolList, setFirstPoolList] = useState<AprListProps[]>([]);
  const [poolList, setPoolList] = useState<AprListProps[]>([]);
  const [nextCursorData, setNextCursorData] = useState<number[]>([]);
  const [savePoolList, setSavePoolList] = useState<AprListProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const poolData = async () => {
      setIsLoading(true); // 데이터를 불러오는중에는 로딩중 표시
      let res = `http://localhost:8080/dashboard?sort=tvl&cursor=99999999999`;
      let response = await fetch(res);
      let tvlData = await response.json();
      setFirstPoolList(tvlData.data);
      setIsLoading(false); // 데이터를 다 불러왔으면 로딩중 끝
    };
    poolData();
  }, []);
  console.log("poolList 첫번째", poolList);

  const poolSaveData = async () => {
    // 서버에서 데이터를 추가로 받아오는 함수 (비동기처리)

    setIsLoading(true); // 데이터를 불러오는중에는 로딩중 표시
    let res = `http://localhost:8080/dashboard?sort=tvl&cursor=${nextCursorData}`;
    let response = await fetch(res);
    let tvlData = await response.json();

    for (let i = 0; i < tvlData.data.length; i++) {
      setNextCursorData(tvlData.data[i].tvl);
    }
    setSavePoolList([...tvlData.data]);
    setPoolList([...poolList, ...savePoolList]);
    setIsLoading(false); // 데이터를 다 불러왔으면 로딩중 끝
  };
  console.log("스크롤", nextCursorData);
  console.log("저장공간", savePoolList);
  console.log("poolList 두번째", poolList);

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

    scrollHeight -= 95; // 스크롤이 맨 끝 지점(95)에 왔을때

    if (scrollTop + clientHeight >= scrollHeight && isLoading === false) {
      poolSaveData();
    }
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll, true); // 스크롤 이벤트 등록
    return () => window.removeEventListener("scroll", infiniteScroll, true); //스크롤 이벤트 삭제
  }, [infiniteScroll]);

  return (
    <>
      <AprNav />
      <div className="pool_wrapper">
        <div className="pool_container">
          <div className="pool_title">
            <div className="pool_title_notice">KlayPod Scan</div>
          </div>
          <FillterButton />
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
                {(poolList.length === 0 ? firstPoolList : poolList).map(
                  (list, index) => (
                    <AprList
                      key={index}
                      _id={list._id}
                      pair={list.pair}
                      logo1={list.logo[0]}
                      logo2={list.logo[1]}
                      project_id={list.project_id._id}
                      name={list.project_id.name}
                      logo={list.project_id.logo}
                      tvl={list.tvl}
                      apr={list.apr}
                      url={list.project_id.url}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TvlMain;
