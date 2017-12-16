import { action, observable } from 'mobx'
import { auth } from './request'

class RootStore {
  constructor (props) {
    this.notif = new NotificationStore()
    this.user = new UserStore()
  }
}
class NotificationStore {
  @observable notification = ''
  @observable timeOutNotif = null

  @action add(msg, status) {
    let errDiv = document.getElementById('notification')

    this.notification = msg
    errDiv.classList.add(status)
    clearTimeout(this.timeOutNotif)
    this.timeOutNotif = setTimeout(() => {
      this.notification = ''
      errDiv.classList.remove(status)
    }, 2000)
  }
}

class UserStore {
  @observable isLogged = false
  @observable user = {}

  @action logState(state) {
    this.isLogged = state
    auth().get('/me').then(res => {
      this.user = res.data.user
    }).catch(err => {
      if (err.response) {
        global.localStorage.removeItem('token')
      }
    })
  }
}

let store = new RootStore()

export default store
