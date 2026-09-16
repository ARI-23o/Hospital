import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../server/src/index.js";

describe("Doctor Authentication & Live OPD Queue API", () => {
  let authToken = "";

  it("should fail authentication with invalid passcode", async () => {
    const res = await request(app).post("/api/auth/login").send({ passcode: "wrong-passcode-123" });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

  it("should authenticate doctor with valid passcode and return session token", async () => {
    const res = await request(app).post("/api/auth/login").send({ passcode: "sarda@2026" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("session");
    expect(res.body.session).toHaveProperty("token");
    expect(res.body.session).toHaveProperty("user", "Dr. Sagar Damodar Sarda");
    authToken = res.body.session.token;
  });

  it("should verify active session token via POST /api/auth/verify", async () => {
    const res = await request(app).post("/api/auth/verify").send({ token: authToken });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("valid", true);
    expect(res.body.session).toHaveProperty("user", "Dr. Sagar Damodar Sarda");
  });

  it("should return live queue status publicly via /api/opd/queue", async () => {
    const res = await request(app).get("/api/opd/queue");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("current_token");
    expect(res.body).toHaveProperty("next_token");
    expect(res.body).toHaveProperty("status");
  });

  it("should update OPD queue tokens via POST /api/opd/queue", async () => {
    const res = await request(app)
      .post("/api/opd/queue")
      .send({ current_token: 25, next_token: 26, estimated_wait_mins: 15 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.queue).toHaveProperty("current_token", 25);
  });

  it("should log out and invalidate session token", async () => {
    const res = await request(app).post("/api/auth/logout").send({ token: authToken });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);

    // Verify token is now rejected
    const verifyRes = await request(app).post("/api/auth/verify").send({ token: authToken });

    expect(verifyRes.status).toBe(401);
    expect(verifyRes.body).toHaveProperty("valid", false);
  });
});
