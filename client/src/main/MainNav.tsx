import { Link } from "react-router-dom";
import "../styles/MainNav.css";

function MainNav() {
  return (
    <>
      <div className="main_nav_wrapper clearfix">
        <div className="main_logo_container">
          <div className="main_logo_text">KlayPod</div>
          <img
            className="main_logo_img"
            src="https://gateway.pinata.cloud/ipfs/QmNkCiLSwPFWu656vpMm2kZdi2JsPiRFEgUXG4AhfreSAB"
            width="40"
            height="50"
            alt=""
          />
        </div>
        <div className="main_header_items">
          <Link to="#">
            <div className="main_nav_docs_btn">Docs</div>
          </Link>
          <Link to="/pool">
            <div className="main_nav_enter_btn">Enter App</div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MainNav;
