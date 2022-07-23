import { FC } from "react";
import "../styles/WalletConnect.css";

interface WalletConnectProps {
  modalOpen: any;
  account: string;
  onClickConnect: any;
}

const WalletConnect: FC<WalletConnectProps> = ({
  modalOpen,
  account,
  onClickConnect,
}) => {
  return (
    <div className={modalOpen ? "modal_background modal_true" : "modal_true"}>
      <div className="modal_wrapper">
        <p className="modal_cancle">&times;</p>
        <div className="modal_container">
          {account ? (
            <div className="wallet_ok_connect">
              <img
                className="modal_img"
                src="https://gateway.pinata.cloud/ipfs/QmS9BUPfHHiSY4CT6WGyEGrUb8KCj7Ro8BPtZLT7VFDwgM"
                width="40"
                height="40"
                alt=""
              />
              <p className="modal_text">Kaikas 연결완료</p>
            </div>
          ) : (
            <div className="modal_connect">
              <img
                className="modal_img"
                src="https://gateway.pinata.cloud/ipfs/QmS9BUPfHHiSY4CT6WGyEGrUb8KCj7Ro8BPtZLT7VFDwgM"
                width="40"
                height="40"
                alt=""
              />
              <p className="modal_text" onClick={onClickConnect}>
                Kaikas 연결
              </p>
            </div>
          )}
          <div className="modal_connect">
            <img
              className="modal_img_klip"
              src="https://gateway.pinata.cloud/ipfs/QmSMLxdWuyZPzTXTvPak6aJmDd7K4rmcA5DcSdWiFXeD3m"
              width="50"
              height="50"
              alt=""
            />
            <p className="modal_text">Klip 연결</p>
          </div>
          <div className="modal_connect">
            <img
              className="modal_img"
              src="https://gateway.pinata.cloud/ipfs/QmReLa5ZEaDqY6h2u1MARNzAjbrJV2FGXX5Jhxf1NX9GbF"
              width="40"
              height="40"
              alt=""
            />
            <p className="modal_text">MetaMask 연결</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;
