const request = require("supertest");
const app = require("../index");

describe("User Routes", () => {
  let token;

  beforeAll(async () => {
    const response = await request(app).get("/auth").query({
      username: "testuser",
      password: "testpassword",
    });
    token = response.body.token;
  });

  it("should update user information", async () => {
    const response = await request(app)
      .put("/update/:id") // Assurez-vous d'avoir un ID valide ici
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "newusername",
      });

    expect(response.status).toBe(204);
  });

  it("should get user data", async () => {
    const response = await request(app)
      .get("/data")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should delete user", async () => {
    const response = await request(app)
      .delete("/delete/:id")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
