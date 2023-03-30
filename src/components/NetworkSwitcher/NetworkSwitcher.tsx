import { FC } from "react";

import { useStore } from "../../store";

import classes from "./NetworkSwitcher.module.css";

export const NetworkSwitcher: FC = () => {
  const changeProvider = useStore.use.changeProvider();
  const providerName = useStore.use.providerName();
  const lock = useStore.use.lock();

  return (
    <div className={classes.container}>
      Network/
      <div
        className={classes.switcher}
        onClick={lock ? () => {} : changeProvider}
      >
        {providerName}
      </div>
    </div>
  );
};
