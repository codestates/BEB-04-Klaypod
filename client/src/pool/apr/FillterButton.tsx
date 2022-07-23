import { Link } from "react-router-dom";
import "../../styles/FillterButton.css";

const FillterButton = () => {
  return (
    <div className="filter_btn_item">
      <Link to="/pool">
        <li className="filter_btn">수익률순</li>
      </Link>
      <Link to="/tvl">
        <li className="filter_btn">유동성 규모순</li>
      </Link>
      <Link to="/project">
        <li className="filter_btn">프로젝트 TVL순</li>
      </Link>
    </div>
  );
};

export default FillterButton;
