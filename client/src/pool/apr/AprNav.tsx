import { FC, useState } from "react";
import { Link } from "react-router-dom";
import WalletConnect from "../../wallet/WalletConnect";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import "../../styles/AprNav.css";
import swal from "sweetalert";

export interface onClickProps {
  account: string;
  Connect: any;
}

const AprNav: FC<onClickProps> = ({ Connect, account }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const switchModal = () => {
    setModalOpen((check: boolean) => !check);
  };

  const walletSwal = () => {
    swal({
      text: "지갑을 연결하세요!",
      icon: "warning",
    });
  };
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
          <Link to="/swap">
            <li className="pool_header_menu">Swap</li>
          </Link>
          <Link to="/staking">
            <li className="pool_header_menu">Staking</li>
          </Link>
          {account ? (
            <Link to="/wallet">
              <li className="pool_header_menu">Wallet</li>
            </Link>
          ) : (
            <Link to="#">
              <li className="pool_header_menu" onClick={walletSwal}>
                Wallet
              </li>
            </Link>
          )}

          <Link to="#">
            <li className="pool_header_menu">Docs</li>
          </Link>
          <li
            className="pool_header_menu pool_wallet_icon"
            onClick={switchModal}
          >
            <WalletConnect
              modalOpen={modalOpen}
              account={account}
              onClickConnect={Connect}
            />
            <MdOutlineAccountBalanceWallet />
          </li>
        </div>
      </div>
    </>
  );
};

export default AprNav;
