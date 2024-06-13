import { DataTypes, Model } from "sequelize";
import sequelize from "../postgressDB/pgConfig";
import Shift from "./Shift";
import Employee from "./Employee";

class Timesheet extends Model {
  public id!: string;
  public employeeId!: string;
  public shiftId!: string;
  public projectName!: string;
  public taskName!: string;
  public fromDate!: Date;
  public endDate!: Date;
}

Timesheet.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Employee",
        key: "id"
      }
    },
    shiftId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Shift",
        key: "id"
      }
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taskName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fromDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    toDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "Timesheet"
  }
);

export default Timesheet;
