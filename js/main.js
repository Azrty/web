var getPurchases = (self, cb) => {
	M.get('https://api.sillypixel.fr/coloc/purchases', (err, data) => {
		if (err)
			return console.log(err)

		var total = 0
		var amounts = []
		data.purchases.forEach((purchase) => {
			var index = self.users.map(user => user.username).indexOf(purchase.username)
			if (!amounts[index])
				amounts[index] = 0
			if (index != -1) {
				amounts[index] += purchase.amount
				total += purchase.amount
			}
		})
		self.users.forEach((user) => {
			index = self.users.map(user => user.username).indexOf(user.username)
			if (index != -1 && document.querySelector("#" + user.username)) {
				self.users[index].amount = amounts[index]
				var height = self.users[index].amount * 100 / total
				document.querySelector("#" + user.username).style.height = height + '%'
			}
		})
		if (cb)
			cb()
	})
}

var app = new Vue({
	el: '#app',
	template: `
		<div class="center" v-if="connected">
			<div class="graph" v-if="!new_purchase">
				<div :id="user.username" class="item" v-for="user in users">
					<div>
						{{ user.amount }}
					</div>
					<div>
						{{ user.username }}
					</div>
				</div>
			</div>
			<div class="new_purchase" v-else>
				<div class="new_purchase">
					<input placeholder="Shop" list="shops" id="shop">
					<datalist id="shops">
						<option value="Super U">
						<option value="Tang Frères">
						<option value="Monoprix">
						<option value="Carrefour">
						<option value="Leclerc">
						<option value="Lidl">
						<option value="Picard">
					</datalist>
					<input placeholder="Price" type="number" id="amount"><br>
					<textarea placeholder="Description" id="description"></textarea><br>
					<button @click="addPurchase">Add purchase</button>
				</div>
			</div>
			<div class="new_purchase_button" @click="newPurchase" v-if="!new_purchase">
				<svg viewBox="0 0 24 24">
				    <path fill="#2c3e50" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
				</svg>
			</div>
			<div class="new_purchase_button" @click="newPurchase" v-else>
				<svg viewBox="0 0 24 24">
				    <path fill="#2c3e50" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
				</svg>
			</div>
		</div>
		<div class="center" v-else>
			<div class="signin">
				<span>{{ error }}</span>
				<input type="text" placeholder="Username" id="username"><br>
				<input type="password" placeholder="Password" id="password" @keyup.enter="signin"><br>
				<button @click="signin">Signin</button>
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
		connected: false,
		new_purchase: false,
		error: ""
	},
	created: function() {
		var token = localStorage.getItem('token')

		if (token)
			this.connected = true
	},
	mounted: function() {
		if (this.connected) {
			getPurchases(this)
		}
	},
	methods: {
		signin: function() {
			M.post('https://api.sillypixel.fr/signin', {
				username: document.querySelector("#username").value,
				password: document.querySelector("#password").value
			}, (err, data) => {
				if (err)
					return console.log(err)

				if (data.token) {
					localStorage.setItem('token', data.token)
					getPurchases(this, () => {
						this.connected = true
					})
				}
				else {
					this.error = data.message
					document.querySelector("#password").value = ''
				}
			})
		},
		newPurchase: function() {
			if (this.new_purchase) {
				this.new_purchase = false
				getPurchases(this)
			}
			else
				this.new_purchase = true
		},
		addPurchase: function() {
			this.new_purchase = false

			M.post('https://api.sillypixel.fr/coloc/purchases', {
				shop: document.querySelector("#shop").value,
				amount: document.querySelector("#amount").value,
				description: document.querySelector("#description").value
			}, (err, data) => {
				if (err)
					return console.log(err)

				if (data.success) {
					getPurchases(this, () => {
						this.new_purchase = false
					})
				}
				else {
					console.log(data.message)
				}
			})
		}
	}
})
