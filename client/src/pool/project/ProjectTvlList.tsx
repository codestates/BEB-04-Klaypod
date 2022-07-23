import { FC } from "react";
import "../../styles/AprList.css";

export interface ProjectTvlListProps {
  _id: string;
  name: string;
  logo: string;
  tvl: number;
  url: string;
}

const ProjectTvlList: FC<ProjectTvlListProps> = ({ name, logo, tvl, url }) => {
  let tvlString = tvl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="pool_list_wrap">
      <div className="pool_list_title"></div>
      <div>
        <div className="pool_list_list">
          <div>
            <div className="pool_list_title">
              <img className="pool_list_title_logo" src={logo} alt="" />
              <div className="pool_list_title_name">{name}</div>
            </div>
            <div className="pool_list_tvl">$ {tvlString}</div>
            <a href={url} target="_blank" className="pool_list_link">
              예치
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTvlList;
