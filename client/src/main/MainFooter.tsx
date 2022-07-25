import "../styles/MainFooter.css";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { AiOutlineMail, AiOutlineRead } from "react-icons/ai";

const MainFooter = () => {
  return (
    <>
      <div className="main_footer_wrapper">
        <div className="main_footer_title_wrapper">
          <li className="main_footer_title">KLAYPOD COMMUNITY</li>
          <li className="main_footer_text">
            커뮤니티에 가입하여 최신 뉴스와 업데이트를 확인하세요!
          </li>
        </div>
        <p className="main_footer_icon">
          <a
            className="main_footer_icon_gap"
            href="https://discord.com/"
            target="_blank"
          >
            <FaDiscord className="discord_icon" />
          </a>
          <a
            className="main_footer_icon_gap"
            href="https://github.com/codestates/BEB-04-Klaypod"
            target="_blank"
          >
            <FaGithub className="github_icon" />
          </a>
          <a
            className="main_footer_icon_gap"
            href="https://www.google.com/intl/ko/gmail/about/"
            target="_blank"
          >
            <AiOutlineMail className="email_icon" />
          </a>
          <a
            className="main_footer_icon_gap"
            href="https://www.gitbook.com/"
            target="_blank"
          >
            <AiOutlineRead className="docs_icon" />
          </a>
        </p>
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
          <p className="main_footer_under_icon">
            <a
              className="main_footer_under_icon_gap"
              href="https://discord.com/"
              target="_blank"
            >
              <FaDiscord />
            </a>
            <a
              className="main_footer_under_icon_gap"
              href="https://github.com/codestates/BEB-04-Klaypod"
              target="_blank"
            >
              <FaGithub />
            </a>
            <a
              className="main_footer_under_icon_gap"
              href="https://www.google.com/intl/ko/gmail/about/"
              target="_blank"
            >
              <AiOutlineMail />
            </a>
            <a
              className="main_footer_under_icon_gap"
              href="https://www.gitbook.com/"
              target="_blank"
            >
              <AiOutlineRead />
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default MainFooter;
