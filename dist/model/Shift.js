"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConfig_1 = __importDefault(require("../postgressDB/pgConfig"));
class Shift extends sequelize_1.Model {
}
Shift.init({
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
    startTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    endTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    actualHours: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true
    }
}, {
    sequelize: pgConfig_1.default,
    tableName: "Shift",
    hooks: {
        afterUpdate: (shift) => {
            if (shift.endTime) {
                const start = new Date(shift.startTime).getTime();
                const end = new Date(shift.endTime).getTime();
                shift.actualHours = (end - start) / (1000 * 60 * 60);
            }
        }
    }
});
exports.default = Shift;
