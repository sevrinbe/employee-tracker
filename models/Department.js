const BaseEntity = require("./BaseEntity");

class Department extends BaseEntity {
    constructor(dbConnection) {
        super(dbConnection);
    }

    findById(id) {
        return super.findById("id, name", "departments", id)
    }
}






module.exports = Department;
