import { HDNodeWallet, Wallet } from "ethers";

export const encryptWallet = async (privateKey: string, password: string) => {
  const wallet = new Wallet(`0x${privateKey}`);
  return wallet.encrypt(password);
};

export const getPrivateKey = async (
  wallet: HDNodeWallet,
  password: string
): Promise<string> => {
  const decryptedWallet = await Wallet.fromEncryptedJson(
    JSON.stringify(wallet),
    password
  );
  return decryptedWallet.privateKey;
};
