import { Link } from "react-router-dom";
import "../styles/MainPage.css";

function MainPage() {
  return (
    <>
      <div className="main_text_wrapper">
        <span className="main_text_title">
          클레이튼 네트워크 DEX 가격비교 스캐너
        </span>
        <br />
        <br />
        <span className="main_text_detail">
          클레이튼 네트워크 내 모든 DeFi 상품을 <br />
          APY / TVL 순으로 찾아주는 서비스 입니다.
          <br />
          <br />
          클레이팟을 통해 <strong>가장 높은 수익 상품</strong>을 찾아보세요!
        </span>
      </div>
      <div className="main_btn_wrapper">
        <Link to="/apr">
          <div className="main_enter_btn">Enter App</div>
        </Link>
        <Link to="#">
          <div className="main_docs_btn">Docs</div>
        </Link>
      </div>
    </>
  );
}

export default MainPage;
