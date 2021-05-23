import { action, makeObservable, observable } from "mobx";

export class StreakStore {

    dailyStreaks = [];

    constructor() {
        makeObservable(this, {
            dailyStreaks: observable,
            setDailyStreaks: action,
        });
    }

    setDailyStreaks = (dailyStreak, dayFromToday) => {
        dailyStreak.dayFromToday = dayFromToday;
        this.dailyStreaks.push(dailyStreak);
    };

}

export const streakStore = new StreakStore();
