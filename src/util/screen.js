import fscreen from 'fscreen';

function openFullscreen(orientaionFuncCallback, setIsToraPageReady) {
  if (!fscreen.fullscreenEnabled) return;

  const { documentElement } = document;
  fscreen
    .requestFullscreen(documentElement)
    .then(orientaionFuncCallback)
    .then(() => setIsToraPageReady(true))
    .catch(() => {
      setIsToraPageReady(true);
    });
}

function closeFullscreen(orientaionFuncCallback) {
  if (!fscreen.fullscreenEnabled) return;

  fscreen
    .exitFullscreen()
    .then(orientaionFuncCallback)
    .catch(() => {});
}

export function lockOrientaion(orientation, setIsToraPageReady) {
  const lockOrientaionFunc = window.screen?.orientation?.lock;
  if (!lockOrientaionFunc || checkOrientation(orientation)) return;

  const rotatedOrientationTypeName = checkOrientation('landscape')
    ? 'portrait-primary'
    : 'landscape-secondary';
  openFullscreen(
    () => window.screen.orientation.lock(rotatedOrientationTypeName),
    setIsToraPageReady
  );
}

export function unlockOrientation() {
  const unlockOrientaionFunc = window.screen?.orientation?.unlock;
  if (!unlockOrientaionFunc) return;

  closeFullscreen(() => window.screen.orientation.unlock());
}

export function toggleOrientationLock(setIsToraPageReady) {
  setIsToraPageReady(false);
  const rotatedOrientation = checkOrientation('landscape')
    ? 'portrait'
    : 'landscape';
  lockOrientaion(rotatedOrientation, setIsToraPageReady);
}

export function checkOrientation(orientation) {
  return window.screen?.orientation?.type?.includes(orientation);
}
