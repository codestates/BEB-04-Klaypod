import { FC } from "react";
import AprNav from "../../pool/apr/AprNav";
import "../../styles/Wallet.css";
import {
  MdOutlineAccountBalanceWallet,
  MdAutorenew,
  MdOutlineAccountBalance,
  MdDoubleArrow,
  MdLaunch,
} from "react-icons/md";
import { Link } from "react-router-dom";

export interface walletProps {
  account: string;
  balance: any;
  Connect: any;
}

const Wallet: FC<walletProps> = ({ Connect, account, balance }) => {
  let str = account;
  let acc = str[0].slice(0, 6) + " ..." + str[0].slice(37, 41).toUpperCase();

  let bal = balance;
  let bals = (bal / 10 ** 18).toFixed(6);

  return (
    <>
      <AprNav account={account} Connect={Connect} />
      <div className="wallet_wrapper">
        <div className="wallet_container">
          <div className="wallet_item">
            <div className="wallet_account">
              <li className="wallet_li_account_title">
                연결된 주소
                <MdDoubleArrow className="wallet_li_account_icon" />
              </li>
              <li className="wallet_li_account">{acc}</li>
            </div>
            <li className="wallet_balance_title">내 자산 현황</li>
            <a
              className="wallet_balance_finder"
              href="https://baobab.klaytnfinder.io/"
              target="_blank"
            >
              klaytnfinder
              <MdLaunch className="wallet_balance_finder_icon" />
            </a>

            <div className="wallet_balance">
              <img
                className="wallet_img"
                src="https://gateway.pinata.cloud/ipfs/QmQ3r111nAQanHNbeswS87AYzNWWfMQ6h19tbpR5fFNt2E"
                width="45"
                height="45"
                alt=""
              />
              <li className="wallet_li_balance">{bals}</li>
              <li className="wallet_li_balance_name">KLAY</li>
              <li className="wallet_li_balance_btn">전송</li>
            </div>
            <div className="wallet_balance">
              <img
                className="wallet_img_pod"
                src="https://gateway.pinata.cloud/ipfs/Qma1ravBNPf2boV4wzCnfhNEVScod2dRcq8eowCkoMfcG5"
                width="45"
                height="45"
                alt=""
              />
              <li className="wallet_li_balance">0</li>
              <li className="wallet_li_balance_name2">POD</li>
              <li className="wallet_li_balance_btn2">전송</li>
            </div>
            <div className="wallet_btn_wrap">
              <div className="wallet_btn_item">
                <li className="wallet_connect_btn" onClick={Connect}>
                  <MdOutlineAccountBalanceWallet className="wallet_connect_icon" />
                  지갑 연결상태 확인
                </li>
                <Link to="/swap">
                  <li className="wallet_swap_btn">
                    <MdAutorenew className="wallet_swap_icon" />
                    스왑 하러가기
                  </li>
                </Link>
                <Link to="/staking">
                  <li className="wallet_staking_btn">
                    <MdOutlineAccountBalance className="wallet_staking_icon" />
                    스테이킹 하러가기
                  </li>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;
