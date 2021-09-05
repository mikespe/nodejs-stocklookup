const express = require('express')
const app = express()
const port = 3000
var token = '&token=bvp6asv48v6s8216uv40'
var finnurl = 'https://finnhub.io/api/v1/quote?symbol='
const got = require('got');

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
<html>
<body>

<h2>HTML Forms</h2>

<form action="/search">
  <label for="fname">stock search:</label><br>
  <input type="text" id="fname" name="fname" value="John">
</form> 


</body>
</html>

  `)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/search', (req, res) => {
	(async () => {
	try {
		const response = await got(finnurl + req.query.fname + token);
		let jsondata = JSON.parse(response.body)
		console.log(jsondata)
		res.send(`
  <!DOCTYPE html>
<html>
<body>

<h2>HTML Forms</h2>

<form action="/search">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="John">
</form> 

<p>${req.query.fname}</p>
<p>${response.body}</p>
<p>${jsondata.c}</p>

</body>
</html>

  `)
		//=> '<!doctype html> ...'
	} catch (error) {
		console.log(error.response.body);
		//=> 'Internal server error ...'
	}
})();
	
})