 // prevent page referesh on form submission

export function preventPageRefresh(event) {
  event.preventDefault();
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}