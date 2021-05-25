import { action, makeObservable, observable } from "mobx";

export class StreakStore {

    dailyStreaks = new Map();

    constructor() {
        makeObservable(this, {
            dailyStreaks: observable,
            setDailyStreaks: action,
        });
    }

    setDailyStreaks = (dailyStreak, dayFromToday) => {
        this.dailyStreaks.set(dayFromToday, dailyStreak);
    };

}

export const streakStore = new StreakStore();
