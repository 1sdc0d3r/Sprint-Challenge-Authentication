const request = require("supertest");
const server = require("../server");

const users = {
  correctUser: {
    username: "newnewnew",
    password: "jnew"
  },
  incorrectUser: {
    username: "jack",
    password: "pass"
  },
  missingUser: {
    username: "jackTest"
  }
};

describe("server", () => {
  describe("auth route", () => {
    it("should return status code 200", async () => {
      const expectedStatusCode = 200;
      const response = await request(server)
        .post("/api/auth/register")
        .send(users.correctUser);
      expect(response.status).toEqual(expectedStatusCode);
    });

    it("should return status code 400 missing creds", async () => {
      const expectedStatusCode = 400;
      const response = await request(server)
        .post("/api/auth/register")
        .send(users.missingUser);
      expect(response.status).toEqual(expectedStatusCode);
    });
    describe("joke route", () => {
      it("should return an array", async () => {
        const response = await request(server).get("/api/jokes");
        expect(Array.isArray(response.body));
      });

      it("should return status 200", async () => {
        const expectedStatusCode = 200;
        const response = await request(server).get("/api/jokes");
        expect(response.status).toEqual(expectedStatusCode);
      });
    });
  });
});
