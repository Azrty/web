import { action, observable } from 'mobx'


class Store {
  @observable error = ''
  @observable timeOutError = null
  @observable isLogged = false

  @action notif(msg, status) {
    let errDiv = document.getElementById('error')

    this.error = msg
    errDiv.classList.add(status)
    clearTimeout(this.timeOutError)
    this.timeOutError = setTimeout(() => {
      this.error = ''
      errDiv.classList.remove(status)
    }, 2000)
  }

  @action logState(state) {
    this.isLogged = state
  }
}

let store = new Store()

export default store
