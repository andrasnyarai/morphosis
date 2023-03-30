import { FC } from "react";

import { useStore } from "./store";
import { Wallet } from "./components/Wallet";
import { NetworkSwitcher } from "./components/NetworkSwitcher";
import { CreateWidget } from "./components/CreateWidget";

import classes from "./App.module.css";

export const App: FC = () => {
  const providerName = useStore.use.providerName();
  const wallets = useStore.use.wallets();

  return (
    <div className={classes.container}>
      <div className={classes.title}>Morphosis ∅</div>
      <NetworkSwitcher />
      <CreateWidget />

      <div className={classes.wallets}>
        {wallets[providerName].map((wallet) => (
          <Wallet wallet={wallet} key={wallet.address} />
        ))}
      </div>
    </div>
  );
};
