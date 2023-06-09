import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { App } from "./App";

const testWalletJson =
  '{"address":"88a5c2d9919e46f883eb62f7b8dd9d0cc45bc290","Crypto":{"cipher":"aes-128-ctr","ciphertext":"10adcc8bcaf49474c6710460e0dc974331f71ee4c7baa7314b4a23d25fd6c406","cipherparams":{"iv":"1dcdf13e49cea706994ed38804f6d171"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"bbfa53547e3e3bfcc9786a2cbef8504a5031d82734ecef02153e29daeed658fd"},"mac":"1cf53b5ae8d75f8c037b453e7c3c61b010225d916768a6b145adf5cf9cb3a703"},"id":"fb1280c0-d646-4e40-9550-7026b1be504a","version":3}\n';

vi.mock("./workerInstance", () => {
  return {
    workerInstance: {
      encryptWallet: async () => {
        return testWalletJson;
      },
      getPrivateKey: () => {},
    },
  };
});

describe("App", () => {
  it("should create a wallet with mocked address", async () => {
    render(<App />);

    const input = screen.getByLabelText("password for my new wallet:");
    const button = screen.getByText("create");

    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: "123" } });

    expect(button).toBeEnabled();
    fireEvent.click(button);

    await waitFor(() => {
      const address = screen.getByText(
        "address: 0x88a5c2d9919e46f883eb62f7b8dd9d0cc45bc290"
      );
      expect(address).toBeInTheDocument();
    });
  });
});
