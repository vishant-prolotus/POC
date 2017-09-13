function setStatus(message) {
	var status = document.getElementById("status");
	status.innerHTML = message;
};

function save() {
	var self = this;
	var roll = parseInt(document.getElementById("roll").value);
	var name = document.getElementById("name").value;
	var marks = parseInt(document.getElementById("marks").value);
	var status;
	if (document.getElementById('pass').checked) {
		status = true;
	}
	if (document.getElementById('fail').checked) {
		status = false;
	}
	this.setStatus("Saving Record... (please wait)");
	axios.post('/api/addrecord', {
		roll: roll,
		name: name,
		marks: marks,
		status: status
	}).then(function(response) {
		self.setStatus("Record Saved !");
	}).catch(function(e) {
		self.setStatus("Error saving record; see log." + e);
	});
}

function fetch() {
	var self = this;
	var roll = parseInt(document.getElementById("rollOut").value);
	axios.post('/api/getrecord', {
		roll: roll
	}).then(function(response) {
		var table = document.getElementById("table");
		var html = '';
		html += '<tr>';
		html += '<td>' + response.data.roll + '</td>';
		html += '<td>' + response.data.name + '</td>';
		html += '<td>' + response.data.marks + '</td>';
		html += '<td>' + response.data.status + '</td>';
		html += '</tr>';
		table.innerHTML = html;
		self.setStatus("Record Fetched.");
	}).catch(function(e) {
		self.setStatus("Error fetching record." + e);
	});
}
