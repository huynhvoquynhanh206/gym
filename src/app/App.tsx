<<<<<<< HEAD
import { useEffect, useState, type FormEvent } from "react";
import { api, ApiError, getToken, setToken, type Account, type CommunityPost, type KitchenOrder, type MenuItem } from "../lib/api";
=======
import { useEffect, useState } from "react";
>>>>>>> 99fc191 (Initial commit)
import {
  Activity,
  Dumbbell,
  Utensils,
  Users,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Camera,
  Flame,
  Clock,
  MapPin,
  Heart,
  MessageCircle,
  Play,
  Plus,
  Zap,
  ShoppingBag,
  TrendingUp,
  Bell,
  Check,
  Share2,
  ArrowRight,
  Bike,
<<<<<<< HEAD
  RotateCcw,
  Mail,
  LockKeyhole,
  LogOut,
  LoaderCircle,
  Send,
} from "lucide-react";
=======
  X,
} from "lucide-react";
import coreLogo from "../assets/core-fitness-logo.png";
import collabLogo from "../assets/core-bts-collab.png";
>>>>>>> 99fc191 (Initial commit)

type Tab = "home" | "workout" | "nutrition" | "social" | "checkin";
type Goal = "lose_weight" | "gain_muscle" | "maintain" | "endurance";

<<<<<<< HEAD
=======
type Exercise = {
  name: string;
  sets: string;
  equipment: string;
  kcal: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  rest: string;
  cue: string;
};

>>>>>>> 99fc191 (Initial commit)
interface UserData {
  name: string;
  height: string;
  weight: string;
  age: string;
  gender: "male" | "female";
  goal: Goal;
  targetWeight: string;
  workoutsPerWeek: number;
}

const defaultUser: UserData = {
<<<<<<< HEAD
  name: "",
  height: "",
  weight: "",
  age: "",
  gender: "male",
  goal: "lose_weight",
  targetWeight: "",
=======
  name: "Alex Turner",
  height: "172",
  weight: "75",
  age: "26",
  gender: "male",
  goal: "lose_weight",
  targetWeight: "68",
>>>>>>> 99fc191 (Initial commit)
  workoutsPerWeek: 3,
};

function calcBMI(weight: string, height: string): string | null {
  const w = parseFloat(weight);
  const h = parseFloat(height) / 100;
  if (!w || !h) return null;
  return (w / (h * h)).toFixed(1);
}

function getBMIInfo(bmi: number) {
<<<<<<< HEAD
  if (bmi < 18.5) return { label: "Underweight", color: "#60a5fa", bg: "#1e3a5f" };
  if (bmi < 25) return { label: "Normal", color: "#c8f135", bg: "#1a2e0a" };
  if (bmi < 30) return { label: "Overweight", color: "#fbbf24", bg: "#3d2a00" };
  return { label: "Obese", color: "#ff4757", bg: "#3d0a0e" };
=======
  if (bmi < 18.5) return { label: "Underweight", color: "#3b82f6", bg: "#0f2857" };
  if (bmi < 25) return { label: "Normal", color: "#2563eb", bg: "#0d1f3c" };
  if (bmi < 30) return { label: "Overweight", color: "#3b82f6", bg: "#10254d" };
  return { label: "Obese", color: "#2563eb", bg: "#0b1f45" };
>>>>>>> 99fc191 (Initial commit)
}

const goalLabels: Record<Goal, string> = {
  lose_weight: "Lose Weight",
  gain_muscle: "Build Muscle",
  maintain: "Maintain Shape",
  endurance: "Improve Endurance",
};

<<<<<<< HEAD
const STORAGE_KEYS = {
  tab: "kho-mon-gym:active-tab",
  splash: "kho-mon-gym:splash-seen",
} as const;

const validTabs: Tab[] = ["home", "workout", "nutrition", "social", "checkin"];

function readStoredTab(): Tab {
  try {
    const tab = localStorage.getItem(STORAGE_KEYS.tab) as Tab | null;
    return tab && validTabs.includes(tab) ? tab : "home";
  } catch {
    return "home";
  }
}

function hasSeenSplash(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEYS.splash) === "1";
  } catch {
    return false;
  }
}

function formatToday(): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

function toLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
};

function BrandLogo({
  size = "md",
}: BrandLogoProps) {
  const sizeClasses = {
    sm: {
      wrapper: "gap-2",
      brand: "text-[15px] leading-none",
      gym: "text-[13px] h-6 px-2",
    },
    md: {
      wrapper: "gap-2.5",
      brand: "text-xl leading-none",
      gym: "text-base h-7 px-2.5",
    },
    lg: {
      wrapper: "gap-3",
      brand: "text-4xl leading-none",
      gym: "text-3xl h-11 px-4",
    },
  };

  const styles = sizeClasses[size];

  return (
    <div
      className={`inline-flex items-center ${styles.wrapper}`}
      aria-label="Khơ Mon Gym"
    >
      <span
        className={`
          font-barlow italic font-black
          tracking-[-0.06em]
          text-[#243878]
          ${styles.brand}
        `}
      >
        KHƠ MON
      </span>

      <span
        className={`
          inline-flex items-center justify-center
          font-barlow italic font-black
          tracking-[-0.04em] leading-none
          text-white bg-[#ed1c24] rounded-md
          ${styles.gym}
        `}
      >
        GYM
      </span>
    </div>
=======
type BrandLogoProps = {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
};

function BrandLogo({ variant = "dark", size = "md" }: BrandLogoProps) {
  const sizes = {
    sm: "w-[116px]",
    md: "w-[158px]",
    lg: "w-[260px]",
  };

  return (
    <img
      src={coreLogo}
      alt="Core Fitness & Yoga"
      className={`${sizes[size]} h-auto object-contain`}
      style={{ filter: variant === "light" ? "brightness(0)" : "none" }}
    />
>>>>>>> 99fc191 (Initial commit)
  );
}

function SplashScreen({ onComplete }: { onComplete: () => void }) {
<<<<<<< HEAD
  const [fadeToBlack, setFadeToBlack] = useState(false);
  const [hideLogo, setHideLogo] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeToBlack(true);
    }, 1400);

    const timer2 = setTimeout(() => {
      setHideLogo(true);
    }, 1800);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
=======
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setLeaving(true), 2450);
    const completeTimer = window.setTimeout(onComplete, 3000);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
>>>>>>> 99fc191 (Initial commit)
    };
  }, [onComplete]);

  return (
<<<<<<< HEAD
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Logo ở nền trắng */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          hideLogo ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <BrandLogo size="lg" />
      </div>

      {/* Lớp đen fade lên */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-700 ${
          fadeToBlack ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

function AuthScreen({
  onAuthenticated,
}: {
  onAuthenticated: (account: Account, profile: UserData | null) => void;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setErrorMessage("");
    setSubmitting(true);

    try {
      const result = mode === "login"
        ? await api.login(email, password)
        : await api.register(email, password);
      setToken(result.token);
      onAuthenticated(result.user, result.profile as UserData | null);
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : "Unable to connect to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <BrandLogo size="lg" />
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-2xl shadow-black/20 sm:p-8">
          <h1 className="font-barlow text-4xl font-black text-foreground">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login"
              ? "Sign in to sync your profile, check-ins and meal orders."
              : "Your fitness data will be stored securely in the gym database."}
          </p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">Email</span>
              <div className="relative">
                <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-3.5 pl-11 pr-4 text-foreground outline-none transition-colors focus:border-primary"
                  placeholder="you@example.com"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">Password</span>
              <div className="relative">
                <LockKeyhole size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  minLength={8}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-3.5 pl-11 pr-4 text-foreground outline-none transition-colors focus:border-primary"
                  placeholder="At least 8 characters"
                />
              </div>
            </label>

            {errorMessage && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {submitting && <LoaderCircle size={17} className="animate-spin" />}
              {mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode((current) => current === "login" ? "register" : "login");
              setErrorMessage("");
            }}
            className="mt-5 w-full text-center text-sm text-muted-foreground hover:text-foreground"
          >
            {mode === "login" ? "No account yet? Create one" : "Already have an account? Sign in"}
          </button>
=======
    <div
      className={`min-h-screen bg-black text-white flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-3xl px-7 text-center splash-collab-enter">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.42em] text-primary font-bold mb-7">
          Official training experience
        </p>

        <img
          src={collabLogo}
          alt="Core Fitness & Yoga x BTS Bonus To Score"
          className="w-full max-w-[720px] mx-auto h-auto object-contain"
        />

        <div className="flex items-center gap-4 max-w-md mx-auto my-7">
          <div className="h-px flex-1 bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_20px_rgba(37,99,235,0.9)]" />
          <div className="h-px flex-1 bg-white/20" />
        </div>

        <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 backdrop-blur-sm">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">Presented by</span>
          <span className="font-barlow text-xl sm:text-2xl font-black tracking-[0.06em] text-white">
            DTB7_<span className="text-primary">Group 3</span>
          </span>
        </div>

        <div className="w-28 h-0.5 bg-white/10 rounded-full overflow-hidden mx-auto mt-10">
          <div className="h-full bg-primary splash-progress" />
>>>>>>> 99fc191 (Initial commit)
        </div>
      </div>
    </div>
  );
}
<<<<<<< HEAD

=======
>>>>>>> 99fc191 (Initial commit)
// ─── ONBOARDING ──────────────────────────────────────────────────────────────

function StepPersonal({
  data,
  onChange,
  onNext,
}: {
  data: UserData;
  onChange: (d: UserData) => void;
  onNext: () => void;
}) {
<<<<<<< HEAD
  const age = Number(data.age);
  const canContinue = data.name.trim().length >= 2 && age >= 13 && age <= 100;

=======
>>>>>>> 99fc191 (Initial commit)
  return (
    <div className="w-full max-w-sm px-6">
      <div className="mb-10">
        <div className="mb-8">
<<<<<<< HEAD
  <BrandLogo
    size="md"
  />
=======
  <BrandLogo variant="dark" size="md" />
>>>>>>> 99fc191 (Initial commit)

  <div className="mt-4 h-[2px] w-12 rounded-full bg-primary" />
</div>
        <h1 className="font-barlow text-5xl font-black text-foreground leading-none mb-3">
          Welcome<br />aboard!
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Start your fitness journey — takes just 2 minutes
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Full Name</label>
          <input
            className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            placeholder="John Smith"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Age</label>
          <input
            type="number"
<<<<<<< HEAD
            min="13"
            max="100"
            inputMode="numeric"
=======
>>>>>>> 99fc191 (Initial commit)
            className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            placeholder="25"
            value={data.age}
            onChange={(e) => onChange({ ...data, age: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Gender</label>
          <div className="grid grid-cols-2 gap-3">
            {(["male", "female"] as const).map((g) => (
              <button
                key={g}
                onClick={() => onChange({ ...data, gender: g })}
                className={`py-3.5 rounded-xl border text-sm font-semibold transition-all ${
                  data.gender === g
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {g === "male" ? "Male ♂" : "Female ♀"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
<<<<<<< HEAD
        disabled={!canContinue}
=======
        disabled={!data.name || !data.age}
>>>>>>> 99fc191 (Initial commit)
        className="w-full mt-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-30 hover:opacity-90 transition-opacity"
      >
        Next <ArrowRight size={17} />
      </button>
    </div>
  );
}

function StepMetrics({
  data,
  onChange,
  onBack,
  onNext,
}: {
  data: UserData;
  onChange: (d: UserData) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const bmi = calcBMI(data.weight, data.height);
  const info = bmi ? getBMIInfo(parseFloat(bmi)) : null;
<<<<<<< HEAD
  const height = Number(data.height);
  const weight = Number(data.weight);
  const canContinue = height >= 100 && height <= 250 && weight >= 30 && weight <= 300;
=======
>>>>>>> 99fc191 (Initial commit)

  return (
    <div className="w-full max-w-sm px-6">
      <button onClick={onBack} className="mb-6 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm">
        <ChevronLeft size={16} /> Back
      </button>
      <div className="mb-8">
        <h1 className="font-barlow text-5xl font-black text-foreground leading-none mb-2">Body<br />Metrics</h1>
        <p className="text-muted-foreground text-sm">Enter your measurements for an accurate BMI</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Height</label>
          <div className="relative">
            <input
              type="number"
<<<<<<< HEAD
              min="100"
              max="250"
              inputMode="decimal"
=======
>>>>>>> 99fc191 (Initial commit)
              className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors pr-14"
              placeholder="170"
              value={data.height}
              onChange={(e) => onChange({ ...data, height: e.target.value })}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">cm</span>
          </div>
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Weight</label>
          <div className="relative">
            <input
              type="number"
<<<<<<< HEAD
              min="30"
              max="300"
              inputMode="decimal"
=======
>>>>>>> 99fc191 (Initial commit)
              className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors pr-14"
              placeholder="65"
              value={data.weight}
              onChange={(e) => onChange({ ...data, weight: e.target.value })}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">kg</span>
          </div>
        </div>
        {info && bmi && (
          <div
            className="p-4 rounded-xl border transition-all"
            style={{ borderColor: info.color + "50", backgroundColor: info.bg }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Your BMI</span>
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                style={{ color: info.color, backgroundColor: info.color + "20" }}
              >
                {info.label}
              </span>
            </div>
            <div className="font-barlow text-4xl font-black mt-1" style={{ color: info.color }}>
              {bmi}
            </div>
          </div>
        )}
      </div>
      <button
        onClick={onNext}
<<<<<<< HEAD
        disabled={!canContinue}
=======
        disabled={!data.height || !data.weight}
>>>>>>> 99fc191 (Initial commit)
        className="w-full mt-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-30 hover:opacity-90 transition-opacity"
      >
        See Results <ArrowRight size={17} />
      </button>
    </div>
  );
}

function StepBMIResult({
  data,
  onBack,
  onNext,
}: {
  data: UserData;
  onBack: () => void;
  onNext: () => void;
}) {
  const bmi = calcBMI(data.weight, data.height);
  if (!bmi) return null;
  const bmiNum = parseFloat(bmi);
  const info = getBMIInfo(bmiNum);
  const pct = Math.min(Math.max(((bmiNum - 10) / 30) * 100, 2), 98);

  const advice: Record<string, string> = {
    "Underweight": "You need to boost your nutrition and training to reach your ideal weight. The app will design a suitable mass-gain program for you.",
    "Normal": "Great job! Your numbers are in the ideal range. Keep it up and continue improving your fitness.",
    "Overweight": "Combining cardio and portion control will help you reach your ideal range in 8–12 weeks.",
    "Obese": "Don't worry — start with small changes. The app will build a safe and sustainable roadmap for you.",
  };

  const ranges = [
<<<<<<< HEAD
    { label: "Underweight", range: "< 18.5", color: "#60a5fa" },
    { label: "Normal", range: "18.5–24.9", color: "#c8f135" },
    { label: "Overweight", range: "25–29.9", color: "#fbbf24" },
    { label: "Obese", range: "≥ 30", color: "#ff4757" },
=======
    { label: "Underweight", range: "< 18.5", color: "#3b82f6" },
    { label: "Normal", range: "18.5–24.9", color: "#2563eb" },
    { label: "Overweight", range: "25–29.9", color: "#3b82f6" },
    { label: "Obese", range: "≥ 30", color: "#2563eb" },
>>>>>>> 99fc191 (Initial commit)
  ];

  return (
    <div className="w-full max-w-sm px-6">
      <button onClick={onBack} className="mb-6 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm">
        <ChevronLeft size={16} /> Back
      </button>
      <div className="mb-6">
        <h1 className="font-barlow text-5xl font-black text-foreground leading-none mb-2">BMI<br />Results</h1>
      </div>

      <div className="bg-card rounded-2xl p-6 border border-border mb-4">
        <div className="text-center mb-6">
          <div className="font-barlow text-8xl font-black mb-2" style={{ color: info.color }}>
            {bmi}
          </div>
          <span
            className="text-sm px-4 py-1 rounded-full font-semibold"
            style={{ color: info.color, backgroundColor: info.color + "20" }}
          >
            {info.label}
          </span>
        </div>
        <div className="relative mb-3">
          <div
            className="h-3 rounded-full overflow-hidden"
<<<<<<< HEAD
            style={{ background: "linear-gradient(to right, #60a5fa 0%, #c8f135 30%, #fbbf24 58%, #ff4757 100%)" }}
=======
            style={{ background: "linear-gradient(to right, #3b82f6 0%, #2563eb 30%, #3b82f6 58%, #2563eb 100%)" }}
>>>>>>> 99fc191 (Initial commit)
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-lg border-2 transition-all"
            style={{ left: `calc(${pct}% - 10px)`, borderColor: info.color }}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {ranges.map(({ label, range, color }) => (
            <div
              key={label}
              className="flex items-center gap-2 p-2 rounded-lg"
              style={{
                backgroundColor: info.label === label ? color + "15" : "transparent",
                border: `1px solid ${info.label === label ? color + "40" : "transparent"}`,
              }}
            >
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
              <div>
<<<<<<< HEAD
                <p className="text-xs font-medium" style={{ color: info.label === label ? color : "#7a8fa6" }}>{label}</p>
=======
                <p className="text-xs font-medium" style={{ color: info.label === label ? color : "#94a3b8" }}>{label}</p>
>>>>>>> 99fc191 (Initial commit)
                <p className="text-xs text-muted-foreground">{range}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-card rounded-xl p-3 border border-border">
          <p className="text-xs text-muted-foreground mb-0.5">Height</p>
          <p className="font-barlow text-2xl font-bold text-foreground">{data.height}<span className="text-sm font-normal text-muted-foreground ml-0.5">cm</span></p>
        </div>
        <div className="bg-card rounded-xl p-3 border border-border">
          <p className="text-xs text-muted-foreground mb-0.5">Weight</p>
          <p className="font-barlow text-2xl font-bold text-foreground">{data.weight}<span className="text-sm font-normal text-muted-foreground ml-0.5">kg</span></p>
        </div>
      </div>

      <div
        className="p-4 rounded-xl mb-6 text-sm text-foreground leading-relaxed"
        style={{ backgroundColor: info.bg, borderLeft: `3px solid ${info.color}` }}
      >
        {advice[info.label]}
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
      >
        Set Your Goal <ArrowRight size={17} />
      </button>
    </div>
  );
}

function StepGoal({
  data,
  onChange,
  onBack,
  onComplete,
}: {
  data: UserData;
  onChange: (d: UserData) => void;
  onBack: () => void;
  onComplete: () => void;
}) {
<<<<<<< HEAD
  const targetWeight = Number(data.targetWeight);
  const canComplete = targetWeight >= 30 && targetWeight <= 300;

=======
>>>>>>> 99fc191 (Initial commit)
  const goals: { id: Goal; desc: string; Icon: typeof TrendingUp }[] = [
    { id: "lose_weight", desc: "Burn fat and improve body composition", Icon: TrendingUp },
    { id: "gain_muscle", desc: "Build lean muscle mass", Icon: Dumbbell },
    { id: "maintain", desc: "Keep weight & boost overall health", Icon: Activity },
    { id: "endurance", desc: "Increase stamina and total fitness", Icon: Bike },
  ];

  return (
    <div className="w-full max-w-sm px-6">
      <button onClick={onBack} className="mb-6 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm">
        <ChevronLeft size={16} /> Back
      </button>
      <div className="mb-8">
        <h1 className="font-barlow text-5xl font-black text-foreground leading-none mb-2">Your<br />Goal</h1>
        <p className="text-muted-foreground text-sm">The app will build a personalized plan based on this goal</p>
      </div>

      <div className="space-y-2.5 mb-5">
        {goals.map(({ id, desc, Icon }) => {
          const selected = data.goal === id;
          return (
            <button
              key={id}
              onClick={() => onChange({ ...data, goal: id })}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                selected ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${selected ? "bg-primary" : "bg-muted"}`}>
                <Icon size={18} className={selected ? "text-primary-foreground" : "text-muted-foreground"} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${selected ? "text-primary" : "text-foreground"}`}>{goalLabels[id]}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
              {selected && <Check size={15} className="text-primary flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      <div className="mb-5">
        <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Target Weight</label>
        <div className="relative">
          <input
            type="number"
<<<<<<< HEAD
            min="30"
            max="300"
            inputMode="decimal"
=======
>>>>>>> 99fc191 (Initial commit)
            className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors pr-14"
            placeholder="60"
            value={data.targetWeight}
            onChange={(e) => onChange({ ...data, targetWeight: e.target.value })}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">kg</span>
        </div>
      </div>

      <div className="mb-8">
        <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Workouts per Week</label>
        <div className="flex gap-2">
          {[2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => onChange({ ...data, workoutsPerWeek: n })}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                data.workoutsPerWeek === n
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onComplete}
<<<<<<< HEAD
        disabled={!canComplete}
        className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-30 hover:opacity-90 transition-opacity"
=======
        className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
>>>>>>> 99fc191 (Initial commit)
      >
        Let's Go! <Zap size={17} />
      </button>
    </div>
  );
}

function OnboardingFlow({ onComplete }: { onComplete: (d: UserData) => void }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<UserData>(defaultUser);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-10">
      <div className="flex gap-1.5 mb-10">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: i === step ? 28 : 12,
<<<<<<< HEAD
              backgroundColor: i <= step ? "#c8f135" : "rgba(255,255,255,0.12)",
=======
              backgroundColor: i <= step ? "#2563eb" : "rgba(255,255,255,0.12)",
>>>>>>> 99fc191 (Initial commit)
            }}
          />
        ))}
      </div>
      {step === 0 && <StepPersonal data={data} onChange={setData} onNext={() => setStep(1)} />}
      {step === 1 && <StepMetrics data={data} onChange={setData} onBack={() => setStep(0)} onNext={() => setStep(2)} />}
      {step === 2 && <StepBMIResult data={data} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
      {step === 3 && (
        <StepGoal data={data} onChange={setData} onBack={() => setStep(2)} onComplete={() => onComplete(data)} />
      )}
    </div>
  );
}

// ─── TABS ─────────────────────────────────────────────────────────────────────

<<<<<<< HEAD
function HomeTab({ user, onReset, onLogout }: { user: UserData; onReset: () => void; onLogout: () => void }) {
=======
function HomeTab({ user }: { user: UserData }) {
>>>>>>> 99fc191 (Initial commit)
  const bmi = calcBMI(user.weight, user.height);
  const bmiNum = bmi ? parseFloat(bmi) : 0;
  const info = bmi ? getBMIInfo(bmiNum) : null;

  const [selectedBranchIndex, setSelectedBranchIndex] = useState(0);

  const trafficTimes = [
    "6h",
    "7h",
    "8h",
    "9h",
    "10h",
    "11h",
    "12h",
    "17h",
    "18h",
    "19h",
    "20h",
    "21h",
  ];
  
  const gymBranches = [
  {
<<<<<<< HEAD
    name: "Khơ Mon Gym Trần Quang Khải",
    shortName: "District 1",
    address:
      "214 Trần Quang Khải Street, Tân Định Ward, District 1, Ho Chi Minh City",
    currentLevel: 82,
    traffic: [20, 70, 85, 52, 30, 42, 60, 76, 82, 73, 48, 25],
  },
  {
    name: "Khơ Mon Gym Âu Cơ",
    shortName: "Tan Binh District",
    address:
      "58 Âu Cơ Street, Tân Hòa Ward, Tân Bình District, Ho Chi Minh City",
    currentLevel: 46,
    traffic: [15, 38, 54, 40, 24, 30, 44, 52, 46, 41, 30, 18],
  },
  {
    name: "Khơ Mon Gym Centre Mall Phạm Hùng",
    shortName: "District 8",
    address:
      "Centre Mall Phạm Hùng, C6/27 Phạm Hùng Street, Bình Đông Ward, District 8, Ho Chi Minh City",
    currentLevel: 24,
    traffic: [12, 25, 34, 28, 18, 22, 31, 30, 24, 27, 20, 14],
  },
  {
    name: "Khơ Mon Gym Gò Dưa",
    shortName: "Thu Duc City",
    address:
      "05 Gò Dưa Street, Tam Bình Ward, Thu Duc City, Ho Chi Minh City",
    currentLevel: 36,
    traffic: [18, 40, 48, 36, 22, 26, 38, 43, 36, 34, 25, 16],
  },
  {
    name: "Khơ Mon Gym Trường Vĩnh Ký",
    shortName: "Tan Phu District",
    address:
      "80 Trường Vĩnh Ký Street, Tân Thành Ward, Tân Phú District, Ho Chi Minh City",
    currentLevel: 59,
    traffic: [16, 45, 61, 43, 27, 35, 49, 64, 59, 54, 37, 21],
=======
    name: "Core Fitness & Yoga Lê Quang Định",
    shortName: "Branch 1",
    address:
      "239 Lê Quang Định Street, Ward 7, Bình Thạnh District, Hồ Chí Minh City",
    note: "Main gym branch",
    currentLevel: 68,
    traffic: [18, 34, 52, 45, 30, 42, 56, 64, 68, 62, 48, 28],
  },
  {
    name: "Core Fitness & Yoga Xô Viết Nghệ Tĩnh",
    shortName: "Branch 2",
    address:
      "168 Xô Viết Nghệ Tĩnh Street, Ward 21, Bình Thạnh District, Hồ Chí Minh City",
    note: "Fitness branch",
    currentLevel: 44,
    traffic: [15, 28, 36, 33, 20, 26, 38, 42, 44, 39, 31, 18],
  },
  {
    name: "Core Fitness & Yoga Bạch Đằng",
    shortName: "Branch 3",
    address:
      "481–483 Bạch Đằng Street, Ward 2, Bình Thạnh District, Hồ Chí Minh City",
    note: "Fitness branch",
    currentLevel: 57,
    traffic: [17, 35, 48, 41, 26, 32, 46, 54, 57, 51, 37, 24],
>>>>>>> 99fc191 (Initial commit)
  },
];
  
  const getCrowdColor = (level: number) => {
<<<<<<< HEAD
    if (level >= 75) return "#ff4757";
    if (level >= 45) return "#fbbf24";
    return "#c8f135";
=======
    if (level >= 75) return "#2563eb";
    if (level >= 45) return "#3b82f6";
    return "#2563eb";
>>>>>>> 99fc191 (Initial commit)
  };
  
  const getCrowdLabel = (level: number) => {
    if (level >= 75) return "Very Busy";
    if (level >= 45) return "Moderate";
    return "Quiet";
  };
  
  const getCrowdMessage = (level: number) => {
    if (level >= 75) {
      return "Very busy right now — consider another branch.";
    }
  
    if (level >= 45) {
      return "Moderately busy — some equipment may be occupied.";
    }
  
    return "Quiet right now — a good time to train.";
  };
  
  const selectedBranch = gymBranches[selectedBranchIndex];
  
  const crowdData = trafficTimes.map((time, index) => ({
    time,
    level: selectedBranch.traffic[index],
  }));
  
  const quietestBranchIndex = gymBranches.reduce(
    (bestIndex, branch, index, branches) =>
      branch.currentLevel < branches[bestIndex].currentLevel
        ? index
        : bestIndex,
    0
  );
  
  const selectedCrowdColor = getCrowdColor(
    selectedBranch.currentLevel
  );

  const progress = bmi && user.targetWeight
    ? Math.min(
        (Math.abs(bmiNum - parseFloat(user.targetWeight) / ((parseFloat(user.height) / 100) ** 2)) /
          Math.max(Math.abs(bmiNum - 22), 0.1)) *
          100,
        65
      )
    : 32;

  return (
<<<<<<< HEAD
    <div className="p-4 space-y-4 pb-4 sm:p-6">
      <div className="flex items-center justify-between gap-4 pt-3">
        <div className="min-w-0">
          <div className="mb-2 md:hidden">
            <BrandLogo size="sm" />
          </div>

          <p className="text-muted-foreground text-sm">Hello 👋</p>

          <h2 className="font-barlow text-2xl font-bold text-foreground truncate">
            {user.name}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.alert("You have no new notifications.")}
            className="relative w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:border-primary/40 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={17} className="text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-accent rounded-full border-2 border-background" />
          </button>

          <button
            type="button"
            onClick={onReset}
            className="md:hidden w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:border-primary/40 transition-colors"
            aria-label="Reset profile"
            title="Reset profile"
          >
            <RotateCcw size={16} className="text-muted-foreground" />
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="md:hidden w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:border-primary/40 transition-colors"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut size={16} className="text-muted-foreground" />
          </button>
=======
    <div className="p-4 space-y-4 pb-4">
      <div className="flex items-center justify-between pt-3">
        <div>
  <div className="mb-2">
    <BrandLogo variant="dark" size="sm" />
  </div>

  <p className="text-muted-foreground text-sm">
    Hello 👋
  </p>

  <h2 className="font-barlow text-2xl font-bold text-foreground">
    {user.name}
  </h2>
</div>
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center">
            <Bell size={17} className="text-muted-foreground" />
          </div>
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-accent rounded-full border-2 border-background" />
>>>>>>> 99fc191 (Initial commit)
        </div>
      </div>

      {info && bmi && (
        <div
          className="rounded-2xl p-5 border relative overflow-hidden"
          style={{ borderColor: info.color + "35", background: `linear-gradient(135deg, ${info.bg} 0%, #141b26 100%)` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">BMI Index</p>
              <div className="font-barlow text-6xl font-black leading-none mb-2" style={{ color: info.color }}>
                {bmi}
              </div>
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                style={{ color: info.color, backgroundColor: info.color + "20" }}
              >
                {info.label}
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Goal</p>
              <p className="font-barlow text-2xl font-bold text-foreground">{user.targetWeight}kg</p>
              <p className="text-xs text-muted-foreground mt-0.5">{goalLabels[user.goal]}</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Current: {user.weight}kg</span>
              <span>Target: {user.targetWeight}kg</span>
            </div>
            <div className="h-1.5 bg-black/30 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${progress}%`, backgroundColor: info.color }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2.5">
        {[
<<<<<<< HEAD
          { icon: Flame, label: "Calories Today", value: "1,840", sub: "/ 2,200 kcal", color: "#ff4757" },
          { icon: Clock, label: "Minutes Trained", value: "45", sub: "today", color: "#c8f135" },
          { icon: Activity, label: "Heart Rate", value: "72", sub: "avg bpm", color: "#60a5fa" },
=======
          { icon: Flame, label: "Calories Today", value: "1,840", sub: "/ 2,200 kcal", color: "#2563eb" },
          { icon: Clock, label: "Minutes Trained", value: "45", sub: "today", color: "#2563eb" },
          { icon: Activity, label: "Heart Rate", value: "72", sub: "avg bpm", color: "#3b82f6" },
>>>>>>> 99fc191 (Initial commit)
        ].map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="bg-card rounded-xl p-3 border border-border">
            <Icon size={15} style={{ color }} className="mb-2" />
            <p className="font-barlow text-xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground leading-tight mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-2xl p-4 border border-border">
  {/* Header */}
  <div className="flex items-center justify-between mb-1">
    <h3 className="font-barlow text-lg font-bold text-foreground">
      Gym Traffic
    </h3>

    <div className="flex items-center gap-1.5">
<<<<<<< HEAD
      <div className="w-2 h-2 rounded-full bg-accent" />

      <span className="text-xs text-accent font-medium">
        Estimated
=======
      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />

      <span className="text-xs text-accent font-medium">
        Live
>>>>>>> 99fc191 (Initial commit)
      </span>
    </div>
  </div>

  <p className="text-xs text-muted-foreground mb-4">
    Compare branches and choose the quietest location
  </p>

  {/* Chi nhánh đang được chọn */}
  <div
    className="rounded-xl p-3 mb-4"
    style={{
      backgroundColor: selectedCrowdColor + "12",
      border: `1px solid ${selectedCrowdColor}35`,
    }}
  >
    <div className="flex items-start gap-2.5">
      <div
        className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 animate-pulse"
        style={{
          backgroundColor: selectedCrowdColor,
        }}
      />

      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-foreground">
              {selectedBranch.name}
            </p>

            <p className="text-[11px] text-muted-foreground mt-0.5">
              {selectedBranch.shortName}
            </p>
          </div>

          <span
            className="text-xs font-bold flex-shrink-0"
            style={{
              color: selectedCrowdColor,
            }}
          >
            {getCrowdLabel(selectedBranch.currentLevel)}
          </span>
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          {getCrowdMessage(selectedBranch.currentLevel)}
        </p>
      </div>
    </div>
  </div>

  {/* Biểu đồ được đưa lên phía trên danh sách chi nhánh */}
  <div className="mb-1">
    <div className="flex items-end gap-0.5 h-16">
      {crowdData.map(({ time, level }) => {
        const color = getCrowdColor(level);
        const isNow = time === "18h";

        return (
          <div
            key={time}
            className="flex-1 h-full flex flex-col justify-end items-center"
            title={`${time}: ${getCrowdLabel(level)} (${level}%)`}
          >
            <div
              className="w-full rounded-sm transition-all"
              style={{
                height: `${Math.max(level * 0.58, 4)}px`,
                backgroundColor: isNow ? color : color + "70",
                outline: isNow
                  ? `1px solid ${color}`
                  : "none",
              }}
            />
          </div>
        );
      })}
    </div>

    {/* Mốc thời gian */}
    <div className="flex justify-between text-xs text-muted-foreground mt-1">
      <span>6h</span>
      <span>9h</span>
      <span>12h</span>
      <span>17h</span>
      <span>21h</span>
    </div>
  </div>

  {/* Chú thích màu */}
  <div className="flex gap-4 mt-3 mb-4 flex-wrap">
    {[
<<<<<<< HEAD
      ["#c8f135", "Quiet"],
      ["#fbbf24", "Moderate"],
      ["#ff4757", "Very Busy"],
=======
      ["#2563eb", "Quiet"],
      ["#3b82f6", "Moderate"],
      ["#2563eb", "Very Busy"],
>>>>>>> 99fc191 (Initial commit)
    ].map(([color, label]) => (
      <div
        key={label}
        className="flex items-center gap-1.5"
      >
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{
            backgroundColor: color,
          }}
        />

        <span className="text-xs text-muted-foreground">
          {label}
        </span>
      </div>
    ))}
  </div>

  {/* Tiêu đề danh sách cơ sở */}
  <div className="flex items-center justify-between mb-2">
    <p className="text-sm font-semibold text-foreground">
      Gym Branches
    </p>

    <span className="text-xs text-muted-foreground">
      {gymBranches.length} locations
    </span>
  </div>

  {/* Danh sách chi nhánh nằm dưới biểu đồ */}
  <div className="space-y-2">
    {gymBranches.map((branch, index) => {
      const branchColor = getCrowdColor(
        branch.currentLevel
      );

      const branchLabel = getCrowdLabel(
        branch.currentLevel
      );

      const isSelected =
        selectedBranchIndex === index;

      const isQuietest =
        quietestBranchIndex === index;

      return (
        <button
          key={branch.name}
          onClick={() =>
            setSelectedBranchIndex(index)
          }
          className={`w-full rounded-xl border p-3 text-left transition-all ${
            isSelected
              ? "border-primary bg-primary/5"
              : "border-border bg-background hover:border-primary/30"
          }`}
        >
          <div className="flex items-start gap-3">
            {/* Location icon */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor:
                  branchColor + "18",
                border: `1px solid ${branchColor}35`,
              }}
            >
              <MapPin
                size={16}
                style={{
                  color: branchColor,
                }}
              />
            </div>

            {/* Thông tin cơ sở */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-foreground">
                  {branch.name}
                </p>

                {isQuietest && (
                  <span className="text-[9px] uppercase tracking-wider bg-primary/15 text-primary px-2 py-0.5 rounded-full font-bold">
                    Best choice
                  </span>
                )}
              </div>

<<<<<<< HEAD
              <p className="text-xs text-primary mt-0.5">
                {branch.shortName}
              </p>
=======
              <div className="mt-0.5">
  <p className="text-xs text-primary">
    {branch.shortName}
  </p>

  {branch.note && (
    <p className="text-[11px] text-muted-foreground mt-0.5">
      {branch.note}
    </p>
  )}
</div>
>>>>>>> 99fc191 (Initial commit)

              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                {branch.address}
              </p>
            </div>

            {/* Trạng thái hiện tại */}
            <div className="text-right flex-shrink-0">
              <span
                className="inline-block text-[10px] px-2 py-1 rounded-full font-bold"
                style={{
                  color: branchColor,
                  backgroundColor:
                    branchColor + "18",
                }}
              >
                {branchLabel}
              </span>

              <p className="text-[10px] text-muted-foreground mt-1">
                {branch.currentLevel}%
              </p>
            </div>
          </div>
        </button>
      );
    })}
  </div>
</div>

      <div className="bg-card rounded-2xl p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-barlow text-lg font-bold text-foreground">Today's Workout</h3>
          <ChevronRight size={15} className="text-muted-foreground" />
        </div>
        {[
          { name: "Cardio Warm-Up", duration: "10 min", done: true },
          { name: "Squat 4×12", duration: "20 min", done: false },
          { name: "Plank 3×45s", duration: "10 min", done: false },
        ].map(({ name, duration, done }) => (
          <div key={name} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                done ? "bg-primary border-primary" : "border-border"
              }`}
            >
              {done && <Check size={10} className="text-primary-foreground" />}
            </div>
            <span className={`text-sm flex-1 ${done ? "text-muted-foreground line-through" : "text-foreground"}`}>{name}</span>
            <span className="text-xs text-muted-foreground">{duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkoutTab({ user }: { user: UserData }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [trainingMode, setTrainingMode] = useState<"gym" | "home">("gym");
<<<<<<< HEAD

  const roadmapByGoal: Record<Goal, { title: string; note: string; days: { day: string; focus: string | null }[] }> = {
=======
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    if (!activeExercise) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeExercise]);

  const roadmapByGoal: Record<
    Goal,
    { title: string; note: string; days: { day: string; focus: string | null }[] }
  > = {
>>>>>>> 99fc191 (Initial commit)
    lose_weight: {
      title: "Fat-loss foundation",
      note: "Alternates strength and conditioning to burn calories while preserving muscle.",
      days: [
        { day: "Mo", focus: "Full Body" },
        { day: "Tu", focus: "Cardio & Core" },
        { day: "We", focus: null },
        { day: "Th", focus: "Lower Body" },
        { day: "Fr", focus: "Upper Body" },
        { day: "Sa", focus: "Mobility" },
        { day: "Su", focus: null },
      ],
    },
    gain_muscle: {
      title: "Progressive muscle gain",
      note: "Prioritizes compound lifts first, then isolation work with progressive overload.",
      days: [
        { day: "Mo", focus: "Upper Body" },
        { day: "Tu", focus: "Lower Body" },
        { day: "We", focus: null },
        { day: "Th", focus: "Upper Body" },
        { day: "Fr", focus: "Lower Body" },
        { day: "Sa", focus: "Core & Mobility" },
        { day: "Su", focus: null },
      ],
    },
    maintain: {
      title: "Balanced fitness",
      note: "A sustainable mix of strength, cardio and mobility for long-term consistency.",
      days: [
        { day: "Mo", focus: "Full Body" },
        { day: "Tu", focus: null },
        { day: "We", focus: "Cardio & Core" },
        { day: "Th", focus: null },
        { day: "Fr", focus: "Full Body" },
        { day: "Sa", focus: "Mobility" },
        { day: "Su", focus: null },
      ],
    },
    endurance: {
      title: "Endurance builder",
      note: "Builds aerobic capacity first, supported by strength and movement-quality sessions.",
      days: [
        { day: "Mo", focus: "Cardio & Core" },
        { day: "Tu", focus: "Lower Body" },
        { day: "We", focus: null },
        { day: "Th", focus: "Cardio & Core" },
        { day: "Fr", focus: "Upper Body" },
        { day: "Sa", focus: "Mobility" },
        { day: "Su", focus: null },
      ],
    },
  };

<<<<<<< HEAD
  type Exercise = {
    name: string;
    sets: string;
    equipment: string;
    kcal: number;
    level: "Beginner" | "Intermediate" | "Advanced";
    rest: string;
    cue: string;
  };

  const gymCatalog: Record<string, Exercise[]> = {
    "Upper Body": [
      { name: "Chest Press", sets: "4 × 10", equipment: "Chest Press Machine", kcal: 95, level: "Beginner", rest: "75 sec", cue: "Keep shoulder blades back" },
      { name: "Lat Pulldown", sets: "4 × 10", equipment: "Lat Pulldown Machine", kcal: 90, level: "Beginner", rest: "75 sec", cue: "Pull elbows toward ribs" },
      { name: "Seated Row", sets: "3 × 12", equipment: "Cable Row Machine", kcal: 80, level: "Intermediate", rest: "60 sec", cue: "Do not lean backward" },
      { name: "Shoulder Press", sets: "3 × 10", equipment: "Shoulder Press Machine", kcal: 75, level: "Intermediate", rest: "60 sec", cue: "Stop before elbows lock" },
      { name: "Tricep Pushdown", sets: "3 × 12", equipment: "Cable Machine", kcal: 55, level: "Beginner", rest: "45 sec", cue: "Keep elbows beside torso" },
    ],
    "Lower Body": [
      { name: "Leg Press", sets: "4 × 12", equipment: "45° Leg Press", kcal: 130, level: "Intermediate", rest: "90 sec", cue: "Knees track over toes" },
      { name: "Romanian Deadlift", sets: "3 × 10", equipment: "Barbell", kcal: 115, level: "Advanced", rest: "90 sec", cue: "Hinge hips, neutral spine" },
      { name: "Leg Curl", sets: "3 × 12", equipment: "Leg Curl Machine", kcal: 70, level: "Beginner", rest: "60 sec", cue: "Control the return" },
      { name: "Leg Extension", sets: "3 × 12", equipment: "Leg Extension Machine", kcal: 65, level: "Beginner", rest: "60 sec", cue: "Pause at the top" },
      { name: "Calf Raise", sets: "4 × 15", equipment: "Standing Calf Machine", kcal: 55, level: "Beginner", rest: "45 sec", cue: "Use full ankle range" },
    ],
    "Full Body": [
      { name: "Treadmill Warm-up", sets: "8 min", equipment: "Treadmill", kcal: 70, level: "Beginner", rest: "—", cue: "Easy conversational pace" },
      { name: "Goblet Squat", sets: "4 × 12", equipment: "Dumbbell", kcal: 120, level: "Beginner", rest: "75 sec", cue: "Chest tall, knees outward" },
      { name: "Chest Press", sets: "3 × 12", equipment: "Chest Press Machine", kcal: 85, level: "Beginner", rest: "60 sec", cue: "Wrists stay neutral" },
      { name: "Seated Row", sets: "3 × 12", equipment: "Cable Row Machine", kcal: 80, level: "Intermediate", rest: "60 sec", cue: "Squeeze shoulder blades" },
      { name: "Bike Finisher", sets: "10 min", equipment: "Stationary Bike", kcal: 115, level: "Intermediate", rest: "—", cue: "Alternate 30 sec hard/easy" },
    ],
    "Cardio & Core": [
      { name: "Incline Walk", sets: "15 min", equipment: "Treadmill", kcal: 145, level: "Beginner", rest: "—", cue: "Avoid holding the rails" },
      { name: "Row Intervals", sets: "8 × 45 sec", equipment: "Rowing Machine", kcal: 135, level: "Intermediate", rest: "45 sec", cue: "Drive with legs first" },
      { name: "Cable Crunch", sets: "3 × 15", equipment: "Cable Machine", kcal: 55, level: "Intermediate", rest: "45 sec", cue: "Curl ribs toward hips" },
      { name: "Plank", sets: "3 × 45 sec", equipment: "Exercise Mat", kcal: 35, level: "Beginner", rest: "45 sec", cue: "Keep hips level" },
    ],
    "Mobility": [
      { name: "Bike Recovery", sets: "10 min", equipment: "Stationary Bike", kcal: 70, level: "Beginner", rest: "—", cue: "Keep resistance light" },
      { name: "Hip Mobility Flow", sets: "2 rounds", equipment: "Exercise Mat", kcal: 30, level: "Beginner", rest: "30 sec", cue: "Move slowly through range" },
      { name: "Shoulder Mobility", sets: "2 rounds", equipment: "Resistance Band", kcal: 25, level: "Beginner", rest: "30 sec", cue: "No pinching sensation" },
    ],
    "Core & Mobility": [
      { name: "Cable Woodchop", sets: "3 × 12/side", equipment: "Cable Machine", kcal: 60, level: "Intermediate", rest: "45 sec", cue: "Rotate through torso" },
      { name: "Back Extension", sets: "3 × 12", equipment: "Back Extension Bench", kcal: 55, level: "Beginner", rest: "45 sec", cue: "Stop at neutral spine" },
      { name: "Dead Bug", sets: "3 × 10/side", equipment: "Exercise Mat", kcal: 35, level: "Beginner", rest: "30 sec", cue: "Keep lower back down" },
      { name: "Mobility Flow", sets: "8 min", equipment: "Exercise Mat", kcal: 30, level: "Beginner", rest: "—", cue: "Use controlled breathing" },
=======
  const gymCatalog: Record<string, Exercise[]> = {
    "Upper Body": [
      { name: "Chest Press", sets: "4 × 10", equipment: "Chest Press Machine", kcal: 95, level: "Beginner", rest: "75 sec", cue: "Keep shoulder blades back and press without locking the elbows." },
      { name: "Lat Pulldown", sets: "4 × 10", equipment: "Lat Pulldown Machine", kcal: 90, level: "Beginner", rest: "75 sec", cue: "Pull the elbows toward the ribs while keeping the chest tall." },
      { name: "Seated Row", sets: "3 × 12", equipment: "Cable Row Machine", kcal: 80, level: "Intermediate", rest: "60 sec", cue: "Finish each rep by squeezing the shoulder blades together." },
      { name: "Shoulder Press", sets: "3 × 10", equipment: "Shoulder Press Machine", kcal: 75, level: "Intermediate", rest: "60 sec", cue: "Brace the core and stop just before the elbows lock." },
      { name: "Tricep Pushdown", sets: "3 × 12", equipment: "Cable Machine", kcal: 55, level: "Beginner", rest: "45 sec", cue: "Keep the elbows pinned beside the torso." },
    ],
    "Lower Body": [
      { name: "Leg Press", sets: "4 × 12", equipment: "45° Leg Press", kcal: 130, level: "Intermediate", rest: "90 sec", cue: "Keep the knees tracking in line with the toes." },
      { name: "Romanian Deadlift", sets: "3 × 10", equipment: "Barbell", kcal: 115, level: "Advanced", rest: "90 sec", cue: "Push the hips back while maintaining a neutral spine." },
      { name: "Leg Curl", sets: "3 × 12", equipment: "Leg Curl Machine", kcal: 70, level: "Beginner", rest: "60 sec", cue: "Curl smoothly and control the return phase." },
      { name: "Leg Extension", sets: "3 × 12", equipment: "Leg Extension Machine", kcal: 65, level: "Beginner", rest: "60 sec", cue: "Pause briefly at the top without snapping the knees." },
      { name: "Calf Raise", sets: "4 × 15", equipment: "Standing Calf Machine", kcal: 55, level: "Beginner", rest: "45 sec", cue: "Use the full ankle range and pause at the top." },
    ],
    "Full Body": [
      { name: "Treadmill Warm-up", sets: "8 min", equipment: "Treadmill", kcal: 70, level: "Beginner", rest: "—", cue: "Start easy and build toward a conversational pace." },
      { name: "Goblet Squat", sets: "4 × 12", equipment: "Dumbbell", kcal: 120, level: "Beginner", rest: "75 sec", cue: "Keep the chest tall and gently drive the knees outward." },
      { name: "Chest Press", sets: "3 × 12", equipment: "Chest Press Machine", kcal: 85, level: "Beginner", rest: "60 sec", cue: "Keep the wrists neutral and shoulder blades supported." },
      { name: "Seated Row", sets: "3 × 12", equipment: "Cable Row Machine", kcal: 80, level: "Intermediate", rest: "60 sec", cue: "Pull toward the lower ribs without leaning backward." },
      { name: "Bike Finisher", sets: "10 min", equipment: "Stationary Bike", kcal: 115, level: "Intermediate", rest: "—", cue: "Alternate 30 seconds hard with 30 seconds easy." },
    ],
    "Cardio & Core": [
      { name: "Incline Walk", sets: "15 min", equipment: "Treadmill", kcal: 145, level: "Beginner", rest: "—", cue: "Stay tall and avoid holding the rails." },
      { name: "Row Intervals", sets: "8 × 45 sec", equipment: "Rowing Machine", kcal: 135, level: "Intermediate", rest: "45 sec", cue: "Drive with the legs first, then finish with the arms." },
      { name: "Cable Crunch", sets: "3 × 15", equipment: "Cable Machine", kcal: 55, level: "Intermediate", rest: "45 sec", cue: "Curl the ribs toward the hips rather than pulling with the arms." },
      { name: "Plank", sets: "3 × 45 sec", equipment: "Exercise Mat", kcal: 35, level: "Beginner", rest: "45 sec", cue: "Keep the hips level and squeeze the glutes." },
    ],
    Mobility: [
      { name: "Bike Recovery", sets: "10 min", equipment: "Stationary Bike", kcal: 70, level: "Beginner", rest: "—", cue: "Keep resistance light and breathing relaxed." },
      { name: "Hip Mobility Flow", sets: "2 rounds", equipment: "Exercise Mat", kcal: 30, level: "Beginner", rest: "30 sec", cue: "Move slowly through the available range." },
      { name: "Shoulder Mobility", sets: "2 rounds", equipment: "Resistance Band", kcal: 25, level: "Beginner", rest: "30 sec", cue: "Use a pain-free range with no pinching sensation." },
    ],
    "Core & Mobility": [
      { name: "Cable Woodchop", sets: "3 × 12/side", equipment: "Cable Machine", kcal: 60, level: "Intermediate", rest: "45 sec", cue: "Rotate through the torso while keeping the hips controlled." },
      { name: "Back Extension", sets: "3 × 12", equipment: "Back Extension Bench", kcal: 55, level: "Beginner", rest: "45 sec", cue: "Stop when the body reaches a neutral line." },
      { name: "Dead Bug", sets: "3 × 10/side", equipment: "Exercise Mat", kcal: 35, level: "Beginner", rest: "30 sec", cue: "Keep the lower back gently pressed into the mat." },
      { name: "Mobility Flow", sets: "8 min", equipment: "Exercise Mat", kcal: 30, level: "Beginner", rest: "—", cue: "Match controlled movement with slow breathing." },
>>>>>>> 99fc191 (Initial commit)
    ],
  };

  const homeCatalog: Record<string, Exercise[]> = {
    "Upper Body": [
<<<<<<< HEAD
      { name: "Incline Push-up", sets: "4 × 10", equipment: "Chair / Bench", kcal: 70, level: "Beginner", rest: "60 sec", cue: "Body stays in one line" },
      { name: "Backpack Row", sets: "4 × 12", equipment: "Loaded Backpack", kcal: 75, level: "Beginner", rest: "60 sec", cue: "Pull elbows behind body" },
      { name: "Pike Push-up", sets: "3 × 8", equipment: "Bodyweight", kcal: 65, level: "Intermediate", rest: "60 sec", cue: "Head travels between hands" },
      { name: "Chair Tricep Dip", sets: "3 × 10", equipment: "Stable Chair", kcal: 55, level: "Intermediate", rest: "45 sec", cue: "Keep shoulders away from ears" },
    ],
    "Lower Body": [
      { name: "Bodyweight Squat", sets: "4 × 15", equipment: "Bodyweight", kcal: 100, level: "Beginner", rest: "60 sec", cue: "Knees track over toes" },
      { name: "Reverse Lunge", sets: "3 × 10/side", equipment: "Bodyweight", kcal: 95, level: "Intermediate", rest: "60 sec", cue: "Front heel stays grounded" },
      { name: "Single-leg Glute Bridge", sets: "3 × 12/side", equipment: "Exercise Mat", kcal: 65, level: "Intermediate", rest: "45 sec", cue: "Keep pelvis level" },
      { name: "Calf Raise", sets: "4 × 18", equipment: "Step / Floor", kcal: 50, level: "Beginner", rest: "30 sec", cue: "Pause at the top" },
    ],
    "Full Body": [
      { name: "Marching Warm-up", sets: "5 min", equipment: "No equipment", kcal: 40, level: "Beginner", rest: "—", cue: "Build pace gradually" },
      { name: "Squat to Reach", sets: "4 × 12", equipment: "Bodyweight", kcal: 95, level: "Beginner", rest: "45 sec", cue: "Reach tall at the top" },
      { name: "Push-up", sets: "3 × 8–12", equipment: "Bodyweight", kcal: 70, level: "Intermediate", rest: "60 sec", cue: "Lower chest between hands" },
      { name: "Backpack Row", sets: "3 × 12", equipment: "Loaded Backpack", kcal: 70, level: "Beginner", rest: "60 sec", cue: "Keep spine neutral" },
      { name: "Mountain Climber", sets: "4 × 30 sec", equipment: "Exercise Mat", kcal: 90, level: "Intermediate", rest: "30 sec", cue: "Keep shoulders above wrists" },
    ],
    "Cardio & Core": [
      { name: "Low-impact Jumping Jack", sets: "5 × 45 sec", equipment: "No equipment", kcal: 100, level: "Beginner", rest: "30 sec", cue: "Land softly" },
      { name: "High Knees", sets: "6 × 30 sec", equipment: "No equipment", kcal: 115, level: "Intermediate", rest: "30 sec", cue: "Stay tall" },
      { name: "Dead Bug", sets: "3 × 10/side", equipment: "Exercise Mat", kcal: 35, level: "Beginner", rest: "30 sec", cue: "Keep lower back down" },
      { name: "Plank", sets: "3 × 40 sec", equipment: "Exercise Mat", kcal: 35, level: "Beginner", rest: "40 sec", cue: "Squeeze glutes" },
    ],
    "Mobility": [
      { name: "Cat–Cow", sets: "2 × 10", equipment: "Exercise Mat", kcal: 15, level: "Beginner", rest: "20 sec", cue: "Move one vertebra at a time" },
      { name: "World's Greatest Stretch", sets: "2 × 6/side", equipment: "Exercise Mat", kcal: 25, level: "Beginner", rest: "20 sec", cue: "Breathe into the rotation" },
      { name: "90/90 Hip Switch", sets: "2 × 10", equipment: "Exercise Mat", kcal: 20, level: "Beginner", rest: "20 sec", cue: "Keep movement controlled" },
    ],
    "Core & Mobility": [
      { name: "Dead Bug", sets: "3 × 10/side", equipment: "Exercise Mat", kcal: 35, level: "Beginner", rest: "30 sec", cue: "Keep lower back down" },
      { name: "Side Plank", sets: "3 × 30 sec/side", equipment: "Exercise Mat", kcal: 35, level: "Intermediate", rest: "30 sec", cue: "Keep hips stacked" },
      { name: "Bird Dog", sets: "3 × 10/side", equipment: "Exercise Mat", kcal: 30, level: "Beginner", rest: "30 sec", cue: "Do not rotate hips" },
      { name: "Mobility Flow", sets: "8 min", equipment: "Exercise Mat", kcal: 30, level: "Beginner", rest: "—", cue: "Use controlled breathing" },
    ],
  };

  const levelColors: Record<string, string> = {
    Beginner: "text-primary bg-primary/15",
    Intermediate: "text-yellow-400 bg-yellow-400/15",
    Advanced: "text-accent bg-accent/15",
=======
      { name: "Incline Push-up", sets: "4 × 10", equipment: "Chair / Bench", kcal: 70, level: "Beginner", rest: "60 sec", cue: "Keep the body in one straight line from head to heels." },
      { name: "Backpack Row", sets: "4 × 12", equipment: "Loaded Backpack", kcal: 75, level: "Beginner", rest: "60 sec", cue: "Pull the elbows behind the body without shrugging." },
      { name: "Pike Push-up", sets: "3 × 8", equipment: "Bodyweight", kcal: 65, level: "Intermediate", rest: "60 sec", cue: "Let the head travel between the hands." },
      { name: "Chair Tricep Dip", sets: "3 × 10", equipment: "Stable Chair", kcal: 55, level: "Intermediate", rest: "45 sec", cue: "Keep the shoulders away from the ears." },
    ],
    "Lower Body": [
      { name: "Bodyweight Squat", sets: "4 × 15", equipment: "Bodyweight", kcal: 100, level: "Beginner", rest: "60 sec", cue: "Sit between the hips and keep the knees over the toes." },
      { name: "Reverse Lunge", sets: "3 × 10/side", equipment: "Bodyweight", kcal: 95, level: "Intermediate", rest: "60 sec", cue: "Keep the front heel grounded throughout the rep." },
      { name: "Single-leg Glute Bridge", sets: "3 × 12/side", equipment: "Exercise Mat", kcal: 65, level: "Intermediate", rest: "45 sec", cue: "Keep the pelvis level as the hips rise." },
      { name: "Calf Raise", sets: "4 × 18", equipment: "Step / Floor", kcal: 50, level: "Beginner", rest: "30 sec", cue: "Pause at the top and lower slowly." },
    ],
    "Full Body": [
      { name: "Marching Warm-up", sets: "5 min", equipment: "No equipment", kcal: 40, level: "Beginner", rest: "—", cue: "Build the pace gradually and swing the arms naturally." },
      { name: "Squat to Reach", sets: "4 × 12", equipment: "Bodyweight", kcal: 95, level: "Beginner", rest: "60 sec", cue: "Stand tall and reach overhead at the top." },
      { name: "Incline Push-up", sets: "3 × 10", equipment: "Chair / Bench", kcal: 60, level: "Beginner", rest: "60 sec", cue: "Keep the ribs stacked and elbows at roughly 45 degrees." },
      { name: "Reverse Lunge", sets: "3 × 10/side", equipment: "Bodyweight", kcal: 95, level: "Intermediate", rest: "60 sec", cue: "Step back softly and drive through the front foot." },
      { name: "Mountain Climber", sets: "4 × 30 sec", equipment: "Exercise Mat", kcal: 90, level: "Intermediate", rest: "30 sec", cue: "Keep the shoulders over the wrists and hips steady." },
    ],
    "Cardio & Core": [
      { name: "Jumping Jack", sets: "5 × 45 sec", equipment: "No equipment", kcal: 115, level: "Beginner", rest: "30 sec", cue: "Land softly and keep a steady rhythm." },
      { name: "Mountain Climber", sets: "4 × 30 sec", equipment: "Exercise Mat", kcal: 90, level: "Intermediate", rest: "30 sec", cue: "Drive the knees without bouncing the hips." },
      { name: "Dead Bug", sets: "3 × 10/side", equipment: "Exercise Mat", kcal: 35, level: "Beginner", rest: "30 sec", cue: "Keep the lower back in contact with the mat." },
      { name: "Plank", sets: "3 × 40 sec", equipment: "Exercise Mat", kcal: 35, level: "Beginner", rest: "40 sec", cue: "Brace the abdomen and squeeze the glutes." },
    ],
    Mobility: [
      { name: "Cat–Cow", sets: "2 × 10", equipment: "Exercise Mat", kcal: 15, level: "Beginner", rest: "20 sec", cue: "Move smoothly one vertebra at a time." },
      { name: "World's Greatest Stretch", sets: "2 × 6/side", equipment: "Exercise Mat", kcal: 25, level: "Beginner", rest: "20 sec", cue: "Breathe into the rotation and avoid forcing range." },
      { name: "90/90 Hip Switch", sets: "2 × 10", equipment: "Exercise Mat", kcal: 20, level: "Beginner", rest: "20 sec", cue: "Stay tall and keep the movement controlled." },
    ],
    "Core & Mobility": [
      { name: "Dead Bug", sets: "3 × 10/side", equipment: "Exercise Mat", kcal: 35, level: "Beginner", rest: "30 sec", cue: "Keep the lower back gently down." },
      { name: "Side Plank", sets: "3 × 30 sec/side", equipment: "Exercise Mat", kcal: 35, level: "Intermediate", rest: "30 sec", cue: "Stack the hips and keep the body long." },
      { name: "Bird Dog", sets: "3 × 10/side", equipment: "Exercise Mat", kcal: 30, level: "Beginner", rest: "30 sec", cue: "Reach long without rotating the hips." },
      { name: "Mobility Flow", sets: "8 min", equipment: "Exercise Mat", kcal: 30, level: "Beginner", rest: "—", cue: "Use controlled breathing throughout the flow." },
    ],
  };

  const levelClasses: Record<Exercise["level"], string> = {
    Beginner: "text-primary bg-primary/15 border-primary/20",
    Intermediate: "text-blue-300 bg-blue-400/10 border-blue-300/20",
    Advanced: "text-white bg-white/10 border-white/15",
  };

  const getExerciseVideo = (exercise: Exercise) => {
    const key = `${exercise.name} ${exercise.equipment}`.toLowerCase();
    if (/squat|leg press|leg extension|leg curl|calf|bridge|deadlift/.test(key)) return "/videos/squat.mp4";
    if (/lunge|split/.test(key)) return "/videos/lunge.mp4";
    if (/press|push-up|dip|tricep/.test(key)) return "/videos/press.mp4";
    if (/row|pulldown|woodchop|backpack/.test(key)) return "/videos/pull.mp4";
    if (/plank|dead bug|bird dog|mountain climber|crunch|extension/.test(key)) return "/videos/plank.mp4";
    if (/mobility|stretch|cat|90\/90|recovery/.test(key)) return "/videos/mobility.mp4";
    return "/videos/cardio.mp4";
>>>>>>> 99fc191 (Initial commit)
  };

  const roadmap = roadmapByGoal[user.goal];
  const currentDay = roadmap.days[selectedDay];
  const exercises = currentDay.focus
    ? (trainingMode === "gym" ? gymCatalog : homeCatalog)[currentDay.focus] ?? []
    : [];
  const estimatedCalories = exercises.reduce((sum, exercise) => sum + exercise.kcal, 0);

  return (
<<<<<<< HEAD
    <div className="p-4 space-y-4 pb-4 relative">
      <div className="pt-3">
        <h2 className="font-barlow text-4xl font-black text-foreground leading-none">Training<br />Roadmap</h2>
        <p className="text-muted-foreground text-sm mt-1.5">{goalLabels[user.goal]}</p>
      </div>

      <div className="bg-card rounded-2xl p-4 border border-border">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-barlow text-xl font-bold text-foreground">{roadmap.title}</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{roadmap.note}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
            <Zap size={17} className="text-primary" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 bg-muted p-1 rounded-xl">
          {(["gym", "home"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setTrainingMode(mode)}
              className={`py-2.5 rounded-lg text-xs font-semibold transition-all ${
                trainingMode === mode ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {mode === "gym" ? "Gym machines" : "Train at home"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
        {roadmap.days.map(({ day, focus }, index) => (
          <button
            key={day}
            onClick={() => setSelectedDay(index)}
            className={`flex-shrink-0 flex flex-col items-center gap-1.5 w-10 py-2.5 rounded-xl border transition-all ${
              selectedDay === index
                ? "bg-primary border-primary"
                : focus === null
                ? "bg-card/50 border-border opacity-50"
                : "bg-card border-border hover:border-primary/40"
            }`}
          >
            <span className={`text-xs font-bold ${selectedDay === index ? "text-primary-foreground" : "text-muted-foreground"}`}>{day}</span>
            <div className={`w-1.5 h-1.5 rounded-full ${focus ? selectedDay === index ? "bg-primary-foreground" : "bg-primary" : "bg-transparent"}`} />
          </button>
        ))}
      </div>

      <div className="bg-card rounded-2xl p-4 border border-border">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="font-barlow text-2xl font-bold text-foreground">{currentDay.focus ?? "Recovery Day"}</span>
            {exercises.length > 0 && (
              <p className="text-sm text-muted-foreground mt-1">Follow the order below · {exercises.length} exercises</p>
            )}
          </div>
          {exercises.length > 0 && (
            <div className="text-right flex-shrink-0">
              <span className="text-xs text-muted-foreground block">Estimated</span>
              <span className="font-barlow text-lg font-bold text-primary">~{estimatedCalories} kcal</span>
            </div>
          )}
        </div>
      </div>

      {exercises.length > 0 ? (
        <div className="space-y-2.5">
          {exercises.map((exercise, index) => (
            <div key={exercise.name} className="bg-card rounded-xl p-4 border border-border hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground text-xs font-barlow font-black">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <span className="font-bold text-foreground text-sm">{exercise.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${levelColors[exercise.level]}`}>{exercise.level}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <div
                        className="w-8 h-8 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center"
                        aria-label={`AI camera preview for ${exercise.name}`}
                        title="AI camera checks exercise form"
                      >
                        <Camera size={15} className="text-primary" />
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-xs text-primary mb-2 flex items-center gap-1.5">
                    <Dumbbell size={11} /> {exercise.equipment}
                  </p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span><Activity size={10} className="inline mr-1" />{exercise.sets}</span>
                    <span><Clock size={10} className="inline mr-1" />Rest {exercise.rest}</span>
                    <span className="col-span-2 text-foreground/80">Technique tip: {exercise.cue}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl p-10 border border-border text-center">
          <div className="text-5xl mb-3">😴</div>
          <p className="font-barlow text-xl font-bold text-foreground mb-1">Recovery Day</p>
          <p className="text-sm text-muted-foreground">Walk gently, hydrate and let your body adapt.</p>
        </div>
      )}
    </div>
  );
}
function NutritionTab() {
  const [section, setSection] = useState<"track" | "order">("track");
  const [desiredMealCalories, setDesiredMealCalories] = useState(300);
  const [kitchenOrderCalories, setKitchenOrderCalories] = useState(350);
  const [kitchenNotes, setKitchenNotes] = useState("");
  const [selectedMealId, setSelectedMealId] = useState<number | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [sendingOrder, setSendingOrder] = useState(false);
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([api.getMenu(), api.getOrders()])
      .then(([menuResult, orderResult]) => {
        if (!active) return;
        setMenuItems(menuResult.items);
        setOrders(orderResult.orders);
      })
      .catch((error) => {
        if (active) setErrorMessage(error instanceof ApiError ? error.message : "Could not load the kitchen menu.");
      })
      .finally(() => {
        if (active) setLoadingMenu(false);
      });
    return () => { active = false; };
  }, []);
=======
    <>
      <div className="p-4 space-y-4 pb-4 relative">
        <div className="pt-3 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-primary font-bold mb-2">Core x BTS</p>
            <h2 className="font-barlow text-4xl font-black text-foreground leading-none">Training<br />Roadmap</h2>
            <p className="text-muted-foreground text-sm mt-1.5">{goalLabels[user.goal]}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl border border-primary/25 bg-primary/10 flex items-center justify-center">
            <Play size={19} className="text-primary fill-primary" />
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="font-barlow text-xl font-bold text-foreground">{roadmap.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{roadmap.note}</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Zap size={17} className="text-primary" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 bg-muted p-1 rounded-xl">
            {(["gym", "home"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTrainingMode(mode)}
                className={`py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  trainingMode === mode
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode === "gym" ? "Gym machines" : "Train at home"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {roadmap.days.map(({ day, focus }, index) => (
            <button
              key={day}
              onClick={() => setSelectedDay(index)}
              className={`flex-shrink-0 flex flex-col items-center gap-1.5 w-10 py-2.5 rounded-xl border transition-all ${
                selectedDay === index
                  ? "bg-primary border-primary"
                  : focus === null
                  ? "bg-card/50 border-border opacity-50"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <span className={`text-xs font-bold ${selectedDay === index ? "text-primary-foreground" : "text-muted-foreground"}`}>{day}</span>
              <div className={`w-1.5 h-1.5 rounded-full ${focus ? selectedDay === index ? "bg-primary-foreground" : "bg-primary" : "bg-transparent"}`} />
            </button>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="font-barlow text-2xl font-bold text-foreground">{currentDay.focus ?? "Recovery Day"}</span>
              {exercises.length > 0 && (
                <p className="text-sm text-muted-foreground mt-1">Tap an exercise to open its vertical form demo.</p>
              )}
            </div>
            {exercises.length > 0 && (
              <div className="text-right flex-shrink-0">
                <span className="text-xs text-muted-foreground block">Estimated</span>
                <span className="font-barlow text-lg font-bold text-primary">~{estimatedCalories} kcal</span>
              </div>
            )}
          </div>
        </div>

        {exercises.length > 0 ? (
          <div className="space-y-2.5">
            {exercises.map((exercise, index) => (
              <button
                key={`${exercise.name}-${index}`}
                onClick={() => setActiveExercise(exercise)}
                className="w-full text-left bg-card rounded-xl p-4 border border-border hover:border-primary/50 hover:bg-primary/[0.035] active:scale-[0.99] transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.18)]">
                    <span className="text-primary-foreground text-xs font-barlow font-black">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2 flex-wrap min-w-0">
                        <span className="font-bold text-foreground text-sm">{exercise.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-md border font-medium ${levelClasses[exercise.level]}`}>{exercise.level}</span>
                      </div>
                      <div className="w-8 h-8 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        <Play size={13} className="text-primary fill-primary group-hover:text-white group-hover:fill-white" />
                      </div>
                    </div>
                    <p className="text-xs text-primary mb-2 flex items-center gap-1.5">
                      <Dumbbell size={11} /> {exercise.equipment}
                    </p>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span><Activity size={10} className="inline mr-1" />{exercise.sets}</span>
                      <span><Clock size={10} className="inline mr-1" />Rest {exercise.rest}</span>
                      <span className="col-span-2 text-foreground/75 line-clamp-1">Technique: {exercise.cue}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-2xl p-10 border border-border text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
              <Activity size={22} className="text-primary" />
            </div>
            <p className="font-barlow text-xl font-bold text-foreground mb-1">Recovery Day</p>
            <p className="text-sm text-muted-foreground">Walk gently, hydrate and let your body adapt.</p>
          </div>
        )}
      </div>

      {activeExercise && (
        <div className="fixed inset-0 z-[100] bg-black" role="dialog" aria-modal="true" aria-label={`${activeExercise.name} exercise demo`}>
          <div className="relative h-full w-full max-w-sm mx-auto overflow-hidden bg-black">
            <video
              key={activeExercise.name}
              src={getExerciseVideo(activeExercise)}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/45 pointer-events-none" />

            <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-[max(16px,env(safe-area-inset-top))]">
              <div className="h-0.5 bg-white/20 rounded-full overflow-hidden mb-4">
                <div className="h-full w-full bg-primary reel-progress" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-primary font-bold">Workout demo</p>
                  <p className="text-xs text-white/60 mt-0.5">CORE × BTS · DTB7_Group 3</p>
                </div>
                <button
                  onClick={() => setActiveExercise(null)}
                  className="w-10 h-10 rounded-full bg-black/45 border border-white/15 backdrop-blur-md flex items-center justify-center"
                  aria-label="Close exercise demo"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 p-5 pb-[max(24px,env(safe-area-inset-bottom))]">
              <span className={`inline-flex text-[10px] px-2.5 py-1 rounded-full border font-bold ${levelClasses[activeExercise.level]}`}>
                {activeExercise.level}
              </span>
              <h3 className="font-barlow text-4xl font-black text-white leading-none mt-3 mb-2">{activeExercise.name}</h3>
              <p className="text-sm text-white/70 mb-3">{activeExercise.equipment}</p>

              <div className="flex gap-2 flex-wrap mb-3">
                <span className="text-xs text-white bg-white/10 border border-white/10 rounded-full px-2.5 py-1.5">{activeExercise.sets}</span>
                <span className="text-xs text-white bg-white/10 border border-white/10 rounded-full px-2.5 py-1.5">Rest {activeExercise.rest}</span>
                <span className="text-xs text-primary bg-primary/15 border border-primary/25 rounded-full px-2.5 py-1.5">~{activeExercise.kcal} kcal</span>
              </div>

              <div className="bg-black/45 backdrop-blur-xl rounded-2xl p-4 border border-white/15">
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary font-bold mb-1.5">Form cue</p>
                <p className="text-sm text-white leading-relaxed">{activeExercise.cue}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NutritionTab() {
  const [section, setSection] = useState<"track" | "order">("track");

  // Lượng kcal người dùng muốn tìm món tương đương
  const [desiredMealCalories, setDesiredMealCalories] = useState(300);

  // Thông tin đơn đặt bếp
  const [kitchenOrderCalories, setKitchenOrderCalories] = useState(350);
  const [kitchenNotes, setKitchenNotes] = useState("");
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [ordered, setOrdered] = useState(false);
>>>>>>> 99fc191 (Initial commit)

  const calorieGoal = 2200;
  const consumed = 1450;
  const pct = (consumed / calorieGoal) * 100;
<<<<<<< HEAD
  const macros = [
    { name: "Protein", eaten: 85, goal: 120, color: "#60a5fa", unit: "g" },
    { name: "Carbs", eaten: 165, goal: 220, color: "#c8f135", unit: "g" },
    { name: "Fat", eaten: 45, goal: 65, color: "#fbbf24", unit: "g" },
  ];
  const meals = [
    { time: "7:30", name: "Breakfast", desc: "Oatmeal + scrambled eggs + spinach", kcal: 420 },
    { time: "12:00", name: "Lunch", desc: "Grilled chicken breast + sweet potato + salad", kcal: 580 },
    { time: "15:00", name: "Snack", desc: "Banana + whey protein", kcal: 250 },
    { time: "19:00", name: "Dinner", desc: "Not logged yet", kcal: 0 },
  ];

  const suggestedMeals = [...menuItems]
    .sort((a, b) => Math.abs(a.calories - desiredMealCalories) - Math.abs(b.calories - desiredMealCalories))
    .slice(0, 4);
  const selectedMeal = menuItems.find((item) => item.id === selectedMealId) ?? null;

  const chooseMeal = (meal: MenuItem) => {
    setSelectedMealId(meal.id);
    setKitchenOrderCalories(meal.calories);
    setKitchenNotes(`Preferred meal: ${meal.name}`);
    setNotice("");
    setErrorMessage("");
  };

  const sendKitchenOrder = async () => {
    if (sendingOrder || kitchenOrderCalories < 100 || kitchenOrderCalories > 1500) return;
    setSendingOrder(true);
    setNotice("");
    setErrorMessage("");
    try {
      const result = await api.createOrder({
        calorieTarget: kitchenOrderCalories,
        notes: kitchenNotes,
        menuItemId: selectedMealId,
      });
      setOrders((current) => [result.order, ...current]);
      setNotice(`Order #${result.order.id} was sent to the gym kitchen.`);
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : "The order could not be submitted.");
    } finally {
      setSendingOrder(false);
    }
  };

  return (
    <div className="p-4 space-y-4 pb-4 sm:p-6">
      <div className="pt-3">
        <h2 className="font-barlow text-4xl font-black text-foreground leading-none">Nutrition</h2>
        <p className="text-muted-foreground text-sm mt-1">{formatToday()}</p>
      </div>

      <div className="flex gap-1.5 bg-muted p-1 rounded-xl">
        {[
          { id: "track" as const, label: "Calorie Tracking" },
          { id: "order" as const, label: "Order a Meal" },
        ].map(({ id, label }) => (
          <button key={id} onClick={() => setSection(id)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${section === id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
=======

  const macros = [
    {
      name: "Protein",
      eaten: 85,
      goal: 120,
      color: "#3b82f6",
      unit: "g",
    },
    {
      name: "Carbs",
      eaten: 165,
      goal: 220,
      color: "#2563eb",
      unit: "g",
    },
    {
      name: "Fat",
      eaten: 45,
      goal: 65,
      color: "#3b82f6",
      unit: "g",
    },
  ];

  const meals = [
    {
      time: "7:30",
      name: "Breakfast",
      desc: "Oatmeal + scrambled eggs + spinach",
      kcal: 420,
    },
    {
      time: "12:00",
      name: "Lunch",
      desc: "Grilled chicken breast + sweet potato + salad",
      kcal: 580,
    },
    {
      time: "15:00",
      name: "Snack",
      desc: "Banana + whey protein",
      kcal: 250,
    },
    {
      time: "19:00",
      name: "Dinner",
      desc: "Not logged yet",
      kcal: 0,
    },
  ];

  type MealSuggestion = {
    id: number;
    name: string;
    calories: number;
    price: string;
    image: string;
    description: string;
    protein: number;
  };

  const mealSuggestions: MealSuggestion[] = [
    {
      id: 1,
      name: "Eggs & Sweet Potato",
      calories: 300,
      price: "$7.00",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop&auto=format",
      description:
        "Boiled eggs, roasted sweet potato and fresh vegetables.",
      protein: 22,
    },
    {
      id: 2,
      name: "Chicken Rice Bowl",
      calories: 420,
      price: "$9.50",
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop&auto=format",
      description:
        "Grilled chicken breast, brown rice and steamed vegetables.",
      protein: 38,
    },
    {
      id: 3,
      name: "Oatmeal & Fruit",
      calories: 280,
      price: "$6.50",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format",
      description:
        "Oatmeal, banana, berries and a small serving of yogurt.",
      protein: 16,
    },
    {
      id: 4,
      name: "Salmon Salad",
      calories: 350,
      price: "$11.00",
      image:
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop&auto=format",
      description:
        "Grilled salmon, mixed greens, tomatoes and light dressing.",
      protein: 32,
    },
    {
      id: 5,
      name: "Greek Yogurt Bowl",
      calories: 250,
      price: "$6.00",
      image:
        "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&h=400&fit=crop&auto=format",
      description:
        "Greek yogurt, granola, fresh fruit and a small amount of honey.",
      protein: 20,
    },
    {
      id: 6,
      name: "Beef & Broccoli Bowl",
      calories: 450,
      price: "$10.50",
      image:
        "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=600&h=400&fit=crop&auto=format",
      description:
        "Lean beef, broccoli, brown rice and a low-sodium sauce.",
      protein: 40,
    },
    {
      id: 7,
      name: "Tuna Sandwich Set",
      calories: 380,
      price: "$8.00",
      image:
        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop&auto=format",
      description:
        "Whole-grain tuna sandwich served with a fresh side salad.",
      protein: 30,
    },
    {
      id: 8,
      name: "High-Protein Gym Set",
      calories: 550,
      price: "$12.00",
      image:
        "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?w=600&h=400&fit=crop&auto=format",
      description:
        "Chicken breast, eggs, brown rice and mixed vegetables.",
      protein: 52,
    },
  ];

  // Sắp xếp món ăn theo độ gần với lượng kcal người dùng nhập
  const suggestedMeals = [...mealSuggestions]
    .sort(
      (a, b) =>
        Math.abs(a.calories - desiredMealCalories) -
        Math.abs(b.calories - desiredMealCalories)
    )
    .slice(0, 4);

  const chooseMeal = (meal: MealSuggestion) => {
    setSelectedMeal(meal.name);
    setKitchenOrderCalories(meal.calories);
    setKitchenNotes(`Preferred meal: ${meal.name}`);
    setOrdered(false);
  };

  const sendKitchenOrder = () => {
    if (kitchenOrderCalories <= 0) return;
    setOrdered(true);
  };

  return (
    <div className="p-4 space-y-4 pb-4">
      {/* Header */}
      <div className="pt-3">
        <h2 className="font-barlow text-4xl font-black text-foreground leading-none">
          Nutrition
        </h2>

        <p className="text-muted-foreground text-sm mt-1">
          Wednesday, July 9
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 bg-muted p-1 rounded-xl">
        {[
          {
            id: "track" as const,
            label: "Calorie Tracking",
          },
          {
            id: "order" as const,
            label: "Order a Meal",
          },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setSection(id)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              section === id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
>>>>>>> 99fc191 (Initial commit)
            {label}
          </button>
        ))}
      </div>

<<<<<<< HEAD
      {section === "track" && (
        <>
          <div className="bg-card rounded-2xl p-5 border border-border flex items-center gap-5">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="30" fill="none" stroke="#1c2535" strokeWidth="8" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="#c8f135" strokeWidth="8" strokeDasharray={`${(2 * Math.PI * 30 * pct) / 100} ${2 * Math.PI * 30}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-barlow text-lg font-black text-foreground leading-none">{consumed}</span>
                <span className="text-xs text-muted-foreground">kcal</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Remaining</p>
              <p className="font-barlow text-4xl font-black text-primary">{calorieGoal - consumed}</p>
              <p className="text-xs text-muted-foreground mt-0.5">kcal · goal {calorieGoal}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {macros.map(({ name, eaten, goal, color, unit }) => (
              <div key={name} className="bg-card rounded-xl p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1.5">{name}</p>
                <p className="font-barlow text-lg font-bold text-foreground">{eaten}<span className="text-xs font-normal text-muted-foreground">/{goal}{unit}</span></p>
                <div className="h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(eaten / goal) * 100}%`, backgroundColor: color }} />
=======
      {/* CALORIE TRACKING */}
      {section === "track" && (
        <>
          {/* Calories circle */}
          <div className="bg-card rounded-2xl p-5 border border-border flex items-center gap-5">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg
                viewBox="0 0 80 80"
                className="w-full h-full -rotate-90"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  fill="none"
                  stroke="#1c2535"
                  strokeWidth="8"
                />

                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="8"
                  strokeDasharray={`${
                    (2 * Math.PI * 30 * pct) / 100
                  } ${2 * Math.PI * 30}`}
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-barlow text-lg font-black text-foreground leading-none">
                  {consumed}
                </span>

                <span className="text-xs text-muted-foreground">
                  kcal
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Remaining
              </p>

              <p className="font-barlow text-4xl font-black text-primary">
                {calorieGoal - consumed}
              </p>

              <p className="text-xs text-muted-foreground mt-0.5">
                kcal · goal {calorieGoal}
              </p>
            </div>
          </div>

          {/* Macros */}
          <div className="grid grid-cols-3 gap-2.5">
            {macros.map(({ name, eaten, goal, color, unit }) => (
              <div
                key={name}
                className="bg-card rounded-xl p-3 border border-border"
              >
                <p className="text-xs text-muted-foreground mb-1.5">
                  {name}
                </p>

                <p className="font-barlow text-lg font-bold text-foreground">
                  {eaten}

                  <span className="text-xs font-normal text-muted-foreground">
                    /{goal}
                    {unit}
                  </span>
                </p>

                <div className="h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(eaten / goal) * 100}%`,
                      backgroundColor: color,
                    }}
                  />
>>>>>>> 99fc191 (Initial commit)
                </div>
              </div>
            ))}
          </div>

<<<<<<< HEAD
          <div className="bg-card rounded-2xl p-4 border border-border">
            <h3 className="font-barlow text-lg font-bold text-foreground mb-3">Today&apos;s Meals</h3>
            <div className="space-y-3">
              {meals.map((meal) => (
                <div key={meal.time} className="flex items-center gap-3 rounded-xl bg-muted/45 p-3">
                  <span className="w-11 text-xs font-semibold text-primary">{meal.time}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">{meal.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{meal.desc}</p>
                  </div>
                  <span className="text-xs font-semibold text-foreground">{meal.kcal || "—"} {meal.kcal ? "kcal" : ""}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {section === "order" && (
        <>
          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="font-barlow text-lg font-bold text-foreground">Meals near your calorie target</h3>
                <p className="text-xs text-muted-foreground mt-1">Menu items are loaded from the SQLite database.</p>
              </div>
              <div className="relative w-28 flex-shrink-0">
                <input type="number" min={100} max={1500} value={desiredMealCalories} onChange={(event) => setDesiredMealCalories(Number(event.target.value))} className="w-full rounded-xl border border-border bg-muted px-3 py-2 pr-10 text-sm text-foreground outline-none focus:border-primary" />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">kcal</span>
              </div>
            </div>

            {loadingMenu ? (
              <div className="flex items-center justify-center py-10 text-muted-foreground"><LoaderCircle size={20} className="animate-spin" /></div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {suggestedMeals.map((meal) => {
                  const difference = meal.calories - desiredMealCalories;
                  const selected = selectedMealId === meal.id;
                  return (
                    <div key={meal.id} className={`overflow-hidden rounded-xl border bg-background ${selected ? "border-primary" : "border-border"}`}>
                      <img src={meal.image} alt={meal.name} className="h-32 w-full object-cover bg-muted" />
                      <div className="p-3">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-foreground">{meal.name}</h4>
                          <span className="whitespace-nowrap text-xs font-bold text-foreground">${(meal.priceCents / 100).toFixed(2)}</span>
                        </div>
                        <p className="mt-1 line-clamp-2 min-h-[34px] text-[11px] leading-relaxed text-muted-foreground">{meal.description}</p>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <span className="font-semibold text-primary">{meal.calories} kcal · {meal.protein}g protein</span>
                          <span className="text-muted-foreground">{difference === 0 ? "Exact" : `${difference > 0 ? "+" : ""}${difference}`}</span>
                        </div>
                        <button onClick={() => chooseMeal(meal)} className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold ${selected ? "bg-primary/15 text-primary" : "bg-primary text-primary-foreground"}`}>
                          {selected ? <><Check size={13} /> Selected</> : <><ShoppingBag size={13} /> Choose Meal</>}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0"><ShoppingBag size={18} className="text-primary-foreground" /></div>
              <div>
                <h3 className="font-barlow text-lg font-bold text-foreground">Custom Kitchen Order</h3>
                <p className="text-xs text-muted-foreground mt-0.5">The order will be stored in your account and can be viewed below.</p>
              </div>
            </div>

            <label className="mb-4 block">
              <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">Meal calorie target</span>
              <div className="relative">
                <input type="number" min={100} max={1500} step={10} value={kitchenOrderCalories} onChange={(event) => { setKitchenOrderCalories(Number(event.target.value)); setNotice(""); }} className="w-full bg-muted border border-border rounded-xl px-4 py-3.5 pr-16 text-foreground focus:outline-none focus:border-primary" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">kcal</span>
              </div>
            </label>

            <label className="mb-4 block">
              <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">Food preferences — optional</span>
              <textarea rows={4} value={kitchenNotes} onChange={(event) => { setKitchenNotes(event.target.value); setNotice(""); }} className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none" placeholder="No oil, low salt, no peanuts..." />
            </label>

            <div className="rounded-xl bg-muted/50 border border-border p-3.5 mb-4 text-xs">
              <div className="flex justify-between gap-4"><span className="text-muted-foreground">Meal</span><span className="text-right text-foreground">{selectedMeal?.name ?? "Kitchen's choice"}</span></div>
              <div className="mt-2 flex justify-between gap-4"><span className="text-muted-foreground">Target</span><span className="text-foreground">{kitchenOrderCalories || 0} kcal</span></div>
            </div>

            {notice && <div className="mb-4 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">{notice}</div>}
            {errorMessage && <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{errorMessage}</div>}

            <button onClick={sendKitchenOrder} disabled={sendingOrder || kitchenOrderCalories < 100 || kitchenOrderCalories > 1500} className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40">
              {sendingOrder ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={16} />}
              {sendingOrder ? "Sending order..." : "Send order to gym kitchen"}
            </button>
          </div>

          <div className="bg-card rounded-2xl p-4 border border-border">
            <h3 className="font-barlow text-lg font-bold text-foreground mb-3">Recent Orders</h3>
            {orders.length === 0 ? (
              <p className="text-sm text-muted-foreground">No orders yet.</p>
            ) : (
              <div className="space-y-2.5">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="rounded-xl border border-border bg-muted/35 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-foreground">#{order.id} · {order.mealName ?? "Custom meal"}</p>
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase text-primary">{order.status}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{order.calorieTarget} kcal · {new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
=======
          {/* Meal log */}
          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-barlow text-lg font-bold text-foreground">
                Meal Log
              </h3>

              <button className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Plus
                  size={14}
                  className="text-primary-foreground"
                />
              </button>
            </div>

            {meals.map(({ time, name, desc, kcal }) => (
              <div
                key={name}
                className="flex items-center gap-3 py-2.5 border-b border-border last:border-0"
              >
                <span className="text-xs text-muted-foreground font-mono w-10 flex-shrink-0">
                  {time}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {name}
                  </p>

                  <p className="text-xs text-muted-foreground truncate">
                    {desc}
                  </p>
                </div>

                <span
                  className={`text-sm font-barlow font-bold flex-shrink-0 ${
                    kcal === 0
                      ? "text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {kcal > 0 ? kcal : "—"}
                </span>
              </div>
            ))}
          </div>

          {/* Button to open food ordering */}
          <button
            onClick={() => setSection("order")}
            className="w-full bg-card rounded-2xl p-4 border border-primary/30 flex items-center gap-3 text-left hover:bg-primary/5 transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <Utensils
                size={19}
                className="text-primary-foreground"
              />
            </div>

            <div className="flex-1">
              <p className="font-bold text-foreground">
                Need a meal recommendation?
              </p>

              <p className="text-xs text-muted-foreground mt-0.5">
                Find food based on your target calories
              </p>
            </div>

            <ChevronRight
              size={18}
              className="text-muted-foreground"
            />
          </button>
        </>
      )}

      {/* ORDER FOOD */}
      {section === "order" && (
        <>
          {/* Introduction */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-3.5">
            <p className="text-sm text-foreground leading-relaxed">
              <span className="text-primary font-semibold">
                Gym Kitchen:
              </span>{" "}
              Enter your desired calories to see suitable meals or
              send the calorie target directly to the kitchen.
            </p>
          </div>

          {/* Target calories */}
          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                <Flame
                  size={18}
                  className="text-primary"
                />
              </div>

              <div>
                <h3 className="font-barlow text-lg font-bold text-foreground">
                  Find Meals by Calories
                </h3>

                <p className="text-xs text-muted-foreground mt-0.5">
                  Enter the calorie target for this meal
                </p>
              </div>
            </div>

            <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">
              Desired calories
            </label>

            <div className="relative">
              <input
                type="number"
                min={100}
                max={1500}
                step={10}
                value={desiredMealCalories}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setDesiredMealCalories(value);
                  setOrdered(false);
                }}
                className="w-full bg-muted border border-border rounded-xl px-4 py-3.5 pr-16 text-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="Example: 300"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                kcal
              </span>
            </div>

            {/* Quick calorie buttons */}
            <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-none">
              {[250, 300, 350, 450, 550].map((calories) => (
                <button
                  key={calories}
                  onClick={() => {
                    setDesiredMealCalories(calories);
                    setOrdered(false);
                  }}
                  className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                    desiredMealCalories === calories
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  {calories} kcal
                </button>
              ))}
            </div>
          </div>

          {/* Suggested meals */}
          <div>
            <div className="flex items-end justify-between mb-3">
              <div>
                <h3 className="font-barlow text-xl font-bold text-foreground">
                  Suggested Meals
                </h3>

                <p className="text-xs text-muted-foreground mt-0.5">
                  Closest options to {desiredMealCalories || 0} kcal
                </p>
              </div>

              <span className="text-xs bg-primary/15 text-primary px-2.5 py-1 rounded-full font-semibold">
                {suggestedMeals.length} options
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {suggestedMeals.map((meal) => {
                const difference =
                  meal.calories - desiredMealCalories;

                return (
                  <div
                    key={meal.id}
                    className={`bg-card rounded-2xl border overflow-hidden transition-all ${
                      selectedMeal === meal.name
                        ? "border-primary ring-1 ring-primary/30"
                        : "border-border"
                    }`}
                  >
                    {/* Food image */}
                    <div className="relative h-28 bg-muted overflow-hidden">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                        <span className="text-[10px] font-bold text-white">
                          {meal.calories} kcal
                        </span>
                      </div>

                      {selectedMeal === meal.name && (
                        <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check
                            size={13}
                            className="text-primary-foreground"
                          />
                        </div>
                      )}
                    </div>

                    <div className="p-3">
                      <h4 className="text-sm font-bold text-foreground leading-tight min-h-[36px]">
                        {meal.name}
                      </h4>

                      <p className="text-[11px] text-muted-foreground leading-relaxed mt-1 line-clamp-2 min-h-[34px]">
                        {meal.description}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-primary font-semibold">
                          {meal.protein}g protein
                        </span>

                        <span className="text-xs text-foreground font-bold">
                          {meal.price}
                        </span>
                      </div>

                      <div className="mt-2">
                        <span
                          className={`text-[10px] ${
                            Math.abs(difference) <= 30
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {difference === 0
                            ? "Exact calorie match"
                            : difference > 0
                            ? `+${difference} kcal from target`
                            : `${Math.abs(
                                difference
                              )} kcal below target`}
                        </span>
                      </div>

                      <button
                        onClick={() => chooseMeal(meal)}
                        className={`w-full mt-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                          selectedMeal === meal.name
                            ? "bg-primary/15 text-primary"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {selectedMeal === meal.name ? (
                          <>
                            <Check size={13} />
                            Selected
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={13} />
                            Choose Meal
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom calorie kitchen order */}
          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <ShoppingBag
                  size={18}
                  className="text-primary-foreground"
                />
              </div>

              <div>
                <h3 className="font-barlow text-lg font-bold text-foreground">
                  Custom Kitchen Order
                </h3>

                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  Enter the calories you need. If you leave the notes
                  empty, the kitchen may prepare any suitable meal.
                </p>
              </div>
            </div>

            {/* Calories for kitchen */}
            <div className="mb-4">
              <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                Meal calorie target
              </label>

              <div className="relative">
                <input
                  type="number"
                  min={100}
                  max={1500}
                  step={10}
                  value={kitchenOrderCalories}
                  onChange={(e) => {
                    setKitchenOrderCalories(
                      Number(e.target.value)
                    );
                    setOrdered(false);
                  }}
                  className="w-full bg-muted border border-border rounded-xl px-4 py-3.5 pr-16 text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Example: 400"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                  kcal
                </span>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                Food preferences — optional
              </label>

              <textarea
                rows={4}
                value={kitchenNotes}
                onChange={(e) => {
                  setKitchenNotes(e.target.value);
                  setOrdered(false);
                }}
                className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none transition-colors"
                placeholder="Example: Eggs and sweet potato only, no oil, low salt, no peanuts..."
              />

              <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                Leave this field empty if the kitchen can choose any
                meal that matches your calorie target.
              </p>
            </div>

            {/* Order preview */}
            <div className="rounded-xl bg-muted/50 border border-border p-3.5 mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-foreground">
                  Order Summary
                </p>

                <span className="text-xs bg-primary/15 text-primary px-2 py-1 rounded-full font-bold">
                  {kitchenOrderCalories || 0} kcal
                </span>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">
                  Meal:
                  <span className="text-foreground ml-1">
                    {selectedMeal ?? "Kitchen's choice"}
                  </span>
                </p>

                <p className="text-xs text-muted-foreground">
                  Notes:
                  <span className="text-foreground ml-1">
                    {kitchenNotes.trim()
                      ? kitchenNotes
                      : "No preference — kitchen may choose the meal"}
                  </span>
                </p>
              </div>
            </div>

            {/* Send button */}
            <button
              onClick={sendKitchenOrder}
              disabled={kitchenOrderCalories <= 0}
              className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-40 ${
                ordered
                  ? "bg-muted text-primary"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              }`}
            >
              {ordered ? (
                <>
                  <Check size={16} />
                  Order sent to kitchen
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  Send order to gym kitchen
                </>
              )}
            </button>
          </div>

          {/* Information */}
          <div className="rounded-xl border border-border p-3.5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Utensils
                size={15}
                className="text-primary"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">
                How custom ordering works
              </p>

              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                The kitchen receives your calorie target and optional
                food preferences. The final meal may vary slightly
                depending on available ingredients.
              </p>
            </div>
>>>>>>> 99fc191 (Initial commit)
          </div>
        </>
      )}
    </div>
  );
}

function SocialTab() {
  const [feedType, setFeedType] = useState<"feed" | "reels">("feed");
<<<<<<< HEAD
  const [topic, setTopic] = useState<"All" | "Training" | "Nutrition">("All");
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [composerOpen, setComposerOpen] = useState(false);
  const [postTopic, setPostTopic] = useState<"Training" | "Nutrition">("Training");
  const [postBody, setPostBody] = useState("");
  const [postImage, setPostImage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
=======
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [topic, setTopic] = useState<"All" | "Training" | "Nutrition">("All");

  const posts = [
    {
      id: "p1",
      topic: "Training" as const,
      user: "Jake Morgan",
      avatar: "JM",
      time: "2 hours ago",
      body: "Just hit a new personal record — squat 120kg 🔥 After 3 months on the Khơ Mon Gym plan, feeling incredible. Anyone training legs, drop a comment and ask me anything!",
      img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=480&h=320&fit=crop&auto=format",
      likes: 48,
      comments: 12,
    },
    {
      id: "p2",
      topic: "Nutrition" as const,
      user: "Sophie Lee",
      avatar: "SL",
      time: "5 hours ago",
      body: "Meal prepped the whole week 💪 Each container is about 450 kcal and the macros follow my app plan. Drop a comment if you want the recipe!",
      img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=480&h=320&fit=crop&auto=format",
      likes: 91,
      comments: 34,
    },
  ];
>>>>>>> 99fc191 (Initial commit)

  const reels = [
    { user: "Ryan Chen", title: "5 shoulder exercises at home — no weights needed", views: "12.4k", thumb: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=220&h=340&fit=crop&auto=format" },
    { user: "Emma Davis", title: "How to set up the gym's new treadmill", views: "8.1k", thumb: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=220&h=340&fit=crop&auto=format" },
    { user: "Marcus Hill", title: "Deadlift form check — before vs after one month", views: "22k", thumb: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=220&h=340&fit=crop&auto=format" },
    { user: "Lily Park", title: "500 kcal meal for a heavy training day", views: "6.3k", thumb: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=220&h=340&fit=crop&auto=format" },
  ];

<<<<<<< HEAD
  useEffect(() => {
    let active = true;
    api.getPosts()
      .then((result) => { if (active) setPosts(result.posts); })
      .catch((error) => { if (active) setErrorMessage(error instanceof ApiError ? error.message : "Could not load community posts."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const visiblePosts = topic === "All" ? posts : posts.filter((post) => post.topic === topic);

  const toggleLike = async (post: CommunityPost) => {
    const nextLiked = !post.liked;
    setPosts((current) => current.map((item) => item.id === post.id ? { ...item, liked: nextLiked, likes: Math.max(0, item.likes + (nextLiked ? 1 : -1)) } : item));
    try {
      const result = await api.setPostLike(post.id, nextLiked);
      setPosts((current) => current.map((item) => item.id === post.id ? { ...item, liked: result.liked, likes: result.likes } : item));
    } catch (error) {
      setPosts((current) => current.map((item) => item.id === post.id ? post : item));
      setErrorMessage(error instanceof ApiError ? error.message : "Could not update the like.");
    }
  };

  const publishPost = async () => {
    if (submitting || postBody.trim().length < 3) return;
    setSubmitting(true);
    setErrorMessage("");
    try {
      const result = await api.createPost({ topic: postTopic, body: postBody, imageUrl: postImage || undefined });
      setPosts((current) => [result.post, ...current]);
      setPostBody("");
      setPostImage("");
      setComposerOpen(false);
      setFeedType("feed");
      setTopic("All");
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : "Could not publish the post.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pb-4">
      <div className="p-4 pb-0 sm:p-6 sm:pb-0">
        <div className="flex items-center justify-between pt-3 mb-3">
          <div>
            <h2 className="font-barlow text-4xl font-black text-foreground">Community</h2>
            <p className="text-xs text-muted-foreground mt-1">Posts and likes are saved to the database</p>
          </div>
          <button onClick={() => setComposerOpen((current) => !current)} className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center hover:opacity-90 transition-colors" aria-label="Create a post">
=======
  const visiblePosts = topic === "All" ? posts : posts.filter((post) => post.topic === topic);

  return (
    <div className="pb-4">
      <div className="p-4 pb-0">
        <div className="flex items-center justify-between pt-3 mb-3">
          <div>
            <h2 className="font-barlow text-4xl font-black text-foreground">Community</h2>
            <p className="text-xs text-muted-foreground mt-1">Training and nutrition posts only</p>
          </div>
          <button className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center hover:opacity-90 transition-colors">
>>>>>>> 99fc191 (Initial commit)
            <Plus size={17} className="text-primary-foreground" />
          </button>
        </div>

<<<<<<< HEAD
        {composerOpen && (
          <div className="mb-3 rounded-2xl border border-primary/30 bg-card p-4">
            <div className="mb-3 flex gap-2">
              {(["Training", "Nutrition"] as const).map((item) => (
                <button key={item} onClick={() => setPostTopic(item)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${postTopic === item ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>{item}</button>
              ))}
            </div>
            <textarea value={postBody} onChange={(event) => setPostBody(event.target.value)} rows={4} maxLength={1000} className="w-full resize-none rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none focus:border-primary" placeholder="Share a workout, progress update or healthy meal…" />
            <input value={postImage} onChange={(event) => setPostImage(event.target.value)} className="mt-3 w-full rounded-xl border border-border bg-muted px-4 py-3 text-xs text-foreground outline-none focus:border-primary" placeholder="Optional image URL" />
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">{postBody.length}/1000</span>
              <button onClick={publishPost} disabled={submitting || postBody.trim().length < 3} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground disabled:opacity-40">
                {submitting ? <LoaderCircle size={14} className="animate-spin" /> : <Send size={14} />}
                Publish
              </button>
            </div>
          </div>
        )}

        {errorMessage && <div className="mb-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{errorMessage}</div>}
=======
        <div className="bg-card rounded-2xl border border-border p-3 mb-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">YOU</div>
          <button className="flex-1 text-left bg-muted rounded-xl px-3.5 py-2.5 text-xs text-muted-foreground">Share a workout, progress update or healthy meal…</button>
        </div>
>>>>>>> 99fc191 (Initial commit)

        <div className="flex gap-1.5 bg-muted p-1 rounded-xl mb-3">
          {[
            { id: "feed" as const, label: "Feed" },
            { id: "reels" as const, label: "Reels" },
          ].map(({ id, label }) => (
<<<<<<< HEAD
            <button key={id} onClick={() => setFeedType(id)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${feedType === id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>{label}</button>
=======
            <button
              key={id}
              onClick={() => setFeedType(id)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                feedType === id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {label}
            </button>
>>>>>>> 99fc191 (Initial commit)
          ))}
        </div>

        {feedType === "feed" && (
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-3">
            {(["All", "Training", "Nutrition"] as const).map((item) => (
<<<<<<< HEAD
              <button key={item} onClick={() => setTopic(item)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border ${topic === item ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border"}`}>{item}</button>
=======
              <button
                key={item}
                onClick={() => setTopic(item)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border ${
                  topic === item ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border"
                }`}
              >
                {item}
              </button>
>>>>>>> 99fc191 (Initial commit)
            ))}
          </div>
        )}
      </div>

      {feedType === "feed" && (
<<<<<<< HEAD
        <div className="px-4 space-y-4 sm:px-6">
          {loading ? (
            <div className="flex justify-center py-12 text-muted-foreground"><LoaderCircle size={22} className="animate-spin" /></div>
          ) : visiblePosts.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">No posts in this topic yet.</div>
          ) : visiblePosts.map((post) => (
            <div key={post.id} className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-4 pb-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0"><span className="text-primary-foreground text-xs font-bold">{post.avatar}</span></div>
=======
        <div className="px-4 space-y-4">
          {visiblePosts.map((post) => (
            <div key={post.id} className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-4 pb-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground text-xs font-bold">{post.avatar}</span>
                  </div>
>>>>>>> 99fc191 (Initial commit)
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{post.user}</p>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                  <span className="text-[10px] rounded-full bg-primary/10 text-primary px-2 py-1 font-semibold">{post.topic}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{post.body}</p>
              </div>
<<<<<<< HEAD
              {post.img && <img src={post.img} alt={post.user} className="w-full h-44 object-cover bg-muted" />}
              <div className="p-3.5 flex items-center gap-4">
                <button onClick={() => toggleLike(post)} className="flex items-center gap-1.5 transition-colors" style={{ color: post.liked ? "#ff4757" : "#7a8fa6" }}>
                  <Heart size={16} fill={post.liked ? "#ff4757" : "none"} />
                  <span className="text-xs">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle size={16} /><span className="text-xs">{post.comments}</span>
                </button>
                <button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors ml-auto"><Share2 size={16} /></button>
=======
              <img src={post.img} alt={post.user} className="w-full h-44 object-cover bg-muted" />
              <div className="p-3.5 flex items-center gap-4">
                <button
                  onClick={() => setLiked((current) => ({ ...current, [post.id]: !current[post.id] }))}
                  className="flex items-center gap-1.5 transition-colors"
                  style={{ color: liked[post.id] ? "#2563eb" : "#94a3b8" }}
                >
                  <Heart size={16} fill={liked[post.id] ? "#2563eb" : "none"} />
                  <span className="text-xs">{post.likes + (liked[post.id] ? 1 : 0)}</span>
                </button>
                <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle size={16} />
                  <span className="text-xs">{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors ml-auto">
                  <Share2 size={16} />
                </button>
>>>>>>> 99fc191 (Initial commit)
              </div>
            </div>
          ))}
        </div>
      )}

      {feedType === "reels" && (
<<<<<<< HEAD
        <div className="px-4 sm:px-6">
=======
        <div className="px-4">
>>>>>>> 99fc191 (Initial commit)
          <div className="grid grid-cols-2 gap-2.5">
            {reels.map((reel) => (
              <div key={reel.user + reel.title} className="relative rounded-xl overflow-hidden bg-card border border-border aspect-[9/14]">
                <img src={reel.thumb} alt={reel.title} className="w-full h-full object-cover bg-muted" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
<<<<<<< HEAD
                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-sm rounded-full p-1.5 border border-white/10"><Play size={11} className="text-white fill-white" /></div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-semibold leading-snug mb-1 line-clamp-2">{reel.title}</p>
                  <div className="flex items-center justify-between"><span className="text-white/60 text-xs">{reel.user}</span><span className="text-white/60 text-xs">{reel.views}</span></div>
=======
                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-sm rounded-full p-1.5 border border-white/10">
                  <Play size={11} className="text-white fill-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-semibold leading-snug mb-1 line-clamp-2">{reel.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-xs">{reel.user}</span>
                    <span className="text-white/60 text-xs">{reel.views}</span>
                  </div>
>>>>>>> 99fc191 (Initial commit)
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

<<<<<<< HEAD
function CheckinTab({ user }: { user: UserData }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayKey = toLocalDateKey(today);
  const [checkinDates, setCheckinDates] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const checkedIn = checkinDates.includes(todayKey);
  const goal = 100;

  useEffect(() => {
    let active = true;
    api.getCheckins()
      .then((result) => {
        if (!active) return;
        setCheckinDates(result.dates);
        setStreak(result.streak);
      })
      .catch((error) => {
        if (active) setErrorMessage(error instanceof ApiError ? error.message : "Could not load check-ins.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const monday = new Date(today);
  const mondayOffset = (today.getDay() + 6) % 7;
  monday.setDate(today.getDate() - mondayOffset);

  const week = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const dateKey = toLocalDateKey(date);
    return {
      label: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date).slice(0, 2),
      date: String(date.getDate()),
      today: dateKey === todayKey,
      done: checkinDates.includes(dateKey),
    };
  });

  const userInitials = user.name.trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const friends = [
    { name: user.name, streak, avatar: userInitials || "YOU", isMe: true },
=======

function CheckinTab({ user }: { user: UserData }) {
  const [checkedIn, setCheckedIn] = useState(false);
  const streak = 47;
  const goal = 100;

  const week = [
    { label: "Mo", date: "7", done: true },
    { label: "Tu", date: "8", done: false },
    { label: "We", date: "9", done: true, today: true },
    { label: "Th", date: "10", done: false },
    { label: "Fr", date: "11", done: false },
    { label: "Sa", date: "12", done: false },
    { label: "Su", date: "13", done: false },
  ];


  const friends = [
    { name: user.name, streak, avatar: user.name.slice(0, 2).toUpperCase(), isMe: true },
>>>>>>> 99fc191 (Initial commit)
    { name: "Jake Morgan", streak: 52, avatar: "JM", isMe: false },
    { name: "Sophie Lee", streak: 31, avatar: "SL", isMe: false },
    { name: "Marcus Hill", streak: 18, avatar: "MH", isMe: false },
  ];

<<<<<<< HEAD
  const checkInToday = async () => {
    if (checkedIn || checkingIn) return;
    setCheckingIn(true);
    setErrorMessage("");
    try {
      const result = await api.checkin(todayKey);
      setCheckinDates(result.dates);
      setStreak(result.streak);
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : "Check-in failed.");
    } finally {
      setCheckingIn(false);
    }
  };

  return (
    <div className="p-4 space-y-4 pb-4 sm:p-6">
      <div className="pt-3">
        <h2 className="font-barlow text-4xl font-black text-foreground leading-none">Streak</h2>
        <p className="text-muted-foreground text-sm mt-1.5">Keep up {user.workoutsPerWeek} sessions/week to maintain your streak</p>
      </div>

      {errorMessage && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{errorMessage}</div>}

      <div className="bg-card rounded-2xl p-5 border border-border relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(230,57,70,0.08) 0%, transparent 60%)" }} />
        <div className="text-center mb-5 relative">
          <div className="font-barlow text-7xl font-black text-primary leading-none">{loading ? "—" : streak}</div>
          <div className="flex items-center justify-center gap-1 mt-1 text-sm text-muted-foreground"><Flame size={14} className="text-accent" />days in a row</div>
        </div>
        <div className="mb-2"><div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full transition-all" style={{ width: `${Math.min((streak / goal) * 100, 100)}%` }} /></div></div>
        <p className="text-xs text-muted-foreground text-center mb-5">{streak}/{goal} days — {Math.max(goal - streak, 0)} days to the next reward</p>
        <button type="button" onClick={checkInToday} disabled={loading || checkedIn || checkingIn} className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${checkedIn ? "bg-muted text-muted-foreground cursor-default" : "bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"}`}>
          {checkingIn ? <><LoaderCircle size={16} className="animate-spin" />Checking in...</> : checkedIn ? <><Check size={16} />Checked in today!</> : <><MapPin size={16} />Check In Workout</>}
=======
  return (
    <div className="p-4 space-y-4 pb-4">
      <div className="pt-3">
        <h2 className="font-barlow text-4xl font-black text-foreground leading-none">Streak</h2>
        <p className="text-muted-foreground text-sm mt-1.5">
          Keep up {user.workoutsPerWeek} sessions/week to maintain your streak
        </p>
      </div>

      <div className="bg-card rounded-2xl p-5 border border-border relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(37,99,235,0.10) 0%, transparent 60%)" }}
        />
        <div className="text-center mb-5">
          <div className="font-barlow text-7xl font-black text-primary leading-none">{streak}</div>
          <div className="flex items-center justify-center gap-1 mt-1 text-sm text-muted-foreground">
            <Flame size={14} className="text-accent" />
            days in a row
          </div>
        </div>
        <div className="mb-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${(streak / goal) * 100}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center mb-5">
          {streak}/{goal} days — {goal - streak} days to the next reward
        </p>
        <button
          onClick={() => setCheckedIn(true)}
          className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            checkedIn
              ? "bg-muted text-muted-foreground cursor-default"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          {checkedIn ? (
            <><Check size={16} /> Checked in today!</>
          ) : (
            <><MapPin size={16} /> Check In Workout</>
          )}
>>>>>>> 99fc191 (Initial commit)
        </button>
      </div>

      <div className="bg-card rounded-2xl p-4 border border-border">
        <h3 className="font-barlow text-lg font-bold text-foreground mb-3">This Week</h3>
        <div className="flex gap-1">
<<<<<<< HEAD
          {week.map(({ label, date, done, today: isToday }) => (
            <div key={`${label}-${date}`} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-xs text-muted-foreground">{label}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${done ? "bg-primary text-primary-foreground" : isToday ? "border-2 border-primary text-primary" : "bg-muted text-muted-foreground"}`}>{done ? <Check size={13} /> : date}</div>
=======
          {week.map(({ label, date, done, today }) => (
            <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-xs text-muted-foreground">{label}</span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  done
                    ? "bg-primary text-primary-foreground"
                    : today
                    ? "border-2 border-primary text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? <Check size={13} /> : date}
              </div>
>>>>>>> 99fc191 (Initial commit)
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-2xl p-4 border border-border">
<<<<<<< HEAD
        <div className="flex items-center justify-between mb-3"><h3 className="font-barlow text-lg font-bold text-foreground">Friends Leaderboard</h3><button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href)} className="text-xs text-primary font-medium">Invite More</button></div>
        <div className="space-y-2">
          {[...friends].sort((a, b) => b.streak - a.streak).map(({ name, streak: value, avatar, isMe }, rank) => (
            <div key={name} className={`flex items-center gap-3 p-2.5 rounded-xl ${isMe ? "bg-primary/10 border border-primary/25" : ""}`}>
              <span className="text-xs font-barlow font-bold w-4 flex-shrink-0" style={{ color: rank === 0 ? "#fbbf24" : "#7a8fa6" }}>{rank + 1}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isMe ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{avatar}</div>
              <span className="text-sm text-foreground flex-1 min-w-0 truncate">{name}{isMe ? " (you)" : ""}</span>
              <div className="flex items-center gap-1"><Flame size={12} className="text-accent" /><span className="font-barlow text-sm font-bold text-foreground">{value}</span></div>
=======
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-barlow text-lg font-bold text-foreground">Friends Leaderboard</h3>
          <button className="text-xs text-primary font-medium">Invite More</button>
        </div>
        <div className="space-y-2">
          {[...friends].sort((a, b) => b.streak - a.streak).map(({ name, streak: s, avatar, isMe }, rank) => (
            <div
              key={name}
              className={`flex items-center gap-3 p-2.5 rounded-xl ${
                isMe ? "bg-primary/10 border border-primary/25" : ""
              }`}
            >
              <span
                className="text-xs font-barlow font-bold w-4 flex-shrink-0"
                style={{ color: rank === 0 ? "#3b82f6" : "#94a3b8" }}
              >
                {rank + 1}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  isMe ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {avatar}
              </div>
              <span className="text-sm text-foreground flex-1">{name}{isMe ? " (you)" : ""}</span>
              <div className="flex items-center gap-1">
                <Flame size={12} className="text-accent" />
                <span className="font-barlow text-sm font-bold text-foreground">{s}</span>
              </div>
>>>>>>> 99fc191 (Initial commit)
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
const appTabs: { id: Tab; Icon: typeof Activity; label: string }[] = [
  { id: "home", Icon: Activity, label: "Overview" },
  { id: "workout", Icon: Dumbbell, label: "Workout" },
  { id: "nutrition", Icon: Utensils, label: "Nutrition" },
  { id: "social", Icon: Users, label: "Community" },
  { id: "checkin", Icon: CheckCircle2, label: "Streak" },
];

function BottomNav({ active, onChange }: { active: Tab; onChange: (tab: Tab) => void }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl safe-area-bottom">
      <div className="max-w-lg mx-auto grid grid-cols-5 px-2 py-2">
        {appTabs.map(({ id, Icon, label }) => {
          const isActive = active === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className="flex flex-col items-center justify-center gap-1 py-1.5"
              aria-current={isActive ? "page" : undefined}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Icon size={18} />
              </div>
              <span
                className={`text-[11px] font-medium ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function DesktopSidebar({
  active,
  user,
  onChange,
  onReset,
  onLogout,
  account,
}: {
  active: Tab;
  user: UserData;
  account: Account;
  onChange: (tab: Tab) => void;
  onReset: () => void;
  onLogout: () => void;
}) {
  const initials = user.name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="hidden md:flex sticky top-0 h-screen w-64 lg:w-72 flex-shrink-0 flex-col border-r border-border bg-card/35 px-5 py-6">
      <BrandLogo size="md" />

      <nav className="mt-10 space-y-2" aria-label="Main navigation">
        {appTabs.map(({ id, Icon, label }) => {
          const isActive = active === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={18} />
              <span className="font-semibold">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-border bg-background/55 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold">
            {initials || "YOU"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{account.email}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center gap-2 rounded-xl border border-border px-2 py-2.5 text-xs font-semibold text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
          >
            <RotateCcw size={14} />
            Reset
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center justify-center gap-2 rounded-xl border border-border px-2 py-2.5 text-xs font-semibold text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </div>
    </aside>
=======
function BottomNav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const tabs: { id: Tab; Icon: typeof Activity; label: string }[] = [
    { id: "home", Icon: Activity, label: "Overview" },
    { id: "workout", Icon: Dumbbell, label: "Workout" },
    { id: "nutrition", Icon: Utensils, label: "Nutrition" },
    { id: "social", Icon: Users, label: "Community" },
    { id: "checkin", Icon: CheckCircle2, label: "Streak" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md">
      <div className="max-w-sm mx-auto flex">
        {tabs.map(({ id, Icon, label }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex-1 flex flex-col items-center gap-0.5 py-2.5 relative transition-all"
          >
            {active === id && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
            )}
            <Icon
              size={19}
              className="transition-colors"
              style={{ color: active === id ? "#2563eb" : "#94a3b8" }}
            />
            <span
              className="text-xs transition-colors"
              style={{
                color: active === id ? "#2563eb" : "#94a3b8",
                fontWeight: active === id ? 600 : 400,
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
>>>>>>> 99fc191 (Initial commit)
  );
}

export default function App() {
<<<<<<< HEAD
  const [showSplash, setShowSplash] = useState(() => !hasSeenSplash());
  const [booting, setBooting] = useState(true);
  const [account, setAccount] = useState<Account | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>(() => readStoredTab());

  useEffect(() => {
    let active = true;
    if (!getToken()) {
      setBooting(false);
      return () => { active = false; };
    }

    api.me()
      .then((result) => {
        if (!active) return;
        setAccount(result.user);
        setUser(result.profile as UserData | null);
      })
      .catch(() => {
        setToken(null);
      })
      .finally(() => {
        if (active) setBooting(false);
      });

    return () => { active = false; };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.tab, activeTab);
    } catch {
      // Navigation remains functional when browser storage is unavailable.
    }
  }, [activeTab]);

  const completeSplash = () => {
    try {
      sessionStorage.setItem(STORAGE_KEYS.splash, "1");
    } catch {
      // The splash will simply appear again next session if storage is blocked.
    }
    setShowSplash(false);
  };

  const handleAuthenticated = (nextAccount: Account, profile: UserData | null) => {
    setAccount(nextAccount);
    setUser(profile);
    setActiveTab("home");
  };

  const completeOnboarding = async (data: UserData) => {
    try {
      const result = await api.saveProfile(data);
      setUser(result.profile as UserData);
      setActiveTab("home");
    } catch (error) {
      window.alert(error instanceof ApiError ? error.message : "Could not save your profile.");
    }
  };

  const resetProfile = async () => {
    const confirmed = window.confirm("Reset your profile and check-in history? Your account and meal orders will remain available.");
    if (!confirmed) return;
    try {
      await api.resetProfile();
      setUser(null);
      setActiveTab("home");
    } catch (error) {
      window.alert(error instanceof ApiError ? error.message : "Could not reset your profile.");
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch {
      // Clear the local session even if the server is temporarily unavailable.
    }
    setToken(null);
    setAccount(null);
    setUser(null);
    setActiveTab("home");
  };

  if (showSplash) return <SplashScreen onComplete={completeSplash} />;

  if (booting) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <BrandLogo size="md" />
          <LoaderCircle size={22} className="animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!account) return <AuthScreen onAuthenticated={handleAuthenticated} />;
  if (!user) return <OnboardingFlow onComplete={completeOnboarding} />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl">
        <DesktopSidebar
          active={activeTab}
          user={user}
          account={account}
          onChange={setActiveTab}
          onReset={resetProfile}
          onLogout={logout}
        />

        <main className="min-w-0 flex-1 pb-24 md:pb-8">
          <div className="mx-auto w-full max-w-2xl">
            {activeTab === "home" && <HomeTab user={user} onReset={resetProfile} onLogout={logout} />}
            {activeTab === "workout" && <WorkoutTab user={user} />}
            {activeTab === "nutrition" && <NutritionTab />}
            {activeTab === "social" && <SocialTab />}
            {activeTab === "checkin" && <CheckinTab user={user} />}
          </div>
        </main>
      </div>

      <BottomNav active={activeTab} onChange={setActiveTab} />
=======
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("home");

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (!user) {
    return <OnboardingFlow onComplete={setUser} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground max-w-sm mx-auto relative">
      {activeTab === "home" && <HomeTab user={user} />}
      {activeTab === "workout" && <WorkoutTab user={user} />}
      {activeTab === "nutrition" && <NutritionTab />}
      {activeTab === "social" && <SocialTab />}
      {activeTab === "checkin" && <CheckinTab user={user} />}

      <div className="sticky bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border">
        <div className="grid grid-cols-5 px-2 py-2">
          {[
            { id: "home", Icon: Activity, label: "Home" },
            { id: "workout", Icon: Dumbbell, label: "Workout" },
            { id: "nutrition", Icon: Utensils, label: "Nutrition" },
            { id: "social", Icon: Users, label: "Community" },
            { id: "checkin", Icon: CheckCircle2, label: "Streak" },
          ].map(({ id, Icon, label }) => {
            const active = activeTab === id;

            return (
              <button
                key={id}
                onClick={() => setActiveTab(id as Tab)}
                className="flex flex-col items-center justify-center gap-1 py-2"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon size={18} />
                </div>

                <span
                  className={`text-[11px] font-medium ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
>>>>>>> 99fc191 (Initial commit)
    </div>
  );
}
