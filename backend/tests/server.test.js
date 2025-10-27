/**
 * Comprehensive route wiring tests.
 *
 * We mock controllers, auth middleware and file upload middleware so tests
 * focus on route wiring (status codes / JSON) and do not depend on DB or
 * external services.
 */
const request = require("supertest");

// Mock auth middleware before requiring the app so route registration uses mocked protect
// authMiddleware exports the protect function directly, so mock it as a function
jest.mock("../middleware/authMiddleware", () => (req, res, next) => {
  // attach a fake person/personType like the real middleware does
  req.person = { id: "test-user" };
  req.personType = "user";
  next();
});

// Mock file upload util to no-op the multer middleware used in routes
jest.mock("../util/fileUpload", () => ({
  upload: { single: () => (req, res, next) => next() },
}));

// Mock controllers used by routes to return simple JSON responses
jest.mock("../controllers/userController", () => ({
  userLogin: (req, res) => res.status(200).json({ action: "userLogin" }),
  getAllUsers: (req, res) => res.status(200).json({ action: "getAllUsers" }),
  getUserprofile: (req, res) =>
    res.status(200).json({ action: "getUserprofile" }),
  getUserById: (req, res) => res.status(200).json({ action: "getUserById" }),
  changePassword: (req, res) =>
    res.status(200).json({ action: "changePassword" }),
  forgotPassword: (req, res) =>
    res.status(200).json({ action: "forgotPassword" }),
  resetPassword: (req, res) =>
    res.status(200).json({ action: "resetPassword" }),
}));

jest.mock("../controllers/managerController", () => ({
  getAllManagers: (req, res) =>
    res.status(200).json({ action: "getAllManagers" }),
  managerLogin: (req, res) => res.status(200).json({ action: "managerLogin" }),
  getManagerProfile: (req, res) =>
    res.status(200).json({ action: "getManagerProfile" }),
}));

jest.mock("../controllers/employeeController", () => ({
  createEmployee: (req, res) =>
    res.status(201).json({ action: "createEmployee" }),
  getAllEmployees: (req, res) =>
    res.status(200).json({ action: "getAllEmployees" }),
  getEmployeeById: (req, res) =>
    res.status(200).json({ action: "getEmployeeById" }),
  updateEmployeePassword: (req, res) =>
    res.status(200).json({ action: "updateEmployeePassword" }),
  updateEmployee: (req, res) =>
    res.status(200).json({ action: "updateEmployee" }),
  deleteEmployee: (req, res) =>
    res.status(200).json({ action: "deleteEmployee" }),
}));

jest.mock("../controllers/busController", () => ({
  createBus: (req, res) => res.status(201).json({ action: "createBus" }),
  getAllBuses: (req, res) => res.status(200).json({ action: "getAllBuses" }),
  getBusById: (req, res) => res.status(200).json({ action: "getBusById" }),
  deleteBusById: (req, res) =>
    res.status(200).json({ action: "deleteBusById" }),
}));

jest.mock("../controllers/roadRouteController", () => ({
  createRoadRoute: (req, res) =>
    res.status(201).json({ action: "createRoadRoute" }),
  getAllRoadRoutes: (req, res) =>
    res.status(200).json({ action: "getAllRoadRoutes" }),
  deleteRoadRoute: (req, res) =>
    res.status(200).json({ action: "deleteRoadRoute" }),
}));

jest.mock("../controllers/ticketController", () => ({
  addTicket: (req, res) => res.status(201).json({ action: "addTicket" }),
  getAllTickets: (req, res) =>
    res.status(200).json({ action: "getAllTickets" }),
}));

// require the app after mocks are in place
const app = require("../server");

describe("Backend route wiring", () => {
  // Users
  test("POST /api/users/login -> userLogin", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "a@b.com", password: "p" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "userLogin");
  });

  test("GET /api/users -> getAllUsers (protected)", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "getAllUsers");
  });

  test("GET /api/users/getUser -> getUserprofile (protected)", async () => {
    const res = await request(app).get("/api/users/getUser");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "getUserprofile");
  });

  test("GET /api/users/:id -> getUserById (protected)", async () => {
    const res = await request(app).get("/api/users/123");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "getUserById");
  });

  test("PATCH /api/users/changePassword -> changePassword (protected)", async () => {
    const res = await request(app)
      .patch("/api/users/changePassword")
      .send({ oldPassword: "a", newPassword: "b" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "changePassword");
  });

  test("POST /api/users/forgotPassword -> forgotPassword", async () => {
    const res = await request(app)
      .post("/api/users/forgotPassword")
      .send({ email: "a@b.com" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "forgotPassword");
  });

  test("PUT /api/users/resetPassword/:resetToken -> resetPassword", async () => {
    const res = await request(app)
      .put("/api/users/resetPassword/token123")
      .send({ password: "new" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "resetPassword");
  });

  // Managers
  test("GET /api/managers -> getAllManagers", async () => {
    const res = await request(app).get("/api/managers");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "getAllManagers");
  });

  test("POST /api/managers/login -> managerLogin", async () => {
    const res = await request(app)
      .post("/api/managers/login")
      .send({ email: "a", password: "b" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "managerLogin");
  });

  test("GET /api/managers/getManager -> getManagerProfile (protected)", async () => {
    const res = await request(app).get("/api/managers/getManager");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "getManagerProfile");
  });

  // Employees
  test("POST /api/employees -> createEmployee (protected)", async () => {
    const res = await request(app).post("/api/employees").send({ name: "e" });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("action", "createEmployee");
  });

  test("GET /api/employees -> getAllEmployees", async () => {
    const res = await request(app).get("/api/employees");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "getAllEmployees");
  });

  test("GET /api/employees/:id -> getEmployeeById", async () => {
    const res = await request(app).get("/api/employees/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "getEmployeeById");
  });

  test("PATCH /api/employees/:id -> updateEmployee (protected)", async () => {
    const res = await request(app)
      .patch("/api/employees/1")
      .send({ name: "updated" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "updateEmployee");
  });

  test("PATCH /api/employees/changePassword/:id -> updateEmployeePassword (protected)", async () => {
    const res = await request(app)
      .patch("/api/employees/changePassword/1")
      .send({ password: "x" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "updateEmployeePassword");
  });

  test("DELETE /api/employees/:id -> deleteEmployee", async () => {
    const res = await request(app).delete("/api/employees/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "deleteEmployee");
  });

  // Buses
  test("POST /api/buses -> createBus (protected)", async () => {
    const res = await request(app).post("/api/buses").send({ busId: "b1" });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("action", "createBus");
  });

  test("GET /api/buses -> getAllBuses", async () => {
    const res = await request(app).get("/api/buses");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "getAllBuses");
  });

  test("GET /api/buses/:id -> getBusById", async () => {
    const res = await request(app).get("/api/buses/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "getBusById");
  });

  test("DELETE /api/buses/:id -> deleteBusById", async () => {
    const res = await request(app).delete("/api/buses/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "deleteBusById");
  });

  // Road routes
  test("POST /api/roadRoutes -> createRoadRoute (protected)", async () => {
    const res = await request(app).post("/api/roadRoutes").send({ name: "r1" });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("action", "createRoadRoute");
  });

  test("GET /api/roadRoutes -> getAllRoadRoutes", async () => {
    const res = await request(app).get("/api/roadRoutes");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "getAllRoadRoutes");
  });

  test("DELETE /api/roadRoutes/:id -> deleteRoadRoute", async () => {
    const res = await request(app).delete("/api/roadRoutes/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "deleteRoadRoute");
  });

  // Tickets
  test("POST /api/tickets -> addTicket (protected)", async () => {
    const res = await request(app).post("/api/tickets").send({ journey: "j1" });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("action", "addTicket");
  });

  test("GET /api/tickets -> getAllTickets", async () => {
    const res = await request(app).get("/api/tickets");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("action", "getAllTickets");
  });
});
