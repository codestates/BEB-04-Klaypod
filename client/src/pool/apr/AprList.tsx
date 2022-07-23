import { FC } from "react";
import "../../styles/AprList.css";

export interface AprListProps {
  project_id: any;
  _id: string;
  pair: string;
  logo1: string;
  logo2: string;
  name: string;
  logo: string;
  tvl: number;
  apr: number;
  url: string;
}

const AprList: FC<AprListProps> = ({
  pair,
  logo1,
  logo2,
  name,
  logo,
  tvl,
  apr,
  url,
}) => {
  let tvlString = tvl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let aprString = apr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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
              <div className="pool_list_title_name">{name}</div>
            </div>
            <div className="pool_list_tvl">$ {tvlString}</div>
            <div className="pool_list_apr">{aprString} %</div>
            <a href={url} target="_blank" className="pool_list_link">
              예치
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AprList;
