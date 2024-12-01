import bcrypt from "bcryptjs";

const users = [
  {
    name: "Jacky Chan",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    jobTitle: "Head of HR",
    grade: "6",
    employeeID: "500000",
  },
  {
    name: "John Doe",
    email: "john@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    jobTitle: "Driver",
    grade: "1",
    employeeID: "60092389",
  },
  {
    name: "Oliver Queen",
    email: "oliver@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    jobTitle: "Graduate Trainee",
    grade: "3",
    employeeID: "9802389",
  },
  {
    name: "Mercy Jack",
    email: "mercy@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    jobTitle: "Graduate Trainee",
    grade: "3",
    employeeID: "60095689",
  },
  {
    name: "Barry Allen",
    email: "barry@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    jobTitle: "Financial Controller",
    grade: "4B",
    employeeID: "90095643",
  },
];

export default users;
