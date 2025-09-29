import './dotenv.js'
import { pool } from './database.js'
import shopData from '../data/shops.js'

const createShopsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS shops;

    CREATE TABLE IF NOT EXISTS shops (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      locations TEXT NOT NULL,
      rec VARCHAR(255) NOT NULL,
      website VARCHAR(255) NOT NULL
    );
  `

  try {
    await pool.query(createTableQuery)
    console.log("🎉 shops table created successfully")
  } catch (err) {
    console.error("⚠️ error creating shops table", err)
  }
}

const seedShopsTable = async () => {
  await createShopsTable()

  shopData.forEach((shop) => {
    const insertQuery = {
      text: `
        INSERT INTO shops (slug, name, image, locations, rec, website)
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
      values: [
        shop.slug,
        shop.name,
        shop.image,
        shop.locations,
        shop.rec,
        shop.website
      ]
    }

    pool.query(insertQuery, (err, res) => {
      if (err) {
        console.error('⚠️ error inserting shop', err)
        return
      }
      console.log(`✅ ${shop.name} added successfully`)
    })
  })
}

seedShopsTable()