// const sequelize = require("../setup/database");
// const User = require("../models/users.model");

// describe("User Model", () => {
//   beforeAll(async () => {
//     await sequelize.sync();
//   });

//   it("should create a new user", async () => {
//     const user = await User.create({
//       email: "test@example.com",
//       username: "testuser",
//       password: "testpassword",
//     });

//     expect(user).toBeDefined();
//     expect(user.email).toBe("test@example.com");
//     expect(user.username).toBe("testuser");
//   });

//   it("should not create a user with invalid email", async () => {
//     await expect(
//       User.create({
//         email: "invalid-email",
//         username: "testuser",
//         password: "testpassword",
//       })
//     ).rejects.toThrow("Format email incorrect");
//   });

//   afterAll(async () => {
//     // Supprimez l'utilisateur créé à la fin des tests
//     await User.destroy({
//       where: { email: "test@example.com" },
//     });
//   });
// });
