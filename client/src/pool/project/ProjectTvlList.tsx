import { FC } from "react";
import "../../styles/ProjectTvlList.css";

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
    <div className="project_list_wrap">
      <div className="project_list_title"></div>
      <div>
        <div className="project_list_list">
          <div>
            <div className="project_list_title">
              <img className="project_list_title_logo" src={logo} alt="" />
              <div className="project_list_title_name">{name}</div>
            </div>
            <div className="project_list_tvl">$ {tvlString}</div>
            <a className="project_list_link" href={url} target="_blank">
              이동
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTvlList;
