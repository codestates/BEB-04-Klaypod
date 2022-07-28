import MainNav from "./MainNav";
import MainPage from "./MainPage";
import MainFooter from "./MainFooter";

import "../styles/Main.css";

function Main() {
  return (
    <>
      <MainNav />
      <div className="main_page_slide">
        <div className="main_wrapper clearfix">
          <div className="Main_gif">
            <div className="shadow"></div>
            <div className="bowl">
              <div className="liquid"></div>
            </div>
            <MainPage />
          </div>
          <div className="main_page_one">
            <div className="main_page_one_title">KLAYPOD SCAN DEX List</div>
            <img
              className="main_page_one_img"
              src="https://gateway.pinata.cloud/ipfs/QmYATGeFczH5zSFtqWNrZAbXMRsRPVHXVeFuRJZwnXKwDC"
              alt=""
            />
          </div>
          <section className="main_page_two">
            <li>
              <img
                className="main_page_two_img"
                src="https://gateway.pinata.cloud/ipfs/QmX77ydLWPeQiX5EP4hYDcP88obd8FPoGJ6zy336uLchFo"
                alt=""
                width="250"
                height="220"
              />
              <span className="main_page_two_title">DeFi SCAN</span>
              <span className="main_page_two_text">
                KlayPod 에서 지원하는
                <br />
                DEX 스캔을 통해 수익을 극대화 하세요!
              </span>
            </li>
            <li>
              <img
                className="main_page_two_img"
                src="https://gateway.pinata.cloud/ipfs/QmdMZoxTfKAJCKiyqPLiNPFGCr2jnXx1ktxiys2BfQNSbZ"
                alt=""
                width="250"
                height="220"
              />
              <span className="main_page_two_title">Token Swap</span>
              <span className="main_page_two_text">
                Klaytn 코인으로 POD 토큰을 스왑하여
                <br />
                KlayPod의 소유자가 되세요!
              </span>
            </li>
            <li>
              <img
                className="main_page_two_img"
                src="https://gateway.pinata.cloud/ipfs/QmfQcwxrQkwBM5B6BDkWx8Mm2Azanqpkgx66t31FBojyyS"
                alt=""
                width="250"
                height="220"
              />
              <span className="main_page_two_title">Token Staking</span>
              <span className="main_page_two_text">
                KlayPod의 POD 토큰을 홀드하세요.
                <br />
                스테이킹하여 수익을 얻으며
                <br />
                KlayPod의 가치를 높여보세요!
              </span>
            </li>
            <li>
              <img
                className="main_page_two_img"
                src="https://gateway.pinata.cloud/ipfs/QmVeqE7nTZfu8giC6RYjnkFuDPVvYEXgzfY36pta3m42ip"
                alt=""
                width="250"
                height="220"
              />
              <span className="main_page_two_title">KlayPod Governance</span>
              <span className="main_page_two_text">
                KlayPod의 DAO 참여자가 되세요.
                <br />
                POD 토큰으로 거버넌스 권한을 얻으세요!
              </span>
            </li>
          </section>
          <section className="main_page_three">
            <MainFooter />
          </section>
        </div>
      </div>
    </>
  );
}

export default Main;
