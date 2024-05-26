const regexMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

const device = window.navigator.userAgent


function checkUserDevice() {
  return device.match(regexMobile) ? 'mobile' : 'desktop'
}


export default checkUserDevice