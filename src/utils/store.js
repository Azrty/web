import { observable, action, computed, useStrict } from 'mobx'

useStrict(true)

class Store {
  @observable users
  @observable shops
  @observable purchases

  constructor (props) {
    this.users = []
    this.shops = []
    this.purchases = []
  }

  @computed get totalAmount () {
    let amount = 0
    this.users.forEach(elem => {
      amount += elem.amount
    }, this);
    return amount
  }

  @action setStore (data) {
    this.purchases = data
    data.forEach(elem => {
      if (this.users.find((obj) => obj.username === elem.username) === undefined) {
        let amount = 0;
        data.forEach(searchData => {
          if (elem.username === searchData.username) {
            amount += searchData.amount;
          }
        });
        this.users.push({
          username: elem.username,
          amount
        });
      }
      if (this.shops.indexOf(elem.shop) === -1) {
        this.shops.push(elem.shop);
      }
    }, this);
  }
}

const store = new Store()
export default store
export { Store }