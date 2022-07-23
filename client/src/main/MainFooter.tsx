import { FaDiscord, FaGithub } from "react-icons/fa";
import { AiOutlineMail, AiOutlineRead } from "react-icons/ai";
import "../styles/MainFooter.css";

const MainFooter = () => {
  return (
    <>
      <div className="main_footer_wrapper">
        <footer className="main_footer_container">
          <nav>
            <div className="main_footer_logo_text">KlayPod</div>
            <img
              className="main_footer_logo_img"
              src="https://gateway.pinata.cloud/ipfs/QmNkCiLSwPFWu656vpMm2kZdi2JsPiRFEgUXG4AhfreSAB"
              width="80"
              height="90"
              alt=""
            />
          </nav>
          <p className="main_footer_detail">
            <span>
              <strong>KlayPod</strong>
            </span>
            <br />
            <span className="main_footer_hover">Home</span>
            <br />
            <span className="main_footer_hover">Pool</span>
            <br />
            <span className="main_footer_hover">Swap</span>
            <br />
            <span className="main_footer_hover">Staking</span>
            <br />
            <span className="main_footer_hover">Wallet</span>
          </p>
          <p className="main_footer_contact">
            <span>
              <strong>CONTACT</strong>
            </span>
            <br />
            <span className="main_footer_hover">KlayPod@gmail.com</span>
          </p>
          <p>
            <span className="main_footer_copyright">
              Copyright © 2022-present KlayPod. All rights reserved.
            </span>
          </p>
          <p className="main_footer_icon">
            <span className="main_footer_icon_gap">
              <FaDiscord />
            </span>
            <span className="main_footer_icon_gap">
              <FaGithub />
            </span>
            <span className="main_footer_icon_gap">
              <AiOutlineMail />
            </span>
            <span className="main_footer_icon_gap">
              <AiOutlineRead />
            </span>
          </p>
        </footer>
      </div>
    </>
  );
};

export default MainFooter;
