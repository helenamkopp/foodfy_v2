const db = require('../../config/db')

module.exports = {
    create(data, fileId) {
        const query = `
            INSERT INTO chefs (
                name,
                file_id
            ) VALUES ($1, $2)
            RETURNING id
        `

        const values = [
            data.name,
            fileId
        ]

        return db.query(query, values)
    },
    find(id) {
        return db.query(`
            SELECT chefs.*,
                    files.path as path
            FROM chefs 
            LEFT JOIN files ON (chefs.file_id = files.id)
            WHERE chefs.id = $1
        `, [id])
    },
    file(id) {
        return db.query('SELECT * FROM files WHERE id = $1', [id])
    },
    update(data, fileId) {
        const query = `
            UPDATE chefs SET
                name    = $1,
                file_id = $2
            WHERE id = $3
        `
        const values = [
            data.name,
            fileId,
            data.id
        ]

        return db.query(query, values)
    },
    delete(id) {
        return db.query ('DELETE FROM chefs WHERE id = $1', [id])
    },
    all() {
        return db.query ('SELECT * FROM chefs')
    }
}