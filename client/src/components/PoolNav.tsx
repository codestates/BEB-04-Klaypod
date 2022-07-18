import { Link } from "react-router-dom";
import PoolMain from "./PoolMain";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import "../styles/PoolNav.css";

function PoolNav() {
  return (
    <>
      <div className="pool_nav_wrapper clearfix">
        <div className="pool_logo_container">
          <Link to="/">
            <div className="pool_logo_text">KlayPod</div>
            <img
              className="pool_logo_img"
              src="https://gateway.pinata.cloud/ipfs/QmNkCiLSwPFWu656vpMm2kZdi2JsPiRFEgUXG4AhfreSAB"
              width="40"
              height="50"
              alt=""
            />
          </Link>
        </div>
        <div className="pool_header_items">
          <Link to="#">
            <li className="pool_header_menu">Swap</li>
          </Link>
          <Link to="#">
            <li className="pool_header_menu">Staking</li>
          </Link>
          <Link to="#">
            <li className="pool_header_menu">Wallet</li>
          </Link>
          <Link to="#">
            <li className="pool_header_menu">Docs</li>
          </Link>
          <Link to="/wallet">
            <li className="pool_header_menu pool_wallet_icon">
              <MdOutlineAccountBalanceWallet />
            </li>
          </Link>
        </div>
      </div>
      <PoolMain />
    </>
  );
}

export default PoolNav;
