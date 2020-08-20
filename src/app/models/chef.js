const db = require("../../config/db")

module.exports = {
    create(data, callback) {
        const query = `INSERT INTO chefs (
        name,
        avatar_url
       ) VALUES ($1, $2) RETURNING id`

        const values = [
            data.name,
            data.avatar_url,
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Erro no Banco de Dados: ${err}`
            callback(results.rows[0])
        })
    },

    all(callback) {
        db.query(`SELECT chefs.*,count(recipes) AS total_recipes FROM chefs
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        GROUP BY chefs.id`, function(err, results) {
            if (err) throw `Erro no Banco de Dados: ${err}`
            callback(results.rows)
        })
    },

    find(id, callback) {
        // console.log(id)
        db.query(`SELECT chefs.*,
        COUNT(recipes.*) AS total  
        FROM chefs LEFT JOIN recipes ON
        (chefs.id = recipes.chef_id) WHERE chefs.id = $1 
        GROUP BY chefs.id `, [id], function(err, results) {
            if (err) throw `Erro no Banco de Dados: ${err}`
            callback(results.rows[0])
        })
    },

    update(data, callback) {
        const query = `UPDATE chefs SET 
                        name = ($1),
                        avatar_url = ($2)
                        WHERE id = $3`

        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Erro no Banco de Dados: ${err}`
            callback()
        })
    },

    delete(id, callback) {
        db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results) {
            if (err) throw `Erro no Banco de Dados: ${err}`

            return callback()
        })
    },

    findReceitasChef(id, callback) {
        db.query(`SELECT recipes.*, chefs.name AS autor 
        FROM recipes LEFT JOIN chefs 
        ON (recipes.chef_id = chefs.id)
        WHERE recipes.chef_id = $1`, [id], function(err, results) {
            if (err) throw `Database Error ${err}`
            callback(results.rows)
        })
    },

    findtotalchef(callback) {
        db.query(`SELECT chefs.*,
        COUNT(recipes) AS total  
        FROM chefs LEFT JOIN recipes ON
        (chefs.id = recipes.chef_id)
        GROUP BY chefs.id`, function(err, results) {
            if (err) throw `Erro no Banco de Dados: ${err}`
            callback(results.rows)
        })
    }
}