const dbConnection = await dbConfig();


class BaseEntity {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    findAll(table) {
        return this.dbConnection.query('SELECT * FROM ??', [table]);
    }

    findById(columns, id, table) {
        return this.dbConnection.query('SELECT ?? FROM ?? WHERE ID = ?', [columns, table, id]);
    }

    create(obj) {
        return this.dbConnection.query('CREATE ' + obj + ' FROM', [table]);

    }
    
    updateById(id) {
        return this.dbConnection.query('UPDATE ' + id + ' FROM', [table]);

    }

    deleteById(id) {
        return this.dbConnection.query('DELETE ' + id + ' FROM ?', [table]);

    }
}