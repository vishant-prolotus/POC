function register() {
	var email = document.getElementById("email").value
	var password = document.getElementById("password").value
	var id = document.getElementById("universityID").value
	console.log(email);
	console.log(password);
	console.log(id);
	axios.post('/api/account/create', {
		email: email,
		id: id,
		password: password
	})
	.then(function (response) {
		console.log(response);
	})
	.then(function () {
		window.location.replace('/login')
	})
	.catch(function (error) {
		console.log(error);
	});
}
