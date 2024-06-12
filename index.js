require('dotenv').config()
const fs = require("fs")
const Fastify = require('fastify')
const fastify = Fastify({
  logger: true
})
const pool = require("./db")

fastify.post("/users", async (req, res) => {
  const { first_name, last_name, email, age } = req.body;
  try {
    const dbRes = pool.query("insert into users(first_name, last_name, email, age) values($1, $2, $3, $4);", [first_name, last_name, email, age]);
    return {
      success: true,
      error: {}
    }
  } catch (error) {
    return {
      success: false,
      error: {
        message: "Internal server error"
      }
    }
  }
})

fastify.delete("/users/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const dbRes = pool.query("delete from users where email = $1;", [email]);
    return {
      success: true,
      error: {}
    }
  } catch (error) {
    return {
      success: false,
      error: {
        message: "Internal server error"
      }
    }
  }
})

fastify.get("/users", async (req, res) => {
  try {
    const dbRes = await pool.query("select * from users order by email, first_name, last_name, age limit 200;")
    return {
      success: true,
      error: {},
      data: dbRes.rows
    }
  } catch (error) {
    return {
      success: false,
      error: {
        message: "Internal server error"
      }
    }
  }
})

try {
  var sql = fs.readFileSync('migration.sql').toString();
  pool.query(sql);
  fastify.listen({ port: 3000, host: '0.0.0.0' })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
