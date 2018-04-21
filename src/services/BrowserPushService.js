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

  sendNotification (tag, message) {
    if (!isGranted()) {
      return
    }

    var notification = new Notification(message, {
      tag: tag,
      icon: 'https://dummyimage.com/128x128/ff3860/ff3860.png'
    })
  }
}
/* eslint-enable no-undef, no-unused-vars */
