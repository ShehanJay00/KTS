const express = require("express");
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeePassword,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");
const protect = require("../middleware/authMiddleware");
const { upload } = require("../util/fileUpload");
const router = express.Router();

//create employee  -- manager
router.post("/", protect, upload.single("image"), createEmployee);
//get all employees
router.get("/", getAllEmployees);
//get a single employee
router.get("/:id", getEmployeeById);
//update employee ---manager
router.patch("/:id", protect, upload.single("image"), updateEmployee);
//change employee password  --manager
router.patch("/changePassword/:id", protect, updateEmployeePassword);
//delete employee  --manager
router.delete("/:id", deleteEmployee);

module.exports = router;
