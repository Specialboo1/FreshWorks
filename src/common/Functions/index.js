export const handleKeyPress = (
  event,
  ref,
  btn = false,
  click = false,
  setOpen = false
) => {
  if (event.key === "Enter") {
    btn
      ? ref.current.click()
      : setOpen
      ? ref.current.setOpen(true)
      : click
      ? ref.current.click()
      : ref.current.focus();
  }
};
