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
	data: {
		marieAmount: 0,
		alexAmount: 0,
		jimiAmount: 0,
	},
	mounted: function() {
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
	},
	methods: {
		newPurchase: function() {
			console.log("new purchase")
		}
	}
})