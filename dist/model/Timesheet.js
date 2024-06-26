"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConfig_1 = __importDefault(require("../postgressDB/pgConfig"));
class Timesheet extends sequelize_1.Model {
}
Timesheet.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    employeeId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Employee",
            key: "id"
        }
    },
    shiftId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Shift",
            key: "id"
        }
    },
    projectName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    taskName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fromDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    toDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: pgConfig_1.default,
    tableName: "Timesheet"
});
exports.default = Timesheet;
