function submitData(path){
	var data = editor.getSession().getValue();
	$.ajax({
		type: "POST",
		url: path,
		data: { code: data},
		success: function(d){
			$('#result').html(d);
		}
	});
}
window.onload =function() {
	var fileInput = document.getElementById('file');
	fileInput.addEventListener("change", function(e){

		var file = fileInput.files[0];
		var reader = new FileReader();
		var extension = file.name.split('.').pop();
		if (!file) {
			alert("Failed to load file");
		} else if (extension != "pml") {
			alert(file.name + " is not a valid pml file");
		} else {
			reader.onload = function(e) {
				editor.session.doc.setValue(reader.result);
			}
			reader.readAsText(file);
		}
	});

	// Take what the user said their favorite editor was and set it to that.
	// Don't remove from onload
	switch(document.getElementById("editor_choice").innerHTML.trim()) {
		case "NONE":
			none();
			break;
		case "VIM":
			vim();
			break;
		case "EMACS":
			emacs();
			break;
		default:
			none();
	} 
}

// Set the keybinds to vim
function vim(){
	editor.setKeyboardHandler("ace/keyboard/vim");
	sendKeyBindPreference("VIM");
}

// Set the keybinds to emacs
function emacs(){
	editor.setKeyboardHandler("ace/keyboard/emacs");
	sendKeyBindPreference("EMACS");
}

// Set the keybinds to default
function none(){
	editor.setKeyboardHandler("");
	sendKeyBindPreference("NONE");
}

/* Send info to server and let it know that keybinds have been changed so it may
	update it in the database
*/
function sendKeyBindPreference(pref){
	$.ajax({
		type: "GET",
		url: "/binds/"+pref
	});
}

function navbar_file_new_file(){
	// Add code here to actually create a new file on the server size
	editor.session.doc.setValue();
}
function navbar_file_open_file(){
	$('#file').trigger('click');
}
function navbar_file_save(){
	document.forms["send"].submit();
}
function navbar_file_close_file(){
	editor.session.doc.setValue();
}
