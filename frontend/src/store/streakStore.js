import { action, makeObservable, observable } from "mobx";

export class StreakStore {

    today = null;
    dailyStreaks = null;

    constructor() {
        makeObservable(this, {
            dailyStreaks: observable,
            dailyStreaks: observable,
            setDailyStreaks: action,
        });
    }

    setToday = (setToday) => {
        this.setToday = setToday;
    };

    setDailyStreaks = (dailyStreaks) => {
        this.dailyStreaks = dailyStreaks;
    };

}

export const streakStore = new StreakStore();
