defer attribute in script tag:
defer attribute: defers the imported javascript execution only after the rest of HTML is executed and parsed. 
  (the reason is if the javascript file has dependency on HTML then the HTML elements will be available)
<script src="assets/scripts/app.js defer/>
In react, there might not need this as react includes it as part of build process.

################
js file can be used as a module
type="module" makes sure the js file as module which unlocks importing a file into another using import/export
<script src="assets/scripts/app.js type=module/>

################
<noscript> tag: can be used in HTML <body> tag, to show fallback message
<noscript>
  You need to enable javascript to run this app.
</noscript>

################
