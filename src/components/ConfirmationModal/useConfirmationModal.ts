import { useRef, useState } from "react";

export const useConfirmationModal = (isOpen = false) => {
  const [open, setOpen] = useState(isOpen)
  const [confirmed, setConfirmed] = useState(false);

  const cancelButtonRef = useRef(null)

  return {
    cancelButtonRef,
    confirmed,
    open,
    setConfirmed,
    setOpen,
  }
}