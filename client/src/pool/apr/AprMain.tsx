import { useEffect, useState, useCallback } from "react";
import "../../styles/AprMain.css";
import AprList from "./AprList";
import { AprListProps } from "./AprList";
import FillterButton from "./FillterButton";
import AprNav from "./AprNav";

const AprMain = () => {
  const [firstPoolList, setFirstPoolList] = useState<AprListProps[]>([]);
  const [poolList, setPoolList] = useState<AprListProps[]>([]);
  const [nextCursorData, setNextCursorData] = useState<number[]>([]);
  const [savePoolList, setSavePoolList] = useState<AprListProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const poolData = async () => {
      setIsLoading(true); // 데이터를 불러오는중에는 로딩중 표시
      let res = `http://localhost:8080/dashboard?sort=apr&cursor=10000`;
      let response = await fetch(res);
      let aprData = await response.json();
      setFirstPoolList(aprData.data); // 👈 서버에서 데이터를 받아서 담음
      setIsLoading(false); // 데이터를 다 불러왔으면 로딩중 끝
    };
    poolData();
  }, []);
  // 👆👆👆 스크롤시 데이터를 중복으로 불러오기에 일단 첫번째 호출 후 랜더링

  console.log("poolList 첫번째", poolList);

  const poolSaveData = async () => {
    // 서버에서 데이터를 추가로 받아오는 함수 (비동기처리)

    setIsLoading(true); // 데이터를 불러오는중에는 로딩중 표시
    let res = `http://localhost:8080/dashboard?sort=apr&cursor=${nextCursorData}`;
    let response = await fetch(res);
    let aprData = await response.json();

    for (let i = 0; i < aprData.data.length; i++) {
      setNextCursorData(aprData.data[i].apr);
    } // 👆 반복문을 돌려서 apr의 값 = 커서위치를 api주소로 반환
    setSavePoolList([...aprData.data]); // 👈 커서위치당 불러온 데이터 저장공간
    setPoolList([...poolList, ...savePoolList]);
    // 👆 랜더링 해주는 배열 담기는 순서대로 누적되어 출력

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
    window.addEventListener("scroll", infiniteScroll, true); // 👈 스크롤 이벤트 등록
    return () => window.removeEventListener("scroll", infiniteScroll, true); // 👈 스크롤 이벤트 삭제
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
                {/* 👇 첫번째 호출은 poolList에 아무것도 없으므로 firstPoolList를 보여준다
                두번째 호출부터는 poolList에 값이 생기므로 정삭적으로 출력! */}
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

export default AprMain;
