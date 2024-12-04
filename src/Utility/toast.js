import { toast as rToast } from "react-toastify";

export const DEFAULT_AUTO_CLOSE_DELAY = 5000;

/**
 * @typedef {ToastType} [toast = 'error']
 * @property {String} error
 * @property {String} info
 * @property {String} success
 */

/**
 * this methods show/udpates toast
 * @param {Object} TOASTS current active toasts key object
 * @param {string} key key for current toast
 * @param {String} message msg should appear in toast
 * @param {ToastType} type type for toast
 * @param {Number} extraDelay (optional) if we want to add more delay ot toast default = 0
 * @param {Function} onClose (optional) callback
 */
export const showToast = (
  TOASTS,
  key,
  message,
  type = "error",
  extraDelay = 0,
  onClose
) => {
  const toastId = TOASTS[key];
  if (rToast.isActive(toastId)) {
    rToast.update(toastId, {
      render: message,
      autoClose: DEFAULT_AUTO_CLOSE_DELAY + extraDelay,
      type,
      onClose,
    });
  } else {
    TOASTS[key] = rToast(message, {
      autoClose: DEFAULT_AUTO_CLOSE_DELAY + extraDelay,
      // position: rToast.POSITION.BOTTOM_CENTER,
      toastId: key,
      type,
      onClose,
    });
  }
};

const toast = {
  error: (message, TOASTS, key) => showToast(TOASTS, key, message, "error"),
  success: (message, TOASTS, key) => showToast(TOASTS, key, message, "success"),
  info: (message, TOASTS, key) => showToast(TOASTS, key, message, "info"),
};

export default toast;
