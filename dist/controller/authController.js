"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const Employee_1 = __importDefault(require("../model/Employee"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, assignedShiftHours, role } = req.body;
    const existingEmployee = yield Employee_1.default.findOne({ where: email });
    if (existingEmployee) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
    const employee = yield Employee_1.default.create({
        name,
        email,
        password: hashedPassword,
        assignedShiftHours,
        role
    });
    res.status(201).json({ employee });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const employee = yield Employee_1.default.findOne({ where: { email } });
    if (!employee) {
        return res.status(400).json({ message: "Invaild email or password" });
    }
    const isMatch = yield bcryptjs_1.default.compare(password, employee.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invaild email or password" });
    }
    const token = (0, jwt_1.generateToken)(employee.id);
    res.status(200).json({ token });
});
exports.login = login;
