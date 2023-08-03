const Pool = require('pg').Pool
const pool = new Pool({
	user: 'fl0user',
	host: 'ep-black-resonance-23065834.eu-central-1.aws.neon.tech',
	database: 'farma',
	password: '09zahokvGdyf',
	port: 5432,
	ssl: true
})

const getPatients = (request, response) => {
	pool.query('SELECT * FROM patient ORDER BY name ASC', (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const createPatient = (request, response) => {
	const { name, surname, ar } = request.body
  
	pool.query('INSERT INTO patient (name,surname,ar) VALUES ($1, $2, $3) RETURNING *', [name, surname, ar], (error, results) => {
	  if (error) {
		throw error
	  }
	  response.status(201).send(`Patient added with ID: ${results.rows[0].id}`)
	})
  }

module.exports = {
	getPatients,
	createPatient
}