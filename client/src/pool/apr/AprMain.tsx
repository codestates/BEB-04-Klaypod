import { FC, useEffect, useState, useCallback } from "react";
import "../../styles/AprMain.css";
import AprList from "./AprList";
import { AprListProps } from "./AprList";
import FillterButton from "./FillterButton";
import AprNav from "./AprNav";
import { onClickProps } from "./AprNav";

const AprMain: FC<onClickProps> = ({ account, Connect }) => {
  const [firstPoolList, setFirstPoolList] = useState<AprListProps[]>([]);
  const [poolList, setPoolList] = useState<AprListProps[]>([]);
  const [nextCursorData, setNextCursorData] = useState<number[]>([]);
  const [savePoolList, setSavePoolList] = useState<AprListProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const poolData = async () => {
      setIsLoading(true);
      let res = `https://api.klaypod.com/dashboard/yield?sort=apr&cursor=9999999`;
      let response = await fetch(res);
      let aprData = await response.json();
      setFirstPoolList(aprData.data);
      setIsLoading(false);
    };
    poolData();
  }, []);

  const poolSaveData = async () => {
    setIsLoading(true);
    let res = `https://api.klaypod.com/dashboard/yield?sort=apr&cursor=${nextCursorData}`;
    let response = await fetch(res);
    let aprData = await response.json();

    for (let i = 0; i < aprData.data.length; i++) {
      setNextCursorData(aprData.data[i].apr);
    }
    setSavePoolList([...aprData.data]);
    setPoolList([...poolList, ...savePoolList]);
    setIsLoading(false);
  };

  const infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;

    scrollHeight -= 95;

    if (scrollTop + clientHeight >= scrollHeight && isLoading === false) {
      poolSaveData();
    }
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll, true);
    return () => window.removeEventListener("scroll", infiniteScroll, true);
  }, [infiniteScroll]);

  return (
    <>
      <AprNav account={account} Connect={Connect} />
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

export default AprMain;
