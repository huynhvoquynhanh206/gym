import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createAppServer } from "../index.mjs";

function todayInVietnam() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

async function jsonRequest(baseUrl, path, options = {}) {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const response = await fetch(`${baseUrl}${path}`, { ...options, headers });
  const payload = await response.json();
  return { response, payload };
}

test("complete account, profile, check-in, order and community flow", async (t) => {
  const tempDir = await mkdtemp(join(tmpdir(), "kho-mon-gym-"));
  const server = createAppServer({ databaseUrl: "", dbFile: join(tempDir, "test.sqlite"), distDir: join(tempDir, "missing-dist") });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;

  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    await rm(tempDir, { recursive: true, force: true });
  });

  const health = await jsonRequest(baseUrl, "/api/health");
  assert.equal(health.response.status, 200);
  assert.equal(health.payload.ok, true);
  assert.equal(health.payload.database, "sqlite");

  const registration = await jsonRequest(baseUrl, "/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email: "member@example.com", password: "strong-password" }),
  });
  assert.equal(registration.response.status, 201);
  assert.equal(registration.payload.user.email, "member@example.com");
  assert.ok(registration.payload.token);
  const auth = { Authorization: `Bearer ${registration.payload.token}` };

  const profile = await jsonRequest(baseUrl, "/api/profile", {
    method: "PUT",
    headers: auth,
    body: JSON.stringify({
      name: "Nguyen Van A",
      height: "170",
      weight: "70",
      age: "25",
      gender: "male",
      goal: "gain_muscle",
      targetWeight: "75",
      workoutsPerWeek: 4,
    }),
  });
  assert.equal(profile.response.status, 200);
  assert.equal(profile.payload.profile.name, "Nguyen Van A");

  const checkin = await jsonRequest(baseUrl, "/api/checkins", {
    method: "POST",
    headers: auth,
    body: JSON.stringify({ date: todayInVietnam() }),
  });
  assert.equal(checkin.response.status, 201);
  assert.equal(checkin.payload.streak, 1);

  const menu = await jsonRequest(baseUrl, "/api/menu");
  assert.equal(menu.response.status, 200);
  assert.ok(menu.payload.items.length >= 8);

  const order = await jsonRequest(baseUrl, "/api/orders", {
    method: "POST",
    headers: auth,
    body: JSON.stringify({ calorieTarget: 300, notes: "low salt", menuItemId: menu.payload.items[0].id }),
  });
  assert.equal(order.response.status, 201);
  assert.equal(order.payload.order.mealName, menu.payload.items[0].name);

  const post = await jsonRequest(baseUrl, "/api/posts", {
    method: "POST",
    headers: auth,
    body: JSON.stringify({ topic: "Training", body: "Database-backed training update" }),
  });
  assert.equal(post.response.status, 201);

  const liked = await jsonRequest(baseUrl, `/api/posts/${post.payload.post.id}/like`, {
    method: "POST",
    headers: auth,
  });
  assert.equal(liked.response.status, 200);
  assert.equal(liked.payload.liked, true);
  assert.equal(liked.payload.likes, 1);

  const me = await jsonRequest(baseUrl, "/api/auth/me", { headers: auth });
  assert.equal(me.response.status, 200);
  assert.equal(me.payload.profile.goal, "gain_muscle");
});
