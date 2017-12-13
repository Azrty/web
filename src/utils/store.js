import { action, observable } from 'mobx'


class Store {
  @observable error = ''

  @action notif(msg, status) {
    let errDiv = document.getElementById('error')

    this.error = msg
    errDiv.classList.add(status)
    setTimeout(() => {
      this.error = ''
      errDiv.classList.remove(status)
    }, 2000)
  }
}

let store = new Store()

export default store
