const request = require("supertest");
const app = require("../src/app");

describe("Notes API", () => {
  it("should create a note", async () => {
    const res = await request(app)
      .post("/notes")
      .send({ title: "Test", content: "Hello" });

    expect(res.statusCode).toBe(201);
  });
});
