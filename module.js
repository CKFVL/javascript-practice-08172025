to access/get variable in a file from another file, 
1. add type=module
2. export 
3. import

e.g.
<script src="data/cart.js">
<script type=module src="scripts/amazon.js"> // to access a variable from products.js, use type=module

export const cart = [] in products.js
and then

import {cart} from "data/cart.js"


######################################

modules avoid naming conflicts when a variable need to be used in other files

Also, if the variable name is already defined in a file and need to be imported with same name from another file, then

import {cart as myCart} from "data/cart.js"
const cart=[];

######################################
