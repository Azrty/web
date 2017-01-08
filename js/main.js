var get = (url, cb) => {
	var token = localStorage.getItem('token')

	if (!token)
		return cb('Not connected', null)

	var request = new XMLHttpRequest()
	request.open('GET', url, true)
	
	request.onload = () => {
	  if (request.status >= 200 && request.status < 400) {
		  try {
			  var res = JSON.parse(request.responseText)
			  cb(null, res)
		  } catch (e) {
			  cb('No JSON', null)
		  }
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
		<div class="container" v-if="connected">
			<div class="center">
				<div id="marie" class="item">
					<div>
						{{ marieAmount }}
					</div>
					<div>
						Marie
					</div>
				</div>
				<div id="alex" class="item">
					<div>
						{{ alexAmount }}
					</div>
					<div>
						Alex
					</div>
				</div>
				<div id="jimi" class="item">
					<div>
						{{ jimiAmount }}
					</div>
					<div>
						Jimi
					</div>
				</div>
			</div>
			<div class="new_purchase" @click="newPurchase">
				<svg viewBox="0 0 24 24">
				    <path fill="#2c3e50" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
				</svg>
			</div>
		</div>
		<div class="container" v-else>
			<div class="center">
				<input type="text" id="username">
				<input type="password" id="password">
				<button id="submit" @click="signin">Signin</button>
			</div>
		</div>
	`,
	data: {
		marieAmount: 0,
		alexAmount: 0,
		jimiAmount: 0,
		connected: false
	},
	created: function() {
		var token = localStorage.getItem('token')

		if (token)
			this.connected = true
	},
	mounted: function() {
		if (this.connected) {
			get('http://localhost:3000/purchases', (err, data) => {
				if (err)
					return console.log(err)

				var total = 0
				data.purchases.forEach((purchase) => {
					if (purchase.username === "Marie")
						this.marieAmount += purchase.amount
					if (purchase.username === "Alex")
						this.alexAmount += purchase.amount
					if (purchase.username === "Jimi")
						this.jimiAmount += purchase.amount
					total += purchase.amount
				})
				document.querySelector("#marie").style.height = this.marieAmount * 100 / total + '%'
				document.querySelector("#alex").style.height = this.alexAmount * 100 / total + '%'
				document.querySelector("#jimi").style.height = this.jimiAmount * 100 / total + '%'
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