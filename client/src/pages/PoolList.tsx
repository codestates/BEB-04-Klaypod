import { FC } from "react";
import "../styles/PoolList.css";

export interface PoolListProps {
  pair: string;
  logo1: string;
  logo2: string;
  project: string;
  logo: string;
  tvl: string;
  apr: number;
}

const PoolList: FC<PoolListProps> = ({
  pair,
  logo1,
  logo2,
  project,
  logo,
  tvl,
  apr,
}) => {
  return (
    <div className="pool_list_wrap">
      <div className="pool_list_title"></div>
      <div>
        <div className="pool_list_list">
          <div>
            <img className="pool_list_logo1" src={logo1} alt="" />
            <img className="pool_list_logo2" src={logo2} alt="" />
            <div className="pool_list_pair_name">{pair}</div>
            <div className="pool_list_title">
              <img className="pool_list_title_logo" src={logo} alt="" />
              <div className="pool_list_title_name">{project}</div>
            </div>
            <div className="pool_list_tvl">$ {tvl}</div>
            <div className="pool_list_apr">{apr} %</div>
            <div className="pool_list_link">예치</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolList;
