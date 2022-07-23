import { useEffect, useState } from "react";
import "../../styles/AprMain.css";
import { AprListProps } from "../apr/AprList";
import ProjectTvlList from "./ProjectTvlList";
import FillterButton from "../apr/FillterButton";
import AprNav from "../apr/AprNav";

const ProjectTvlMain = () => {
  const [projectList, setProjectList] = useState<AprListProps[]>([]);

  useEffect(() => {
    const poolData = async () => {
      let res = `http://localhost:8080/dashboard?sort=tvl&cursor=99999999999`;
      let response = await fetch(res);
      let projectData = await response.json();
      setProjectList(projectData.data);
    };
    poolData();
  }, []);

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
