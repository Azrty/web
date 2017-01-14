var M = {
	get: (url, cb) => {
		var token = localStorage.getItem('token')

		if (!token)
			return cb('Not connected', null)

		var request = new XMLHttpRequest()
		request.open('GET', url, true)
		
		request.onload = () => {
			if (request.status >= 200 && request.status < 400) {
				var res = JSON.parse(request.responseText)
				cb(null, res)
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
	},
	post: (url, obj, cb) => {
		var token = localStorage.getItem('token')

		var request = new XMLHttpRequest()
		request.open('POST', url, true)

		request.onload = () => {
			if (request.status >= 200 && request.status < 400) {
				var res = JSON.parse(request.responseText)
				cb(null, res)
			}
			else if(request.status == 401)
				cb('Not connected', null)
			else
				cb('Wrong server response', null)
		}

		request.onerror = () => {
			cb('Error', null)
		}

		if (token)
			request.setRequestHeader("Authorization", "Bearer " + token)
		request.setRequestHeader("Content-Type", "application/json")
		request.send(JSON.stringify(obj))
	}
}