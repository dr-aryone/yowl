/* eslint-disable no-undef, no-unused-vars */
function isGranted () {
  if (!('Notification' in window)) {
    return false
  }

  return Notification.permission === 'granted'
}

export default {
  isGranted () {
    return isGranted()
  },

  requestPermission () {
    return new Promise(function (resolve, reject) {
      Notification.requestPermission(function (permission) {
        resolve(permission === 'granted')
      })
    })
  },

  sendNotification (severity, tag, message) {
    if (!isGranted()) {
      return
    }

    var colors = {
      info: '209cee',
      warn: 'ffdd57',
      error: 'ff3860',
      fatal: '4a4a4a'
    }

    var notification = new Notification(message, {
      tag: tag,
      icon: `https://dummyimage.com/128x128/${colors[severity]}/${colors[severity]}.png`
    })
  }
}
/* eslint-enable no-undef, no-unused-vars */
