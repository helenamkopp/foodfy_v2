const db = require('../../config/db')

module.exports = {
    all() {
        return db.query (`
            SELECT recipes.id as recipe_id, * 
            FROM recipes
            JOIN chefs ON (recipes.chef_id = chefs.id)
            ORDER BY recipes.created_at DESC
        `)
    },
    find(id) {        
        return db.query (`SELECT * FROM RECIPES WHERE ID = $1`, [id])
    },
    create(data) {
        const query = `
            INSERT INTO RECIPES (
                title,
                chef_id,
                ingredients,
                preparation,
                information
            ) VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `

        const values = [
            data.recipe_title,
            data.chef_id,
            data.ingredient,
            data.preparation,
            data.info
        ]

        return db.query(query, values)
    },
    update(data) {
        const query = `
            UPDATE recipes SET
                chef_id = $1,
                title = $2,
                ingredients = $3,
                preparation = $4,
                information = $5
            WHERE id = $6
        `

        const values = [
            data.chef_id,
            data.recipe_title,
            data.ingredient,
            data.preparation,
            data.info,
            data.id
        ]

        return db.query(query, values)
    },
    delete(id) {
        return db.query (`DELETE FROM recipes WHERE id = $1`, [id])
    },
    files(id) {
        return db.query (`
            SELECT * 
            FROM recipes
            JOIN recipe_files ON (recipes.id = recipe_files.recipe_id)
            JOIN files ON (recipe_files.file_id = files.id)
            WHERE recipes.id = $1
        `, [id])
    },
    search(params) {
        const { filter } = params

        let query = "",
            filterQuery = `WHERE`

        filterQuery = `
            ${filterQuery}
            recipes.title ilike '%${filter}%'
            OR recipes.information ilike '%${filter}%'
        `

        query = `
            SELECT recipes.* ,
                    chefs.name as chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ${filterQuery}
        `

        return db.query(query)
    },
    findChefRecipes(chef_id) {
        return db.query(`
            SELECT * 
            FROM recipes 
            WHERE chef_id = $1
            ORDER BY recipes.created_at DESC
            `, [chef_id])
    }
}