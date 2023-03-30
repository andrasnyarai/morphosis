import { FC } from "react";

import classes from "./ProgressButton.module.css";

type Props = {
  isLoading: boolean;
  isDisabled: boolean;
  loadingText: string;
  buttonText: string;
  onClick: () => void;
};

export const ProgressButton: FC<Props> = ({
  isLoading,
  loadingText,
  buttonText,
  onClick,
  isDisabled,
}) => {
  return isLoading ? (
    <div
      style={{
        animationName: classes.fade,
        animationIterationCount: "infinite",
        animationDuration: "5s",
      }}
    >
      {loadingText}
    </div>
  ) : (
    <button onClick={onClick} disabled={isDisabled}>
      {buttonText}
    </button>
  );
};
