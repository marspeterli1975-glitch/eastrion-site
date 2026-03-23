export type UnlockPlan = "pro" | "execution";

const STORAGE_KEY = "riskatlas_unlock_state";

type UnlockState = {
  pro: boolean;
  execution: boolean;
  lastSessionId?: string;
  lastPaidAt?: string;
};

function readState(): UnlockState {
  if (typeof window === "undefined") {
    return { pro: false, execution: false };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return { pro: false, execution: false };

  try {
    const parsed = JSON.parse(raw) as Partial<UnlockState>;
    return {
      pro: !!parsed.pro,
      execution: !!parsed.execution,
      lastSessionId: parsed.lastSessionId,
      lastPaidAt: parsed.lastPaidAt,
    };
  } catch {
    return { pro: false, execution: false };
  }
}

function writeState(state: UnlockState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getUnlockState(): UnlockState {
  return readState();
}

export function isPlanUnlocked(plan: UnlockPlan): boolean {
  const state = readState();
  return !!state[plan];
}

export function unlockPlan(plan: UnlockPlan, sessionId?: string) {
  const state = readState();
  state[plan] = true;
  state.lastSessionId = sessionId || state.lastSessionId;
  state.lastPaidAt = new Date().toISOString();
  writeState(state);
}

export function clearUnlockState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}