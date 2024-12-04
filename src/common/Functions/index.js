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
export const clubArray = (arr, id) => {
  return arr.reduce((acc, val) => {
    const index = acc.findIndex((el) => el[id] === val[id]);
    if (index !== -1) {
      const key = Object.keys(val)[1];
      acc[index][key] = val[key];
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
};
