import { action, makeObservable, observable } from "mobx";

export class StreakStore {

    dailyStreaks = null;

    constructor() {
        makeObservable(this, {
            dailyStreaks: observable,
            setDailyStreaks: action,
        });
    }

    setDailyStreaks = (dailyStreaks) => {
        this.dailyStreaks = dailyStreaks;
    };

}

export const streakStore = new StreakStore();
