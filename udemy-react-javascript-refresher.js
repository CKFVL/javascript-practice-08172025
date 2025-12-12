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
react-scripts:
as raw reactjs code (JSX is not standard js code) won't execute on browser
react build process runs in background and injects transformed source (raw reactjs) code into script tags
also, the code will be minified

In a typical javascript environment, type="module" makes sure the js file as module which unlocks importing a file into another using import/export.
But in react, the script tags don't have type=module. 
React build process will actually merges all the files into big files. 
this will make browsers that don't natively support import/native syntax can just download couple of javascript bundles instead of loading all individual files.

################
default export of a variable: 

export default "testvalue"

Only 1 default export is allowed.

################
to import all variables from a file

e.g. import * as util from "util.js" 

################
