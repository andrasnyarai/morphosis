import { FC, useEffect, useState } from "react";
import { formatEther, HDNodeWallet } from "ethers";

import { ProgressButton } from "../ProgressButton";
import { useStore } from "../../store";

import classes from "./Wallet.module.css";

type Props = {
  wallet: HDNodeWallet;
};

export const Wallet: FC<Props> = ({ wallet }) => {
  const provider = useStore.use.provider();
  const providerName = useStore.use.providerName();
  const worker = useStore.use.worker();
  const setLock = useStore.use.setLock();
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState("0.0");
  const [privateKey, setPrivateKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const prefixedAddress = `0x${wallet.address}`;

  const decryptWallet = async () => {
    setIsLoading(true);
    setLock(true);
    try {
      const _privateKey = await worker.getPrivateKey(wallet, password);
      setPassword("");
      setPrivateKey(_privateKey);
    } catch (e) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    } finally {
      setLock(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function getBalance() {
      const balance = await provider.getBalance(prefixedAddress);
      const balanceInEth = formatEther(balance);
      setBalance(balanceInEth);
    }
    getBalance();
  }, []);

  return (
    <div className={classes.walletContainer}>
      <div>address: {prefixedAddress}</div>
      <div>
        balance: {balance} {providerName.toUpperCase()}
      </div>
      <div className={classes.buttonContainer}>
        {privateKey ? (
          <div>privateKey: {privateKey}</div>
        ) : (
          <>
            <input
              value={password}
              placeholder="password"
              type="password"
              onChange={(event) => {
                if (isLoading) return;
                setPassword(event.target.value);
              }}
            />
            {error ? (
              <div>wrong password</div>
            ) : (
              <ProgressButton
                isLoading={isLoading}
                isDisabled={!password}
                loadingText="getting your private key"
                buttonText="show private key"
                onClick={decryptWallet}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
