import { createServer as createHttpServer } from "node:http";
import { createReadStream, existsSync, mkdirSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { randomBytes, scrypt as scryptCallback, timingSafeEqual, createHash } from "node:crypto";
import { promisify } from "node:util";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { DatabaseSync } from "node:sqlite";
import pg from "pg";

const { Pool } = pg;
pg.types.setTypeParser(20, Number);

const scrypt = promisify(scryptCallback);
const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const localEnvFile = join(projectRoot, ".env");
if (existsSync(localEnvFile) && typeof process.loadEnvFile === "function") {
  process.loadEnvFile(localEnvFile);
}
const DEFAULT_DB_FILE = join(__dirname, "data", "kho-mon-gym.sqlite");
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_BODY_BYTES = 1024 * 1024;

const POSTGRES_SCHEMA = `
  CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS sessions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL UNIQUE,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS profiles (
    user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    height TEXT NOT NULL,
    weight TEXT NOT NULL,
    age TEXT NOT NULL,
    gender TEXT NOT NULL CHECK (gender IN ('male','female')),
    goal TEXT NOT NULL CHECK (goal IN ('lose_weight','gain_muscle','maintain','endurance')),
    target_weight TEXT NOT NULL,
    workouts_per_week INTEGER NOT NULL,
    updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS checkins (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    checkin_date TEXT NOT NULL,
    created_at TEXT NOT NULL,
    UNIQUE(user_id, checkin_date)
  );
  CREATE TABLE IF NOT EXISTS menu_items (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    calories INTEGER NOT NULL,
    price_cents INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT NOT NULL,
    protein INTEGER NOT NULL,
    active INTEGER NOT NULL DEFAULT 1
  );
  CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    menu_item_id BIGINT REFERENCES menu_items(id),
    calorie_target INTEGER NOT NULL,
    notes TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'received',
    total_cents INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS posts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    topic TEXT NOT NULL CHECK (topic IN ('Training','Nutrition')),
    author_name TEXT NOT NULL,
    avatar TEXT NOT NULL,
    body TEXT NOT NULL,
    image_url TEXT,
    base_likes INTEGER NOT NULL DEFAULT 0,
    comments_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS post_likes (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL,
    PRIMARY KEY(user_id, post_id)
  );
  CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);
  CREATE INDEX IF NOT EXISTS sessions_expires_at_idx ON sessions(expires_at);
  CREATE INDEX IF NOT EXISTS checkins_user_id_idx ON checkins(user_id);
  CREATE INDEX IF NOT EXISTS orders_user_id_idx ON orders(user_id);
  CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at DESC);
  CREATE INDEX IF NOT EXISTS post_likes_post_id_idx ON post_likes(post_id);
  ALTER TABLE users ENABLE ROW LEVEL SECURITY;
  ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
  ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
  ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
  ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
  ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
  ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
  ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
`;

const MENU_ITEMS = [
  ["Eggs & Sweet Potato", 300, 700, "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop&auto=format", "Boiled eggs, roasted sweet potato and fresh vegetables.", 22],
  ["Chicken Rice Bowl", 420, 950, "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop&auto=format", "Grilled chicken breast, brown rice and steamed vegetables.", 38],
  ["Oatmeal & Fruit", 280, 650, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format", "Oatmeal, banana, berries and a small serving of yogurt.", 16],
  ["Salmon Salad", 350, 1100, "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop&auto=format", "Grilled salmon, mixed greens, tomatoes and light dressing.", 32],
  ["Greek Yogurt Bowl", 250, 600, "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&h=400&fit=crop&auto=format", "Greek yogurt, granola, fresh fruit and a small amount of honey.", 20],
  ["Beef & Broccoli Bowl", 450, 1050, "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=600&h=400&fit=crop&auto=format", "Lean beef, broccoli, brown rice and a low-sodium sauce.", 40],
  ["Tuna Sandwich Set", 380, 800, "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop&auto=format", "Whole-grain tuna sandwich served with a fresh side salad.", 30],
  ["High-Protein Gym Set", 550, 1200, "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?w=600&h=400&fit=crop&auto=format", "Chicken breast, eggs, brown rice and mixed vegetables.", 52],
];

const SEED_POSTS = [
  ["Training", "Jake Morgan", "JM", "Just hit a new personal record — squat 120kg 🔥 After 3 months on the Khơ Mon Gym plan, feeling incredible. Anyone training legs, drop a comment and ask me anything!", "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=480&h=320&fit=crop&auto=format", 48, 12, "2026-07-10T15:00:00.000Z"],
  ["Nutrition", "Sophie Lee", "SL", "Meal prepped the whole week 💪 Each container is about 450 kcal and the macros follow my app plan. Drop a comment if you want the recipe!", "https://images.unsplash.com/photo-1547592180-85f173990554?w=480&h=320&fit=crop&auto=format", 91, 34, "2026-07-10T12:00:00.000Z"],
];

function postgresQuery(sql) {
  let parameter = 0;
  return sql.replace(/\?/g, () => `$${++parameter}`);
}

class PostgresDatabase {
  constructor(pool) {
    this.pool = pool;
    this.kind = "postgres";
  }

  async exec(sql) {
    return this.pool.query(sql);
  }

  prepare(sql) {
    const text = postgresQuery(sql);
    return {
      get: async (...params) => (await this.pool.query(text, params)).rows[0],
      all: async (...params) => (await this.pool.query(text, params)).rows,
      run: async (...params) => {
        const shouldReturnId = /^\s*INSERT\s+INTO\s+(users|orders|posts)\b/i.test(text) && !/\bRETURNING\b/i.test(text);
        const result = await this.pool.query(shouldReturnId ? `${text} RETURNING id` : text, params);
        return { changes: result.rowCount, lastInsertRowid: result.rows[0]?.id };
      },
    };
  }

  async close() {
    await this.pool.end();
  }
}

async function openPostgresDatabase(databaseUrl) {
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
    max: Number(process.env.DATABASE_POOL_SIZE ?? 5),
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });
  const db = new PostgresDatabase(pool);
  await db.exec(POSTGRES_SCHEMA);

  const menuCount = Number((await db.prepare("SELECT COUNT(*) AS count FROM menu_items").get()).count);
  if (menuCount === 0) {
    const insertMenu = db.prepare("INSERT INTO menu_items (name, calories, price_cents, image_url, description, protein) VALUES (?, ?, ?, ?, ?, ?)");
    for (const item of MENU_ITEMS) await insertMenu.run(...item);
  }

  const postCount = Number((await db.prepare("SELECT COUNT(*) AS count FROM posts").get()).count);
  if (postCount === 0) {
    const insertPost = db.prepare("INSERT INTO posts (topic, author_name, avatar, body, image_url, base_likes, comments_count, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    for (const post of SEED_POSTS) await insertPost.run(...post);
  }

  return db;
}

function openDatabase(dbFile) {
  mkdirSync(dirname(dbFile), { recursive: true });
  const db = new DatabaseSync(dbFile);
  db.kind = "sqlite";
  db.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;");
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS profiles (
      user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      height TEXT NOT NULL,
      weight TEXT NOT NULL,
      age TEXT NOT NULL,
      gender TEXT NOT NULL CHECK (gender IN ('male','female')),
      goal TEXT NOT NULL CHECK (goal IN ('lose_weight','gain_muscle','maintain','endurance')),
      target_weight TEXT NOT NULL,
      workouts_per_week INTEGER NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS checkins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      checkin_date TEXT NOT NULL,
      created_at TEXT NOT NULL,
      UNIQUE(user_id, checkin_date)
    );
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      calories INTEGER NOT NULL,
      price_cents INTEGER NOT NULL,
      image_url TEXT NOT NULL,
      description TEXT NOT NULL,
      protein INTEGER NOT NULL,
      active INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      menu_item_id INTEGER REFERENCES menu_items(id),
      calorie_target INTEGER NOT NULL,
      notes TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'received',
      total_cents INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      topic TEXT NOT NULL CHECK (topic IN ('Training','Nutrition')),
      author_name TEXT NOT NULL,
      avatar TEXT NOT NULL,
      body TEXT NOT NULL,
      image_url TEXT,
      base_likes INTEGER NOT NULL DEFAULT 0,
      comments_count INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS post_likes (
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
      created_at TEXT NOT NULL,
      PRIMARY KEY(user_id, post_id)
    );
  `);

  const menuCount = db.prepare("SELECT COUNT(*) AS count FROM menu_items").get().count;
  if (menuCount === 0) {
    const insertMenu = db.prepare("INSERT INTO menu_items (name, calories, price_cents, image_url, description, protein) VALUES (?, ?, ?, ?, ?, ?)");
    for (const item of MENU_ITEMS) insertMenu.run(...item);
  }

  const postCount = db.prepare("SELECT COUNT(*) AS count FROM posts").get().count;
  if (postCount === 0) {
    const insertPost = db.prepare("INSERT INTO posts (topic, author_name, avatar, body, image_url, base_likes, comments_count, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    for (const post of SEED_POSTS) insertPost.run(...post);
  }

  return db;
}

function json(res, status, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
    ...extraHeaders,
  });
  res.end(body);
}

function error(res, status, message, code = "REQUEST_ERROR") {
  json(res, status, { error: { code, message } });
}

async function readJson(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw Object.assign(new Error("Request body is too large."), { status: 413 });
    chunks.push(chunk);
  }
  if (chunks.length === 0) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw Object.assign(new Error("Invalid JSON body."), { status: 400 });
  }
}

function normalizeEmail(value) {
  return String(value ?? "").trim().toLowerCase();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function hashPassword(password) {
  const salt = randomBytes(16);
  const derived = await scrypt(password, salt, 64);
  return `${salt.toString("hex")}:${Buffer.from(derived).toString("hex")}`;
}

async function verifyPassword(password, stored) {
  const [saltHex, hashHex] = String(stored).split(":");
  if (!saltHex || !hashHex) return false;
  const derived = Buffer.from(await scrypt(password, Buffer.from(saltHex, "hex"), 64));
  const storedHash = Buffer.from(hashHex, "hex");
  return storedHash.length === derived.length && timingSafeEqual(storedHash, derived);
}

function tokenHash(token) {
  return createHash("sha256").update(token).digest("hex");
}

async function createSession(db, userId) {
  const token = randomBytes(32).toString("base64url");
  const now = new Date();
  const expires = new Date(now.getTime() + SESSION_TTL_MS);
  await db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(now.toISOString());
  await db.prepare("INSERT INTO sessions (user_id, token_hash, expires_at, created_at) VALUES (?, ?, ?, ?)")
    .run(userId, tokenHash(token), expires.toISOString(), now.toISOString());
  return token;
}

async function getAuthUser(db, req) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) return null;
  const row = await db.prepare(`
    SELECT users.id, users.email, sessions.expires_at
    FROM sessions JOIN users ON users.id = sessions.user_id
    WHERE sessions.token_hash = ?
  `).get(tokenHash(token));
  if (!row) return null;
  if (new Date(row.expires_at).getTime() <= Date.now()) {
    await db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(tokenHash(token));
    return null;
  }
  return { id: row.id, email: row.email, token };
}

async function requireAuth(db, req, res) {
  const user = await getAuthUser(db, req);
  if (!user) error(res, 401, "Please sign in to continue.", "UNAUTHORIZED");
  return user;
}

function profileFromRow(row) {
  if (!row) return null;
  return {
    name: row.name,
    height: row.height,
    weight: row.weight,
    age: row.age,
    gender: row.gender,
    goal: row.goal,
    targetWeight: row.target_weight,
    workoutsPerWeek: row.workouts_per_week,
  };
}

function validateProfile(body) {
  const validGoals = new Set(["lose_weight", "gain_muscle", "maintain", "endurance"]);
  const name = String(body.name ?? "").trim();
  const age = Number(body.age);
  const height = Number(body.height);
  const weight = Number(body.weight);
  const targetWeight = Number(body.targetWeight);
  const workoutsPerWeek = Number(body.workoutsPerWeek);
  const gender = body.gender;
  const goal = body.goal;
  if (name.length < 2 || name.length > 80) return "Name must contain 2 to 80 characters.";
  if (!Number.isFinite(age) || age < 13 || age > 100) return "Age must be between 13 and 100.";
  if (!Number.isFinite(height) || height < 100 || height > 250) return "Height must be between 100 and 250 cm.";
  if (!Number.isFinite(weight) || weight < 30 || weight > 300) return "Weight must be between 30 and 300 kg.";
  if (!Number.isFinite(targetWeight) || targetWeight < 30 || targetWeight > 300) return "Target weight must be between 30 and 300 kg.";
  if (!["male", "female"].includes(gender)) return "Gender is invalid.";
  if (!validGoals.has(goal)) return "Goal is invalid.";
  if (!Number.isInteger(workoutsPerWeek) || workoutsPerWeek < 1 || workoutsPerWeek > 7) return "Workouts per week must be between 1 and 7.";
  return null;
}


function dateKeyInTimeZone(date = new Date(), timeZone = process.env.APP_TIME_ZONE ?? "Asia/Ho_Chi_Minh") {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function calculateStreak(dateStrings) {
  const dates = new Set(dateStrings);
  const [year, month, day] = dateKeyInTimeZone().split("-").map(Number);
  const cursor = new Date(Date.UTC(year, month - 1, day));
  const key = (date) => date.toISOString().slice(0, 10);
  if (!dates.has(key(cursor))) cursor.setUTCDate(cursor.getUTCDate() - 1);
  let streak = 0;
  while (dates.has(key(cursor))) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}

function initials(name) {
  return name.trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "YOU";
}

function timeAgo(iso) {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function mimeType(pathname) {
  return ({
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".json": "application/json; charset=utf-8",
    ".webmanifest": "application/manifest+json",
  })[extname(pathname).toLowerCase()] ?? "application/octet-stream";
}

async function serveStatic(res, pathname, distDir) {
  if (!existsSync(distDir)) return false;
  const decoded = decodeURIComponent(pathname);
  const safePath = normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  let filePath = join(distDir, safePath === "/" ? "index.html" : safePath);
  if (!filePath.startsWith(distDir)) return false;
  if (!existsSync(filePath) || statSync(filePath).isDirectory()) filePath = join(distDir, "index.html");
  if (!existsSync(filePath)) return false;
  const stat = statSync(filePath);
  res.writeHead(200, {
    "Content-Type": mimeType(filePath),
    "Content-Length": stat.size,
    "Cache-Control": filePath.endsWith("index.html") ? "no-cache" : "public, max-age=31536000, immutable",
    "X-Content-Type-Options": "nosniff",
  });
  createReadStream(filePath).pipe(res);
  return true;
}

export function createAppServer(options = {}) {
  const dbFile = options.dbFile ?? process.env.DB_FILE ?? DEFAULT_DB_FILE;
  const databaseUrl = Object.hasOwn(options, "databaseUrl") ? options.databaseUrl : process.env.DATABASE_URL;
  const distDir = options.distDir ?? join(projectRoot, "dist");
  const devOrigin = options.devOrigin ?? process.env.DEV_ORIGIN ?? "http://localhost:5173";
  const dbPromise = databaseUrl
    ? openPostgresDatabase(databaseUrl)
    : Promise.resolve(openDatabase(dbFile));
  dbPromise.catch((cause) => {
    console.error(`Database initialization failed: ${cause.message}`);
  });

  const server = createHttpServer(async (req, res) => {
    const origin = req.headers.origin;
    const corsHeaders = origin === devOrigin ? {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Vary": "Origin",
    } : {};
    for (const [key, value] of Object.entries(corsHeaders)) res.setHeader(key, value);
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
    const path = url.pathname;

    try {
      const db = await dbPromise;
      if (path === "/api/health" && req.method === "GET") {
        await db.prepare("SELECT 1 AS ok").get();
        json(res, 200, { ok: true, database: db.kind ?? "sqlite", time: new Date().toISOString() });
        return;
      }

      if (path === "/api/auth/register" && req.method === "POST") {
        const body = await readJson(req);
        const email = normalizeEmail(body.email);
        const password = String(body.password ?? "");
        if (!isEmail(email)) return error(res, 400, "Enter a valid email address.", "INVALID_EMAIL");
        if (password.length < 8 || password.length > 128) return error(res, 400, "Password must contain 8 to 128 characters.", "INVALID_PASSWORD");
        if (await db.prepare("SELECT id FROM users WHERE email = ?").get(email)) return error(res, 409, "An account with this email already exists.", "EMAIL_EXISTS");
        const passwordHash = await hashPassword(password);
        const now = new Date().toISOString();
        const result = await db.prepare("INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)").run(email, passwordHash, now);
        const userId = Number(result.lastInsertRowid);
        const token = await createSession(db, userId);
        json(res, 201, { token, user: { id: userId, email }, profile: null });
        return;
      }

      if (path === "/api/auth/login" && req.method === "POST") {
        const body = await readJson(req);
        const email = normalizeEmail(body.email);
        const password = String(body.password ?? "");
        const row = await db.prepare("SELECT id, email, password_hash FROM users WHERE email = ?").get(email);
        if (!row || !(await verifyPassword(password, row.password_hash))) return error(res, 401, "Email or password is incorrect.", "INVALID_CREDENTIALS");
        const token = await createSession(db, row.id);
        const profile = profileFromRow(await db.prepare("SELECT * FROM profiles WHERE user_id = ?").get(row.id));
        json(res, 200, { token, user: { id: row.id, email: row.email }, profile });
        return;
      }

      if (path === "/api/auth/me" && req.method === "GET") {
        const user = await requireAuth(db, req, res); if (!user) return;
        const profile = profileFromRow(await db.prepare("SELECT * FROM profiles WHERE user_id = ?").get(user.id));
        json(res, 200, { user: { id: user.id, email: user.email }, profile });
        return;
      }

      if (path === "/api/auth/logout" && req.method === "POST") {
        const user = await requireAuth(db, req, res); if (!user) return;
        await db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(tokenHash(user.token));
        json(res, 200, { ok: true });
        return;
      }

      if (path === "/api/profile" && req.method === "GET") {
        const user = await requireAuth(db, req, res); if (!user) return;
        json(res, 200, { profile: profileFromRow(await db.prepare("SELECT * FROM profiles WHERE user_id = ?").get(user.id)) });
        return;
      }

      if (path === "/api/profile" && req.method === "PUT") {
        const user = await requireAuth(db, req, res); if (!user) return;
        const body = await readJson(req);
        const validationError = validateProfile(body);
        if (validationError) return error(res, 400, validationError, "INVALID_PROFILE");
        const now = new Date().toISOString();
        await db.prepare(`
          INSERT INTO profiles (user_id, name, height, weight, age, gender, goal, target_weight, workouts_per_week, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(user_id) DO UPDATE SET
            name=excluded.name, height=excluded.height, weight=excluded.weight, age=excluded.age,
            gender=excluded.gender, goal=excluded.goal, target_weight=excluded.target_weight,
            workouts_per_week=excluded.workouts_per_week, updated_at=excluded.updated_at
        `).run(user.id, String(body.name).trim(), String(body.height), String(body.weight), String(body.age), body.gender, body.goal, String(body.targetWeight), Number(body.workoutsPerWeek), now);
        json(res, 200, { profile: profileFromRow(await db.prepare("SELECT * FROM profiles WHERE user_id = ?").get(user.id)) });
        return;
      }

      if (path === "/api/profile" && req.method === "DELETE") {
        const user = await requireAuth(db, req, res); if (!user) return;
        await db.prepare("DELETE FROM checkins WHERE user_id = ?").run(user.id);
        await db.prepare("DELETE FROM profiles WHERE user_id = ?").run(user.id);
        json(res, 200, { ok: true });
        return;
      }

      if (path === "/api/checkins" && req.method === "GET") {
        const user = await requireAuth(db, req, res); if (!user) return;
        const rows = await db.prepare("SELECT checkin_date FROM checkins WHERE user_id = ? ORDER BY checkin_date DESC").all(user.id);
        const dates = rows.map((row) => row.checkin_date);
        json(res, 200, { dates, streak: calculateStreak(dates) });
        return;
      }

      if (path === "/api/checkins" && req.method === "POST") {
        const user = await requireAuth(db, req, res); if (!user) return;
        const body = await readJson(req);
        const today = dateKeyInTimeZone();
        const date = String(body.date ?? today);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return error(res, 400, "Check-in date is invalid.", "INVALID_DATE");
        if (date !== today) return error(res, 400, "Check-in is only available for today.", "INVALID_CHECKIN_DAY");
        await db.prepare("INSERT INTO checkins (user_id, checkin_date, created_at) VALUES (?, ?, ?) ON CONFLICT(user_id, checkin_date) DO NOTHING").run(user.id, date, new Date().toISOString());
        const dates = (await db.prepare("SELECT checkin_date FROM checkins WHERE user_id = ? ORDER BY checkin_date DESC").all(user.id)).map((row) => row.checkin_date);
        json(res, 201, { date, dates, streak: calculateStreak(dates) });
        return;
      }

      if (path === "/api/menu" && req.method === "GET") {
        const items = await db.prepare('SELECT id, name, calories, price_cents AS "priceCents", image_url AS image, description, protein FROM menu_items WHERE active = 1 ORDER BY id').all();
        json(res, 200, { items });
        return;
      }

      if (path === "/api/orders" && req.method === "GET") {
        const user = await requireAuth(db, req, res); if (!user) return;
        const orders = await db.prepare(`
          SELECT orders.id, orders.calorie_target AS "calorieTarget", orders.notes, orders.status,
                 orders.total_cents AS "totalCents", orders.created_at AS "createdAt",
                 menu_items.name AS "mealName"
          FROM orders LEFT JOIN menu_items ON menu_items.id = orders.menu_item_id
          WHERE orders.user_id = ? ORDER BY orders.id DESC LIMIT 20
        `).all(user.id);
        json(res, 200, { orders });
        return;
      }

      if (path === "/api/orders" && req.method === "POST") {
        const user = await requireAuth(db, req, res); if (!user) return;
        const body = await readJson(req);
        const calorieTarget = Number(body.calorieTarget);
        const menuItemId = body.menuItemId == null ? null : Number(body.menuItemId);
        const notes = String(body.notes ?? "").trim().slice(0, 500);
        if (!Number.isInteger(calorieTarget) || calorieTarget < 100 || calorieTarget > 1500) return error(res, 400, "Calorie target must be between 100 and 1500 kcal.", "INVALID_CALORIES");
        let item = null;
        if (menuItemId !== null) {
          item = await db.prepare("SELECT id, name, price_cents FROM menu_items WHERE id = ? AND active = 1").get(menuItemId);
          if (!item) return error(res, 404, "The selected meal is unavailable.", "MEAL_NOT_FOUND");
        }
        const now = new Date().toISOString();
        const result = await db.prepare("INSERT INTO orders (user_id, menu_item_id, calorie_target, notes, status, total_cents, created_at) VALUES (?, ?, ?, ?, 'received', ?, ?)")
          .run(user.id, item?.id ?? null, calorieTarget, notes, item?.price_cents ?? 0, now);
        json(res, 201, { order: { id: Number(result.lastInsertRowid), calorieTarget, notes, status: "received", totalCents: item?.price_cents ?? 0, createdAt: now, mealName: item?.name ?? null } });
        return;
      }

      if (path === "/api/posts" && req.method === "GET") {
        const user = await requireAuth(db, req, res); if (!user) return;
        const topic = url.searchParams.get("topic");
        const rows = topic && ["Training", "Nutrition"].includes(topic)
          ? await db.prepare(`SELECT posts.*, (SELECT COUNT(*) FROM post_likes WHERE post_id = posts.id) AS user_likes, EXISTS(SELECT 1 FROM post_likes WHERE post_id = posts.id AND user_id = ?) AS liked FROM posts WHERE topic = ? ORDER BY created_at DESC`).all(user.id, topic)
          : await db.prepare(`SELECT posts.*, (SELECT COUNT(*) FROM post_likes WHERE post_id = posts.id) AS user_likes, EXISTS(SELECT 1 FROM post_likes WHERE post_id = posts.id AND user_id = ?) AS liked FROM posts ORDER BY created_at DESC`).all(user.id);
        const posts = rows.map((row) => ({
          id: String(row.id), topic: row.topic, user: row.author_name, avatar: row.avatar,
          time: timeAgo(row.created_at), body: row.body, img: row.image_url,
          likes: Number(row.base_likes) + Number(row.user_likes), comments: Number(row.comments_count), liked: Boolean(row.liked),
        }));
        json(res, 200, { posts });
        return;
      }

      if (path === "/api/posts" && req.method === "POST") {
        const user = await requireAuth(db, req, res); if (!user) return;
        const body = await readJson(req);
        const topic = body.topic;
        const text = String(body.body ?? "").trim();
        const imageUrl = String(body.imageUrl ?? "").trim().slice(0, 1000) || null;
        if (!["Training", "Nutrition"].includes(topic)) return error(res, 400, "Post topic is invalid.", "INVALID_TOPIC");
        if (text.length < 3 || text.length > 1000) return error(res, 400, "Post must contain 3 to 1000 characters.", "INVALID_POST");
        const profile = await db.prepare("SELECT name FROM profiles WHERE user_id = ?").get(user.id);
        const authorName = profile?.name ?? user.email.split("@")[0];
        const now = new Date().toISOString();
        const result = await db.prepare("INSERT INTO posts (user_id, topic, author_name, avatar, body, image_url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
          .run(user.id, topic, authorName, initials(authorName), text, imageUrl, now);
        json(res, 201, { post: { id: String(result.lastInsertRowid), topic, user: authorName, avatar: initials(authorName), time: "just now", body: text, img: imageUrl, likes: 0, comments: 0, liked: false } });
        return;
      }

      const likeMatch = path.match(/^\/api\/posts\/(\d+)\/like$/);
      if (likeMatch && req.method === "POST") {
        const user = await requireAuth(db, req, res); if (!user) return;
        const postId = Number(likeMatch[1]);
        if (!await db.prepare("SELECT id FROM posts WHERE id = ?").get(postId)) return error(res, 404, "Post not found.", "POST_NOT_FOUND");
        await db.prepare("INSERT INTO post_likes (user_id, post_id, created_at) VALUES (?, ?, ?) ON CONFLICT(user_id, post_id) DO NOTHING").run(user.id, postId, new Date().toISOString());
        const count = (await db.prepare("SELECT base_likes + (SELECT COUNT(*) FROM post_likes WHERE post_id = posts.id) AS likes FROM posts WHERE id = ?").get(postId)).likes;
        json(res, 200, { liked: true, likes: Number(count) });
        return;
      }

      if (likeMatch && req.method === "DELETE") {
        const user = await requireAuth(db, req, res); if (!user) return;
        const postId = Number(likeMatch[1]);
        await db.prepare("DELETE FROM post_likes WHERE user_id = ? AND post_id = ?").run(user.id, postId);
        const row = await db.prepare("SELECT base_likes + (SELECT COUNT(*) FROM post_likes WHERE post_id = posts.id) AS likes FROM posts WHERE id = ?").get(postId);
        if (!row) return error(res, 404, "Post not found.", "POST_NOT_FOUND");
        json(res, 200, { liked: false, likes: Number(row.likes) });
        return;
      }

      if (path.startsWith("/api/")) {
        error(res, 404, "API endpoint not found.", "NOT_FOUND");
        return;
      }

      if (!(await serveStatic(res, path, distDir))) error(res, 404, "Website build not found. Run npm run build first.", "BUILD_NOT_FOUND");
    } catch (cause) {
      console.error(cause);
      error(res, cause.status ?? 500, cause.status ? cause.message : "Internal server error.", cause.status ? "BAD_REQUEST" : "INTERNAL_ERROR");
    }
  });

  server.on("close", () => { void dbPromise.then((db) => db.close()).catch(() => undefined); });
  return server;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) {
  const port = Number(process.env.PORT ?? 8787);
  const server = createAppServer();
  server.listen(port, "0.0.0.0", () => {
    console.log(`Khơ Mon Gym server running at http://localhost:${port}`);
  });
}
