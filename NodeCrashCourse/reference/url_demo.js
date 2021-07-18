const url = require('url');


const myUrl = new URL('htttp://mywebsite.com/hello.html?id=100&status=active');

//Serialized URL
console.log(myUrl.href);
console.log(myUrl.toString());

//Host - root doamin
console.log(myUrl.host);

//HOstName (does not get port)
console.log(myUrl.hostname);

//PathName
console.log(myUrl.search);

//Serialized query
console.log(myUrl.search);

//Params object
console.log(myUrl.searchParams);

//Add param
myUrl.searchParams.append('abc', '123');
console.log(myUrl.searchParams);

//Loop through params
myUrl.searchParams.forEach((value, name) => console.log(`${name}: ${value}`));