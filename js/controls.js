export function initControls(callbacks) {
  if (callbacks.jump) {
    document.addEventListener("click", callbacks.jump, false);
    document.addEventListener("keydown", callbacks.jump, false);
  }
}
