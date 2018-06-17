// Based on https://github.com/andreassolberg/jso/tree/version3

var ROOTURL = "https://launchpad.37signals.com";
const RESTROOT = 'https://3.basecampapi.com/3823897';
const RESTROUTE = RESTROOT + '/buckets/1/todolists/1/todos.json';

var jso = new JSO({
	providerID: "Basecamp",
    client_id: "91332c0c39c3d4a9be23362ce10ad71e0912fc25",
    response_type: "web_server",
	redirect_uri: "/auth",
	authorization: ROOTURL + "/authorization/new"
});

// Catch the response after login:
jso.callback();

var token = localStorage.getItem('tokens-Taskbook');


// Trigger OAuth 2 authentication sequence:
function oauthLogin() {

	jso.getToken();

}

// Log out and wipe all memory of the session:
function oauthLogout() {
	jso.wipeTokens();
}

// Monitor the login button:
$('#login').click(function() {
    oauthLogin();
});

// Monitor the logout button:
$('#logout').click(function() {
    oauthLogout();
	window.location.href = "/";
});

(function() {
	// If we are on the home page, redirect to tasklist.html:
	if ( location.pathname == "/" ) {
		// If we have a token, assume we're logged in:
		if ( token !== null ) {
			window.location.href = "/tasklist.html";
		}

	} else {
		// If we have a token, assume we're logged in:
		if ( token !== null ) {
			// Enable JSO jQuery wrapper:
			JSO.enablejQuery($);
		} else {
			// If we're not logged in, redirect to the login page:
			window.location.href = "/";
		}
	}
})();
