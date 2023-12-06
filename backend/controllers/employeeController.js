const Employee = require("../models/employeeModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { fileSizeFormatter } = require("../util/fileUpload");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { error } = require("console");

//create employee --manager
const createEmployee = asyncHandler(async (req, res) => {
  const personType = req.personType;

  if (personType === "user") {
    res.status(401);
    throw new Error("Not authorized , Please login as a manager");
  }

  const { eId, fullName, email, mobile, role, password } = req.body;

  //validate
  if (!eId || !fullName || !email || !mobile || !role || !password) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  //Manage image upload
  let fileData = {};
  let uploadedFile;

  if (req.file) {
    //upload
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "KTS/employees",
        resource_type: "image",
      });
    } catch (err) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
      fileID: uploadedFile.public_id,
    };

    //delete file from uploads folder
    fs.unlinkSync(req.file.path);
  }

  //hash tha password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const employee = await Employee.create({
      eId,
      fullName,
      email,
      mobile,
      role,
      password: hashedPassword,
      photo: fileData,
    });

    if (employee) {
      res.status(201).json({
        _id: employee._id,
        eId: employee.eId,
        fullName: employee.fullName,
        email: employee.email,
        mobile: employee.mobile,
        role: employee.role,
        photo: employee.photo,
      });
    } else {
      // If employee creation fails, delete the uploaded image from Cloudinary
      if (fileData.filePath) {
        await cloudinary.uploader.destroy(uploadedFile.public_id);
      }
      res.status(400);
      throw new Error(error);
    }
  } catch (error) {
    // If an error occurs, delete the uploaded image from Cloudinary
    if (fileData.filePath) {
      await cloudinary.uploader.destroy(uploadedFile.public_id);
    }
    res.status(400);
    throw new Error(error);
  }
});

//get all emp
const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({}).select("-password");

  if (employees) {
    res.status(200).json(employees);
  } else {
    res.status(404);
    s;
    throw new Error("Employees not found");
  }
});

// get emp by id
const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id).select("-password");

  if (employee) {
    res.status(200).json(employee);
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

//update employee password --manager
const updateEmployeePassword = asyncHandler(async (req, res) => {
  const personType = req.personType;

  if (personType === "user") {
    res.status(401);
    throw new Error("Not authorized , Please login as a manager");
  }

  const employee = await Employee.findById(req.params.id);

  if (employee) {
    const { password } = req.body;

    //hash tha password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    employee.password = hashedPassword;

    const updatedEmployee = await employee.save();

    res.status(200).json({
      _id: updatedEmployee._id,
      eId: updatedEmployee.eId,
      fullName: updatedEmployee.fullName,
      email: updatedEmployee.email,
      mobile: updatedEmployee.mobile,
      role: updatedEmployee.role,
    });
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

//update employee --manager
const updateEmployee = asyncHandler(async (req, res) => {
  const personType = req.personType;

  if (personType === "user") {
    res.status(401);
    throw new Error("Not authorized , Please login as a manager");
  }

  const employee = await Employee.findById(req.params.id);

  if (employee) {
    const { eId, fullName, email, mobile, role } = req.body;

    employee.eId = eId || employee.eId;
    employee.fullName = fullName || employee.fullName;
    employee.email = email || employee.email;
    employee.mobile = mobile || employee.mobile;
    employee.role = role || employee.role;
    // employee.photo =
    //   Object.keys(fileData).length !== 0 ? fileData : employee.photo;
    let updatedEmployee;
    try {
      updatedEmployee = await employee.save();
    } catch (error) {
      res.status(400);
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      throw new Error(error);
    }

    let fileData = {};
    let uploadedFile;

    //delete the existing image from cloudinary
    if (req.file) {
      await cloudinary.uploader.destroy(employee.photo.fileID);

      //upload new image
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "KTS/employees",
          resource_type: "image",
        });
      } catch (err) {
        res.status(500);
        throw new Error("Image could not be uploaded");
      }

      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
        fileID: uploadedFile.public_id,
      };

      //delete file from uploads folder
      fs.unlinkSync(req.file.path);
    }

    updatedEmployee.photo =
      Object.keys(fileData).length !== 0 ? fileData : updatedEmployee.photo;

    try {
      updatedEmployee = await updatedEmployee.save();
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }

    res.status(200).json({
      _id: updatedEmployee._id,
      eId: updatedEmployee.eId,
      fullName: updatedEmployee.fullName,
      email: updatedEmployee.email,
      mobile: updatedEmployee.mobile,
      role: updatedEmployee.role,
      photo: updatedEmployee.photo,
    });
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

//delete employee --manager
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (employee) {
    await employee.deleteOne();
    res.status(200).json({ message: "Employee removed" });
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeePassword,
  updateEmployee,
  deleteEmployee,
};
