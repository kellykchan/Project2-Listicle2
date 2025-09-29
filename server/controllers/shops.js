import { pool } from '../config/database.js'

const getShops = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM shops ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

// Search shops
const searchShops = async (req, res) => {
  try {
    const { name, location } = req.query

    let query = 'SELECT * FROM shops WHERE 1=1'
    const values = []
    let count = 1

    if (name) {
      query += ` AND name ILIKE $${count}`
      values.push(`%${name}%`)
      count++
    }

    if (location) {
      query += ` AND locations ILIKE $${count}`
      values.push(`%${location}%`)
      count++
    }

    const results = await pool.query(query, values)
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getShops,
  searchShops
}