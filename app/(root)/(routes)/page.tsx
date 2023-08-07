"use client";

import { useStoreModal } from '@/hooks/use-store-modal';

import { useEffect } from 'react';

/* The code is defining a functional component called `SetupPage`. Inside the component, it is using
the `useStoreModal` hook to access the `onOpen` and `isOpen` values from the store. */
/**
 * The SetupPage component renders a div with the text "Root Page" and triggers the onOpen function
 * from the useStoreModal hook when the isOpen state is false.
 * @returns The SetupPage component is returning a div element with the class name 'p-4' and the text
 * "Root Page".
 */
const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  

  return null;
}

export default SetupPage;