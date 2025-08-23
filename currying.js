// way of constructing functions that allows partial application of a function's arguments
var greet = function (greeting, name) {
    console.log(greeting + ":" + name)
}
greet("hello", "pavan")

// instead with currying
var greetWithCurrying = function (greeting) {
    var namefn = function (name) {
        console.log(greeting + "," + name)
    }

    return namefn;
}
var namefnreturned = greetWithCurrying("hello")
namefnreturned("guru")
#########################
let greeting=function(firstname, lastname){
  console.log('firstname: '+firstname+', '+ 'lastname: '+ lastname)
}

greeting('pavan', 'bhogala')

var addFristName=function(firstName){
  var addLastName=function(lastName){
    console.log('firstname: '+firstName+', '+ 'lastname: '+ lastName)
  }
  return addLastName;
}

let af=addFristName('kumar')
af('bhogala')
#########################
// another example
var addTo = function (fpassed) {
    var add = function (inner) {
        return fpassed + inner;
    };
    return add;
};
var addwithinner = addTo(4); // here value of 4 is preserved in inner function
console.log(addwithinner(99));
