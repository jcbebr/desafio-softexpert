const apiAdress = 'http://localhost:8080/api/'
export { apiAdress }

function getLoggedUserId() {
	return sessionStorage.getItem('loggedUserId');
}

function isLoggedIn() {
	return getLoggedUserId() != 0
}

function setLoggedUser(id) {
	sessionStorage.setItem('loggedUserId', id);
}

export { getLoggedUserId, isLoggedIn, setLoggedUser }


const getUsers = (callBack) => {
	fetch(apiAdress + 'user')
		.then(res => res.json())
		.then((result) => {
			callBack(result['data'])
		})
}

const postUsers = (body, callBack) => {
	if (isLoggedIn()) body.loggedUserId = getLoggedUserId()
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
		credentials: 'include'
	}

	fetch(apiAdress + 'user', requestOptions)
		.then(res => res.json())
		.then((result) => {
			callBack()
		})
}

export { getUsers, postUsers }

const getProduct = (callBack) => {
	fetch(apiAdress + 'product')
		.then(res => res.json())
		.then((result) => {
			callBack(result['data'])
			// console.log(result['data'])
		})
}

const postProduct = (body, callBack) => {
	if (isLoggedIn()) body.loggedUserId = getLoggedUserId()
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
		credentials: 'include'
	}

	fetch(apiAdress + 'product', requestOptions)
		.then(res => res.json())
		.then((result) => {
			callBack()
		})
}

const patchProduct = (body, callBack) => {
	if (isLoggedIn()) body.loggedUserId = getLoggedUserId()
	const requestOptions = {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
		credentials: 'include'
	}

	fetch(apiAdress + 'product', requestOptions)
		.then(res => res.json())
		.then((result) => {
			// console.log(result['error'])
			callBack()
		})
}

const deleteProduct = (body, callBack) => {
	if (isLoggedIn()) body.loggedUserId = getLoggedUserId()
	const requestOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
		credentials: 'include'
	}

	fetch(apiAdress + 'product', requestOptions)
		.then(res => res.json())
		.then((result) => {
			callBack()
		})
}

export { getProduct, postProduct, patchProduct, deleteProduct }

const getProductType = (callBack) => {
	fetch(apiAdress + 'product/type')
		.then(res => res.json())
		.then((result) => {
			callBack(result['data'])
		})
}

export { getProductType }

const getSale = (query, callBack) => {
	fetch(apiAdress + 'sale?' + new URLSearchParams(query).toString())
		.then(res => res.json())
		.then((result) => {
			//console.log({'sales' : result['data']})
			callBack(result['data'])
		})
}

const postSale = (body, callBack) => {
	if (isLoggedIn()) body.loggedUserId = getLoggedUserId()
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
		credentials: 'include'
	}

	fetch(apiAdress + 'sale', requestOptions)
		.then(res => res.json())
		.then((result) => {
			callBack()
		})
}

const patchSale = (body, callBack) => {
	if (isLoggedIn()) body.loggedUserId = getLoggedUserId()
	const requestOptions = {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
		credentials: 'include'
	}

	fetch(apiAdress + 'sale', requestOptions)
		.then(res => res.json())
		.then((result) => {
			// console.log(result['error'])
			callBack()
		})
}

const deleteSale = (body, callBack) => {
	if (isLoggedIn()) body.loggedUserId = getLoggedUserId()
	const requestOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
		credentials: 'include'
	}

	fetch(apiAdress + 'sale', requestOptions)
		.then(res => res.json())
		.then((result) => {
			callBack()
		})
}

export { getSale, postSale, patchSale, deleteSale }


const getSaleProduct = (query, callBack) => {
	fetch(apiAdress + 'saleproduct?' + new URLSearchParams(query).toString())
		.then(res => res.json())
		.then((result) => {
			//console.log({'products' : result['data']})
			callBack(result['data'])
		})
}

const postSaleProduct = (body, callBack) => {
	if (isLoggedIn()) body.loggedUserId = getLoggedUserId()
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
		credentials: 'include'
	}

	fetch(apiAdress + 'saleproduct', requestOptions)
		.then(res => res.json())
		.then((result) => {
			callBack(result)
		})
}

export { getSaleProduct, postSaleProduct }