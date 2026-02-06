export interface DayData {
  id: number;
  title: string;
  emoji: string;
  date: number; // Feb date (7-14)
  description: string;
  color: string;
}

export const VALENTINE_DAYS: DayData[] = [
  {
    id: 1,
    title: "Rose Day",
    emoji: "🌹",
    date: 7,
    description: "Tap roses to fill the bouquet",
    color: "from-rose-400 to-pink-500",
  },
  {
    id: 2,
    title: "Propose Day",
    emoji: "💍",
    date: 8,
    description: "Will you go on a date with me?",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 3,
    title: "Chocolate Day",
    emoji: "🍫",
    date: 9,
    description: "Collect sweet chocolates",
    color: "from-amber-600 to-orange-500",
  },
  {
    id: 4,
    title: "Teddy Day",
    emoji: "🧸",
    date: 10,
    description: "Get a warm hug",
    color: "from-amber-400 to-orange-400",
  },
  {
    id: 5,
    title: "Promise Day",
    emoji: "🤝",
    date: 11,
    description: "Make sweet promises",
    color: "from-blue-400 to-purple-500",
  },
  {
    id: 6,
    title: "Hug Day",
    emoji: "🤗",
    date: 12,
    description: "Hold for a warm hug",
    color: "from-green-400 to-teal-500",
  },
  {
    id: 7,
    title: "Kiss Day",
    emoji: "😘",
    date: 13,
    description: "Spread the love",
    color: "from-red-400 to-pink-500",
  },
  {
    id: 8,
    title: "Valentine's Day",
    emoji: "💖",
    date: 14,
    description: "The grand finale",
    color: "from-pink-500 to-rose-600",
  },
];

export function getCurrentDate() {
  const now = new Date();
  return {
    day: now.getDate(),
    month: now.getMonth(), // 0-indexed, so Feb = 1
    year: now.getFullYear(),
  };
}

export function isDayUnlocked(dayDate: number): boolean {
  // PRODUCTION CODE: Sequential unlocking enabled
  const day = VALENTINE_DAYS.find(d => d.date === dayDate);
  if (!day) return false;

  // Day 1 (Rose Day) is always unlocked
  if (day.id === 1) return true;

  // For other days, check if the previous day is completed
  const previousDay = VALENTINE_DAYS.find(d => d.id === day.id - 1);
  if (!previousDay) return false;

  return isDayCompleted(previousDay.id);
}

export function getUnlockedDays(): number[] {
  // Filter days based on sequential completion
  return VALENTINE_DAYS
    .filter(d => isDayUnlocked(d.date))
    .map(d => d.id);
}

export function getDaysCompleted(): number {
  const completed = localStorage.getItem("completed-days");
  if (!completed) return 0;
  try {
    const arr = JSON.parse(completed) as number[];
    return arr.length;
  } catch {
    return 0;
  }
}

export function markDayCompleted(dayId: number) {
  const completed = localStorage.getItem("completed-days");
  let arr: number[] = [];
  if (completed) {
    try {
      arr = JSON.parse(completed);
    } catch {
      arr = [];
    }
  }
  if (!arr.includes(dayId)) {
    arr.push(dayId);
    localStorage.setItem("completed-days", JSON.stringify(arr));
  }
}

export function isDayCompleted(dayId: number): boolean {
  const completed = localStorage.getItem("completed-days");
  if (!completed) return false;
  try {
    const arr = JSON.parse(completed) as number[];
    return arr.includes(dayId);
  } catch {
    return false;
  }
}
