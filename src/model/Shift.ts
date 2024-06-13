import { DataTypes, Model } from "sequelize";
import sequelize from "../postgressDB/pgConfig";

class Shift extends Model {
  public id!: string;
  public employeeId!: string;
  public startTime!: Date;
  public endTime!: Date | null;
  public actualHours!: number | null;
}

Shift.init(
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
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    actualHours: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  },
  {
    sequelize,
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
  }
);

export default Shift;
