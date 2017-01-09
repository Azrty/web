var get = (url, cb) => {
	var token = localStorage.getItem('token')

	if (!token)
		return cb('Not connected', null)

	var request = new XMLHttpRequest()
	request.open('GET', url, true)
	
	request.onload = () => {
		if (request.status >= 200 && request.status < 400) {
			// try {
				var res = JSON.parse(request.responseText)
				cb(null, res)
			// } catch (e) {
			// 	cb('No JSON', null)
			// }
		}
		else if(request.status == 401)
			cb('Not connected', null)
		else
			cb('Wrong server response', null)
	}

	request.onerror = () => {
		cb('Error', null)
	}

	request.setRequestHeader("Authorization", "Bearer " + token)
	request.send()
}

var app = new Vue({
	el: '#app',
	template: `
		<div class="center" v-if="connected">
			<div class="graph">
				<div :id="user.username" class="item" v-for="user in users">
					<div>
						{{ user.amount }}
					</div>
					<div>
						{{ user.username }}
					</div>
				</div>
			</div>
			<div class="new_purchase" @click="newPurchase">
				<svg viewBox="0 0 24 24">
				    <path fill="#2c3e50" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
				</svg>
			</div>
		</div>
		<div class="center" v-else>
			<div class="signin">
				<input type="text" id="username"><br>
				<input type="password" id="password"><br>
				<button id="submit" @click="signin">Signin</button>
			</div>
		</div>
	`,
	data: {
		users: [
			{
				username: "Marie",
				amount: 0
			},
			{
				username: "Alex",
				amount: 0
			},
			{
				username: "Jimi",
				amount: 0
			}
		],
		connected: false
	},
	created: function() {
		var token = localStorage.getItem('token')

		if (token)
			this.connected = false
	},
	mounted: function() {
		if (this.connected) {
			get('http://localhost:3000/purchases', (err, data) => {
				if (err)
					return console.log(err)

				var total = 0
				data.purchases.forEach((purchase) => {
					var index = this.users.map(user => user.username).indexOf(purchase.username)
					if (index != -1) {
						this.users[index].amount += purchase.amount
						total += purchase.amount
					}
				})
				this.users.forEach((user) => {
					index = this.users.map(user => user.username).indexOf(user.username)
					if (index != -1) {
						var height = this.users[index].amount * 100 / total
						document.querySelector("#" + user.username).style.height = height + '%'
					}
				})
			})
		}
		
	},
	methods: {
		signin: function() {
			var username = document.querySelector("#username").value
			var password = document.querySelector("#password").value


		},
		newPurchase: function() {
			console.log("new purchase")
		}
	}
})