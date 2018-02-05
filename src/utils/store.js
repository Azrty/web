import { action, observable } from 'mobx'
import { auth, flatSharing } from './request'

class RootStore {
  constructor (props) {
    this.notif = new NotificationStore()
    this.user = new UserStore()
    this.flatSharing = new FlatSharingStore()
  }
}
class NotificationStore {
  @observable notification = ''
  @observable timeOutNotif = null

  @action add (msg, status) {
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

  @action logState (state) {
    auth().get('/me').then(res => {
      this.isLogged = state
      this.user = res.data.user
    }).catch(err => {
      if (err.response) {
        global.localStorage.removeItem('token')
      }
    })
  }
}

class FlatSharingStore {
  @observable flatSharings = []
  @observable currentFlatSharingId = ''
  @observable currentFlatSharingName = ''
  @observable currentFlatSharingOwners = []
  @observable currentFlatSharingUsers = []
  @observable currentFlatSharingShopList = []

  @action getFlatSharings () {
    flatSharing().get(`/flatsharing`)
    .then(res => {
      if (res.data.success === true) {
        this.flatSharings = res.data.flatSharings
      }
    }).catch(err => {
      if (err.response) {
        console.log(err.response)
      }
    })
  }

  @action getFlatSharing (id) {
    flatSharing().get(`/flatsharing/${id}`)
    .then(res => {
      if (res.data.success === true) {
        this.currentFlatSharingId = res.data.flatSharing._id
        this.currentFlatSharingName = res.data.flatSharing.name
        this.currentFlatSharingOwners = res.data.flatSharing.owners
        this.currentFlatSharingUsers = res.data.flatSharing.users
        this.currentFlatSharingShopList = res.data.flatSharing.shoppingList
      }
    }).catch(err => {
      if (err.response) {
        console.log(err.response)
      }
    })
  }

  @action deleteById (id) {
    flatSharing().delete(`/flatsharing/${id}`).then(res => {
      if (res.data.success === true) {
        this.flatSharings.splice(this.flatSharings.findIndex(elmt => elmt._id === id), 1)
      }
    }).catch(err => {
      if (err.response) {
        console.log(err)
      }
    })
  }
}

let store = new RootStore()

export default store

export {
  UserStore,
  NotificationStore,
  FlatSharingStore
}
