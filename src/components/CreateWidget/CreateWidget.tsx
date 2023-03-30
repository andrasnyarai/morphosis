import { useState, FC } from "react";

import { useStore } from "../../store";
import { getRandomIntInclusive, getSHA256Hash } from "../../utils";
import { ProgressButton } from "../ProgressButton";

import classes from "./CreateWidget.module.css";

export const CreateWidget: FC = () => {
  const addWallet = useStore.use.addWallet();
  const setLock = useStore.use.setLock();
  const worker = useStore.use.worker();

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createWallet = async () => {
    const privateKey = await getSHA256Hash(
      getRandomIntInclusive(0, 100_000_000_000)
    );

    setIsLoading(true);
    setLock(true);

    const encryptedJson = await worker.encryptWallet(privateKey, password);
    setLock(false);
    setIsLoading(false);
    setPassword("");

    addWallet(JSON.parse(encryptedJson));
  };

  return (
    <div className={classes.container}>
      <div className={classes.inputContainer}>
        <label htmlFor="wallet-main-password">
          password for my new wallet:{" "}
        </label>
        <input
          id="wallet-main-password"
          value={password}
          type="password"
          className={classes.input}
          onChange={(event) => {
            if (isLoading) return;
            setPassword(event.target.value);
          }}
        />
      </div>
      <div className={classes.buttonContainer}>
        <ProgressButton
          isLoading={isLoading}
          isDisabled={!password}
          loadingText="hang on tight, creating your wallet..."
          buttonText="create"
          onClick={createWallet}
        />
      </div>
    </div>
  );
};
