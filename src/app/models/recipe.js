const db = require("../../config/db")

module.exports = {

  create(data, callback) {

    const query = `INSERT INTO recipes (
        chef_id, 
        image, 
        title, 
        ingredients, 
        preparation, 
        information
       ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`

    const values = [
      data.autor,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information
    ]

    db.query(query, values, function (err, results) {
      if (err) throw `Erro no Banco de Dados: ${err}`

      callback(results.rows[0])
    })
  },

  all(callback) {
    db.query(`SELECT recipes.*, chefs.name AS chef_name FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`, function (err, results) {
      if (err) throw `Erro no Banco de Dados: ${err}`
      callback(results.rows)
    })
  },

  find(id, callback) {
    db.query(`SELECT recipes.*, chefs.name AS chef_name FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = $1`, [id], function (err, results) {
      if (err) throw `Erro no Banco de Dados: ${err}`
      callback(results.rows[0])
    })
  },

  update(data, callback) {
    const query = `UPDATE recipes SET 
                        chef_id = ($1), 
                        image = ($2),
                        title = ($3), 
                        ingredients = ($4), 
                        preparation = ($5), 
                        information = ($6)
                        WHERE id = $7`

    const values = [
      data.autor,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id
    ]

    db.query(query, values, function (err, results) {
      if (err) throw `Erro no Banco de Dados: ${err}`
      callback()
    })
  },

  delete(id, callback) {
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], function (err, results) {
      if (err) throw `Erro no Banco de Dados: ${err}`

      return callback()
    })
  },

  chefOptions(callback) {
    db.query(`SELECT name, id FROM  chefs`, function (err, results) {
      if (err) throw `Erro no Banco de Dados: ${err}`

      callback(results.rows)
    })
  },

  findBy(filter, callback) {
    db.query(`SELECT recipes.*, chefs.name AS chef_name FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'`, function (err, results) {
      if (err) throw `Erro no Banco de Dados: ${err}`
      callback(results.rows)
    })
  },

  paginate(params) {
    const { filter, limit, offset, callback } = params

    let query = "",
      filterQuery = "",
      totalQuery = `(SELECT count(*) FROM recipes) AS total`


    if (filter) {
      filterQuery = `WHERE recipes.title ILIKE '%${filter}%'`
      totalQuery = `(
                SELECT count(*) FROM recipes
                ${filterQuery}
            ) AS total`
    }

    query = `SELECT recipes.*, ${totalQuery}
                FROM recipes 
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                ${filterQuery}        
                GROUP BY recipes.id
                ORDER BY title ASC
                LIMIT $1 OFFSET $2`

    db.query(query, [limit, offset], function (err, results) {
      if (err) throw `Erro no Banco de Dados: ${err}`
      callback(results.rows)
    })
  }

}