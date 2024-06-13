import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import Employee from "../model/Employee";
import { where } from "sequelize";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, assignedShiftHours, role } = req.body;

  const existingEmployee = await Employee.findOne({ where: email });
  if (existingEmployee) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const employee = await Employee.create({
    name,
    email,
    password: hashedPassword,
    assignedShiftHours,
    role
  });

  res.status(201).json({ employee });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const employee = await Employee.findOne({ where: { email } });
  if (!employee) {
    return res.status(400).json({ message: "Invaild email or password" });
  }

  const isMatch = await bcrypt.compare(password, employee.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invaild email or password" });
  }

  const token = generateToken(employee.id);
  res.status(200).json({ token });
};
