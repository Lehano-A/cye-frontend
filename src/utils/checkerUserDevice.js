const regexMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
const device = window.navigator.userAgent

function checkerUserDevice() {
  return device.match(regexMobile) ? 'mobile' : 'desktop'
}

export default checkerUserDevice