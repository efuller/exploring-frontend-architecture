import { useRef, useState } from "react";

export const useConfirmationModal = (isOpen = false) => {
  const [showModal, setShowModal] = useState(isOpen)
  const [confirmed, setConfirmed] = useState(false);

  const cancelButtonRef = useRef(null)

  return {
    cancelButtonRef,
    confirmed,
    showModal,
    setConfirmed,
    setShowModal,
  }
}