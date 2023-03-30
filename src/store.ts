import { create, StoreApi, UseBoundStore } from "zustand";
import { persist } from "zustand/middleware";
import { Remote } from "comlink";
import {
  AbstractProvider,
  EtherscanProvider,
  HDNodeWallet,
  JsonRpcProvider,
} from "ethers";

import { workerInstance } from "./workerInstance";

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

const provider = new EtherscanProvider("sepolia");

const bnbProvider = new JsonRpcProvider(
  "https://data-seed-prebsc-1-s1.binance.org:8545",
  { name: "binance", chainId: 97 }
);

const providers = {
  bnb: bnbProvider,
  eth: provider,
};

const defaultProviderName = "eth";

type ProviderName = keyof typeof providers;

type Store = {
  lock: boolean;
  worker: Remote<typeof import("./worker")>;
  setLock: (shouldLock: boolean) => void;
  provider: AbstractProvider;
  providerName: ProviderName;
  wallets: { [providerName in ProviderName]: HDNodeWallet[] };
  changeProvider: () => void;
  addWallet: (wallet: HDNodeWallet) => void;
};

const useStoreBase = create<Store>()(
  persist(
    (set) => ({
      lock: false,
      worker: workerInstance,
      setLock: (lock: boolean) => set({ lock }),
      provider: providers[defaultProviderName],
      providerName: defaultProviderName,
      wallets: Object.keys(providers).reduce(
        (acc, key) => ({ [key]: [], ...acc }),
        {} as Store["wallets"]
      ),
      changeProvider: () =>
        set((state) => {
          const nextProviderName =
            state.providerName === defaultProviderName
              ? "bnb"
              : defaultProviderName;
          return {
            provider: providers[nextProviderName],
            providerName: nextProviderName,
          };
        }),
      addWallet: (wallet: HDNodeWallet) =>
        set((state) => ({
          wallets: {
            ...state.wallets,
            [state.providerName]:
              state.wallets[state.providerName].concat(wallet),
          },
        })),
    }),
    {
      name: "morphosis",
      partialize: (state) => ({ wallets: state.wallets }),
    }
  )
);

export const useStore = createSelectors(useStoreBase);
