var app = new Vue({
	el: '#app',
	data: {
		marieAmount: "100",
		alexandreAmount: "100",
		jimiAmount: "100",
	},
	created: () => {
		console.log("Created")
	},
	methods: {
		newPurchase: () => {
			console.log("new purchase")
		}
	}
})