var inactive,active;
getInactive = function() {
	axios.get('/api/university/inactive')
	.then(function (response) {
		inactive = response.data.response;
		html = '';
		response.data.response.map(function(el,pos){
			html += `<tr onclick="openModal(${pos},false)"><th>${pos+1}</th><td>${el.email}</td><td>${el.id}</td></tr>`
		})
		document.querySelector('#inactiveUni tbody').innerHTML = html;
	})
	.catch(function (error) {
		console.log(error);
	});
}

getActive = function() {
	axios.get('/api/university/active')
	.then(function (response) {
		active = response.data.response;
		html = '';
		response.data.response.map(function(el,pos){
			html += `<tr onclick="openModal(${pos},true)"><th>${pos+1}</th><td>${el.email}</td><td>${el.id}</td></tr>`
		})
		document.querySelector('#activeUni tbody').innerHTML = html;
	})
	.catch(function (error) {
		console.log(error);
	});
}

getInactive();
getActive();

openModal = function(index, status) {
	if(!status) {
		$('#univ-activate').show();
	} else {
		$('#univ-activate').hide();
	}
	uni = (status) ? active[index] : inactive[index];
	$('#univ-address').html(uni.address)
	$('#univ-email').html(uni.email)
	$('#univ-name').html(uni.id)
	//$('#univ-phone').html(uni.phone)
	$('#univ-activate').attr('data-index',index)
	$('#univModal').modal('show')
}

activate = function(ob) {
	index = $(ob).attr('data-index');
	axios.post('/api/university/activate',{email:inactive[index].email, address:inactive[index].address})
	.then(function (response) {
		getInactive();
		getActive();
		$('#univModal').modal('hide')
	})
	.catch(function (error) {
		console.log(error);
	});
}
