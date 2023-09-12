const { response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
	user: 'fl0user',
	host: 'ep-black-resonance-23065834.eu-central-1.aws.neon.tech',
	database: 'farma',
	password: '09zahokvGdyf',
	port: 5432,
	ssl: true
})

/**
 * Patient
 */
const getPatients = (request, response) => {
	pool.query('SELECT * FROM patient ORDER BY name ASC', (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const getPatientById = (request, response) => {
	const id = parseInt(request.params.id)
  
	pool.query('SELECT * FROM patient WHERE id = $1', [id], (error, results) => {
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
	  response.status(200).json(results.rows[0])
	})
}

const updatePatient = (request, response) => {
	const id = parseInt(request.params.id)
	const { name, surname, ar } = request.body
  
	pool.query('UPDATE patient SET name = $2, surname = $3, ar = $4 WHERE id = $1 RETURNING *', [id, name, surname, ar], (error, results) => {
	  if (error) {
		throw error
	  }
	  response.status(200).json(results.rows[0])
	})
}

const deletePatient = (request, response) => {
	const id = parseInt(request.params.id)
  
	pool.query('DELETE FROM patient WHERE id = $1', [id], (error, results) => {
	  if (error) {
		throw error
	  }
	  response.status(200).send(`User deleted with ID: ${id}`)
	})
}

/**
 * Medicine
 */
const createMedicine = (request, response) => {
	const { pc, name } = request.body
  
	pool.query('INSERT INTO medicine (pc,name) VALUES ($1, $2) RETURNING *', [pc, name], (error, results) => {
	  if (error) {
		throw error
	  }
	  response.status(200).json(results.rows[0])
	})
}

const updateMedicine = (request, response) => {
	const id = parseInt(request.params.pc)
	const { pc, name } = request.body
  
	pool.query('UPDATE medicine SET name = $2 WHERE pc = $1 RETURNING *', [pc, name], (error, results) => {
	  if (error) {
		throw error
	  }
	  response.status(200).json(results.rows[0])
	})
}

const getMedicineByPc = (request, response) => {
	const pc = parseInt(request.params.pc)
  
	pool.query('SELECT * FROM medicine WHERE pc = $1', [pc], (error, results) => {
	  if (error) {
		throw error
	  }
	  response.status(200).json(results.rows[0])
	})
}

/**
 * Record
 */
const createRecord = (request, response) => {
	const { patient_id, medicine_id, batch, expiration } = request.body
  
	pool.query('INSERT INTO record (patient_id,medicine_id,batch,expiration) VALUES ($1, $2, $3, $4) RETURNING *', [patient_id, medicine_id, batch, expiration], (error, results) => {
	  if (error) {
		throw error
	  }
	  response.status(200).json(results.rows[0])
	})
}

const getRecordsByPatient = (request, response) => {
	const id = parseInt(request.params.id)

	pool.query('SELECT * FROM record left join medicine on medicine.id = medicine_id where patient_id = $1 ORDER BY medicine.name ASC', [id], (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const getRecordByBatch = (request, response) => {
	const batch = request.params.batch;
  
	pool.query('SELECT * FROM record WHERE batch = $1', [batch], (error, results) => {
	  if (error) {
		throw error
	  }
	  response.status(200).json(results.rows[0])
	})
}

const getAll = (request, response) => {
	pool.query('select pc, medicine.name as medicineName, batch, expiration, patient.name as patientName, surname, ar from medicine left join record on medicine.id = record.medicine_id	left join patient on record.patient_id = patient.id', (error, results) => {
	  if (error) {
		throw error
	  }
	  response.status(200).json(results.rows)
	})
}

module.exports = {
	getPatients,
	getPatientById,
	createPatient,
	updatePatient,
	getMedicineByPc,
	createMedicine,
	updateMedicine,
	getRecordByBatch,
	createRecord,
	getRecordsByPatient,
	getAll
}