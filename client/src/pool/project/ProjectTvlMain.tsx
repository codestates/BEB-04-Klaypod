import { FC, useEffect, useState } from "react";
import "../../styles/ProjectTvlMain.css";
import { AprListProps } from "../apr/AprList";
import ProjectTvlList from "./ProjectTvlList";
import FillterButton from "../apr/FillterButton";
import AprNav from "../apr/AprNav";
import { onClickProps } from "../apr/AprNav";

const ProjectTvlMain: FC<onClickProps> = ({ Connect, account }) => {
  const [projectList, setProjectList] = useState<AprListProps[]>([]);

  useEffect(() => {
    const poolData = async () => {
      let res = `https://api.klaypod.com/dashboard/defi`;
      let response = await fetch(res);
      let projectData = await response.json();
      setProjectList(projectData.data);
    };
    poolData();
  }, []);

  return (
    <>
      <AprNav account={account} Connect={Connect} />
      <div className="project_wrapper">
        <div className="project_container">
          <div className="project_title">
            <div className="project_title_notice">KLAYPOD SCAN</div>
            <img
              className="pool_title_notice_img"
              src="https://gateway.pinata.cloud/ipfs/QmX77ydLWPeQiX5EP4hYDcP88obd8FPoGJ6zy336uLchFo"
              alt=""
              width="70"
              height="70"
            />
          </div>
          <FillterButton />
          <div>
            <div className="project_list">
              <div className="project_top">
                <div className="project_project">Project</div>
                <div className="project_tvl"> 총 TVL 규모</div>
                <div className="project_link">Link</div>
              </div>
              <div>
                {projectList.map((list, index) => (
                  <ProjectTvlList
                    key={index}
                    _id={list._id}
                    name={list.name}
                    logo={list.logo}
                    tvl={list.tvl}
                    url={list.url}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectTvlMain;
