const STORAGE_KEY = 'crypto-math-progress';

function readStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function writeStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getProgress(moduleId) {
  const store = readStore();
  return store[moduleId] || {};
}

export function saveProgress(moduleId, sectionId, correct, total) {
  const store = readStore();
  if (!store[moduleId]) store[moduleId] = {};
  store[moduleId][sectionId] = { correct, total, pct: correct / total };
  writeStore(store);
}

export function getOverallProgress(moduleId) {
  const sections = getProgress(moduleId);
  const keys = Object.keys(sections);
  if (keys.length === 0) return 0;
  return keys.length;
}

export function getSectionCount(moduleId) {
  const sections = getProgress(moduleId);
  return Object.keys(sections).length;
}

export function clearProgress(moduleId) {
  const store = readStore();
  delete store[moduleId];
  writeStore(store);
}
