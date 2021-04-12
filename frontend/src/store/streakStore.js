import { action, makeObservable, observable } from "mobx";

export class StreakStore {

    today = null;
    dailyStreaks = null;

    constructor() {
        makeObservable(this, {
            today: observable,
            setToday: action,
            dailyStreaks: observable,
            setDailyStreaks: action,
        });
    }

    setToday = (today) => {
        this.today = today;
    };

    setDailyStreaks = (dailyStreaks) => {
        this.dailyStreaks = dailyStreaks;
    };

}

export const streakStore = new StreakStore();
