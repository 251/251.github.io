var site = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port: '') + '/';

function get_req(what,where) {
	var http = null;

	try {
		http = new XMLHttpRequest;
	} catch(e) {
		var msxml = ['MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP'];

		for (var i=0, len = msxml.length; i < len; ++i) {
			try {
				http = new ActiveXObject(msxml[i]);
				break;
			} catch(e) {}
		}
	}

	if(http) {
		http.onreadystatechange = function() {
			if (http.readyState == 4 && http.status == 200) {
				where.innerHTML = http.responseText;
			}
		}

		http.open('GET', site + what, true);
		http.send('');
	}
}

/*
 * what: url
 * where: div id
 * button: ;)
 * btext: button text (ohne anzeigen/verbergen)
 */
function hide(what, where, button, btext) {
	/* clear and hide div */
	var div = document.getElementById(where);
	div.innerHTML = "";
	div.style.visibility = "hidden";

	/* set button */
	button.value = btext + ' einblenden';
	button.onclick = function() { show(what, where, button, btext) };
}

/*
 * what: url
 * where: div id
 * button: ;)
 * btext: button text (ohne anzeigen/verbergen)
 */
function show(what, where, button, btext) {
	/* clear and show div */
	var div = document.getElementById(where);
	div.innerHTML = "";
	div.style.visibility = "visible";

	/* retrieve content */
	get_req(what,div);

	/* set button */
	button.value = btext + ' verbergen';
	button.onclick = function() { hide(what, where, button, btext) };
}
