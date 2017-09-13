login = function() {
	axios.post('/api/university/signin', {
		email: document.getElementById('email').value,
		password: document.getElementById('password').value
	})
	.then(function (response) {
		location.replace('/sofocle')
		// console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});

}