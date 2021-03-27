import { action, makeObservable, observable } from "mobx";

export class UserStore {

    userId = localStorage.getItem("userId") || null;
    userName = null;

    constructor() {
        makeObservable(this, {
            userId: observable,
            setUserId: action,
            userName: observable,
            setUserName: action,
        });
    }

    setUserId = (userId) => {
        this.userId = userId;
    };

    setUserName = (userName) => {
        this.userName = userName;
    };

}

export const userStore = new UserStore();
