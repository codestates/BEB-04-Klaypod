import { FC, useState } from "react";
import AprNav from "../../pool/apr/AprNav";
import "../../styles/Swap.css";
import { MdOutlineSwapVert, MdAutorenew } from "react-icons/md";

export interface walletProps {
  account: string;
  balance: any;
  Connect: any;
}

const Swap: FC<walletProps> = ({ Connect, account, balance }) => {
  let bal = balance;
  let bals = (bal / 10 ** 18).toFixed(6);

  const [amount, setAmount] = useState(0);

  const onChanges = (event: any) => {
    setAmount(event.target.value);
  };

  return (
    <>
      <AprNav account={account} Connect={Connect} />
      <div className="swap_wrapper">
        <span className="swap_title_text">
          원하는 자산으로{" "}
          <span className="swap_title_text_color">스왑(교환)</span>하세요
        </span>
        <div className="swap_container">
          <div className="swap_item">
            <div className="swap_from">
              <li className="swap_from_text">From</li>
              <li className="swap_from_num">보유 수량: {bals}</li>
            </div>
            <input
              className="swap_from_input"
              value={amount}
              placeholder="0"
              type="number"
              onChange={onChanges}
            />
            <div className="swap_to">
              <li className="swap_to_text">To</li>
              <li className="swap_to_num">보유 수량: </li>
            </div>
            <input
              className="swap_to_input"
              value={amount * 3.72}
              placeholder="0"
              type="number"
              onChange={onChanges}
            />
            <li>
              <img
                className="swap_img"
                src="https://gateway.pinata.cloud/ipfs/QmQ3r111nAQanHNbeswS87AYzNWWfMQ6h19tbpR5fFNt2E"
                width="45"
                height="45"
                alt=""
              />
            </li>
            <li>
              <MdOutlineSwapVert className="swap_img_icon" />
            </li>
            <li>
              <img
                className="swap_img_pod"
                src="https://gateway.pinata.cloud/ipfs/Qma1ravBNPf2boV4wzCnfhNEVScod2dRcq8eowCkoMfcG5"
                width="45"
                height="45"
                alt=""
              />
            </li>

            <div className="swap_fee">
              <li className="swap_fee_title">예상 수수료</li>
              <li className="swap_fee_icon">- %</li>
            </div>
            <div className="swap_slippage">
              <li className="swap_slippage_title">슬리피지</li>
              <li className="swap_slippage_icon">- %</li>
            </div>
            <div className="swap_btn_wrap">
              <div className="swap_btn_item">
                <li className="swap_btn_start">
                  <MdAutorenew className="swap_btn_icon" />
                  Swap
                </li>
              </div>
            </div>
            {/* <img
              src="https://gateway.pinata.cloud/ipfs/QmdMZoxTfKAJCKiyqPLiNPFGCr2jnXx1ktxiys2BfQNSbZ"
              alt=""
              width="100"
              height="100"
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Swap;
