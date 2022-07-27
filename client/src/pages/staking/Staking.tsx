import { FC } from "react";
import AprNav from "../../pool/apr/AprNav";
import "../../styles/Staking.css";
import { MdOutlineAccountBalance } from "react-icons/md";

export interface walletProps {
  account: string;
  balance: any;
  Connect: any;
}

const Staking: FC<walletProps> = ({ Connect, account, balance }) => {
  let bal = balance;
  let bals = (bal / 10 ** 18).toFixed(6);

  return (
    <>
      <AprNav account={account} Connect={Connect} />
      <div className="staknig_wrapper">
        <span className="staknig_title_text">
          자산을 스테이킹하여{" "}
          <span className="staking_title_text_color">이자 수익</span>을 얻으세요
        </span>
        <div className="staknig_container_big">
          <div className="staknig_item">
            <div className="staknig_from">
              <img
                className="staknig_img_pod"
                src="https://gateway.pinata.cloud/ipfs/Qma1ravBNPf2boV4wzCnfhNEVScod2dRcq8eowCkoMfcG5"
                width="45"
                height="45"
                alt=""
              />
              <li className="staknig_from_title">KLAYPOD</li>
              <li className="staknig_from_text">총 예치 규모 (TVL) </li>
              <li className="staknig_from_num">$ 250,714</li>
            </div>
            <li>
              <input
                className="staknig_from_input"
                placeholder="0"
                type="number"
              />
            </li>
            <div className="staknig_to">
              <li className="staknig_to_num">보유 수량: {bals}</li>
            </div>
            <div className="staknig_container_two">
              <div className="staknig_fee">
                <li className="staknig_fee_title">예상 연 수익율</li>
                <li className="staknig_fee_icon">68.7 %</li>
              </div>
            </div>
            <div className="staknig_container_three">
              <div className="staknig_btn_item">
                <div className="staknig_btn_container">
                  <div className="staknig_btn">
                    Staking
                    <MdOutlineAccountBalance className="staknig_btn_icon" />
                  </div>
                  <div className="staknig_btn_text">
                    * 180일 동안 락업 됩니다
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staking;
