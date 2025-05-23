'use client';
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Liff, liff as liffModule } from '@line/liff';

const LiffContext = createContext<{
  liff: Liff | null;
  liffError: string | null;
}>({ liff: null, liffError: null });

export const useLiff = () => useContext(LiffContext);

export const LiffProvider: FC<PropsWithChildren<{ liffId: string }>> = ({
  children,
  liffId,
}) => {
  const [liff, setLiff] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  // const initLiff = useCallback(async () => {
  //   try {
  //     const liffModule = await import('@line/liff');
  //     const liff = liffModule.default;
  //     console.log('LIFF init...');

  //     await liff.init({ liffId });

  //     console.log('LIFF init succeeded.');
  //     setLiff(liff);
  //   } catch (error) {
  //     console.log('LIFF init failed.');
  //     setLiffError((error as Error).toString());
  //   }
  // }, [liffId]);

  // // init Liff
  // useEffect(() => {
  //   console.log('LIFF init start...');
  //   initLiff();
  // }, [initLiff]);

  // useEffect(() => {
  //   const liff = liffModule.default;
  //   liff.init({ liffId });
  //   setLiff(liff);
  // }, [liffId]);

  useEffect(() => {
    liffModule.init({ liffId }).then(() => {
      setLiff(liffModule);
    });
  }, []);

  useEffect(() => {
    if (liff) {
      liff.ready.then(() => {
        alert('LIFF is ready');
      });
    }
  }, [liff]);

  return (
    <LiffContext.Provider
      value={{
        liff,
        liffError,
      }}
    >
      {children}
    </LiffContext.Provider>
  );
};
