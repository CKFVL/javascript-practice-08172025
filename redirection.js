https://love2dev.com/blog/ways-to-use-javascript-redirect-to-another-page/

reasons why you might want to redirect to a new page or URL:
-	You want to redirect based on language, location or viewport
-	The user has submitted a form and you want to direct them to the next page in the sequence e.g., redirecting from shopping cart preview to payment page, redirect(301)
-	The page may require authorization
-	Redirect from HTTP to HTTPS
-------------------------------------------------------------------------------
SUMMARY:
window.location object manages the address loaded by browser.
window.location.assign("new URL")
window.location.replace("new URL") // recommended than assign as it doesn't maintain history
	e.g., location.replace(window.location.href.replace("http:",  "https:"));
}
The replace method keeps the session history clean, and the assign method allows the user to back track through the URL history.

window.location.reload // reload: force network request OR reload(true): load document from cache
window.location.search

To change the browser's address you should use the location.href property. Changing this value triggers the browser to load the new URL.
-------------------------------------------------------------------------------

window.location object manages the address loaded by browser.
Manipulating the location object is how you manage page redirects using JavaScript. 
The location object has properties and methods to trigger a JavaScript page redirect.

The location object properties you need to familiarize yourself with are:
	hash: used for single page apps and single page websites
	host: the URL's domain
	hostname: similar to host
	href: the full URL
	origin: the URL's protocol and domain
	pathname: the URL slug or page after the origin
	port: if a port is included in the URL
	protocol: http, https, ftp, ftps, etc
	
Each of these properties are strings and support all the standard string methods like replace, which we will use in this tutorial.
The location object methods are:
	assign: sets the location object to the new URL
	reload: forces the page to reload using the same URL
	replace: triggers a redirect, which we will explore in depth
	search: allows you to interrogate the queryString

Assign and replace look similar, but have a different constraints. 
-	The assign method loads the resource at the new URL and preserves the previous entry in the browser's navigation history.
	This means the user can hit the back button and go to the original page
-	The replace method does the same thing, except the original or 'current' resource is not retained in the browser's history.
	This means the user cannot hit the back button to go to the original page.

When you have changed an address, for example a new domain name, you should perform a 301 redirect. This is where the server sends an HTTP status code of 301, with the new address.
A 301 status code tells the user agent: i.e. the browser or search engine spider, there is a new address. This is sort of like when you move and submit an address change to the post office. Your mail is forwarded.
A 301 redirect allows you to keep the traffic and hopefully your search engine ranking.
Normally you would do this from the server. There are times when this is not possible and you would need to use a JavaScript redirect to a URL.

Normally you would do this from the server. There are times when this is not possible and you would need to use a JavaScript redirect to a URL.
This is pretty simple, just include one of the following snippets:
window.location.assign("new target URL");
//or
window.location.replace("new target URL");
I would recommend using replace because the original URL is not valid. So retaining it in their session history might confuse them and trigger an automatic redirect anyway.

location.replace is useful for any 301 redirect scenario, including when you need to redirect from HTTP to HTTPS. But a more succinct way to redirect from HTTP to HTTPS using JavaScript is the following code snippet:
if (location.protocol !== "https:"){
 location.replace(window.location.href.replace("http:", 
 "https:"));
}


Another time where using the location.replace method is useful is submitting forms.
This is not the right choice 100% of the time, but should be a consideration. A good example is checking out of a shopping cart.
Once the user clicks the button to submit payment it is typically not a good idea for them to go back to the cart. This can cause all sorts of confusion and potential duplicate orders.

Refresh a Page:
There are times when you will want to programatically refresh or reload a page using JavaScript. Typically you would place a button or action element on the page for the user to initiate the refresh. Automatically performing a page refresh can be a confusing and jarring experience for your user, so minimize that tactic.
The location.reload method reloads the current document, just like the user pressed F5 or the browser reload button.

The default setting reloads the page from browser cache, if it is available. You can force the method to bypass local cache and retrieve the document from the network by passing true to the method.
location.reload();  //refreshes from cache
//or
location.reload(true); //to force a network request

I think the best etiquette is to use JavaScript to refresh the page in response to a user action. This is typically in response to a click or touch event handler.

You should be aware, if the user has scroll the page the browser may not retain their current scroll position. Most modern browsers seem to handle this well, but this is not always the case.

You are refreshing a page, and the content and document structure has most likely changed from what their originally rendered. In these cases the browser may not be able to determine where to reliably place the scroll position. In these cases the browser does not scroll the page and the positioning is the top.

There is also a security check in place with this call to prevent external scripts from using this method maliciously. This relates to the Same origin Policy. If this happens a DOMException is thrown with a SECURITY_ERROR.

In response to the cart or any form being submitted you need to add a click or pointer event handler to intercept the action. In the handler method you should include a return false to prevent the form from being submitted to the server.
 
    submitBtn.addEventListener("click", function (evt) {
    evt.preventDefault();  
window.location.replace("new target URL");
  return false;
  });
You would do this normally when you create a client-side form handler, so don't forget this when you are adding JavaScript code to redirect to a new another page.

JavaScript Redirect in a Single Page App (SPA):
A core principle of Single Page Web Applications (SPA) is things that used to live on the server now live in the browser. One of those responsibilities is managing redirections. For example when you make an AJAX call to a secure service and without a valid authorization token. The service should return a 401 status code. When receiving a 401 status code the application should redirect the user to the login address.

In classic web development the AJAX request would have been a page request or post back. The server recognizes the unauthorized state and performs the proper redirect server-side. In ASP.NET we do this with the response.redirect function.

In a SPA the client application's code needs to manage the redirect. I have encountered two common scenarios; redirecting to an external party or (secure token server) STS or to the application's login view. The internal redirection is fairly easy, change the hash fragment's route to the login view.

window.location.hash = "#!login";

If you are familiar with single page applications you will recognize this as how to use JavaScript to redirect to another page.
Remember when redirecting to a new page due to stale or missing authentication token you are most likely using active authentication and need to persist the authentication token somewhere, like IndexedDB.
If you are using passive authentication the page will post back to the authentication server and the token returned, typically in the header.

Redirecting to an STS normally involves changing the browser's address from the SPA URL to the authentication URL. 
The STS URL is most likely on a completely different domain, server, etc.
Whatever the case may be the location must change. Most developers', me included, first reaction was to look for a location.redirect method.
It does not exist.
To change the browser's address you should use the location.href property. Changing this value triggers the browser to load the new URL.

window.location.href = myLoginUrl;
Now the browser loads the new target. In this scenario the user then logins using the STS and return to the application authenticated.

Authentication is one scenario you might find yourself needing to programatically redirecting the user. Of course there are many other scenarios where you might need to redirect a user either internally or externally in the course of normal application usage.

Summary
There are different reasons why you might need to redirect from one page to another. Try to configure these on the server as much as possible. But there are many common scenarios where you need to use JavaScript to perform a page redirect.

The window.location object has properties and methods you can manipulate using JavaScript to redirect to different URLs. The location.replace and location.assign can be very helpful. The replace method keeps the session history clean, and the assign method allows the user to back track through the URL history.

example:
http://plnkr.co/edit/MwJrk5?p=preview
