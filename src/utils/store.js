import { observable, action, useStrict } from 'mobx'

useStrict(true)
class Store {
  @observable chat
  @observable conUserList

  constructor (props) {
    this.users = []
    this.shops = []
    this.purchases = []
  }

}

const store = new Store()
export default store
export { Store }