import { action, makeObservable, observable } from "mobx";

export class UserStore {

    userId = localStorage.getItem("userId") || null;
    userActivities = null;
    userName = null;
    picUrl = null;

    constructor() {
        makeObservable(this, {
            userId: observable,
            setUserId: action,
            userActivities: observable,
            setUserActivities: action,
            userName: observable,
            setUserName: action,
            picUrl: observable,
            setPicUrl: action,
        });
    }

    setUserId = (userId) => {
        this.userId = userId;
    };

    setUserActivities = (userActivities) => {
        this.userActivities = userActivities;
    };

    setUserName = (userName) => {
        this.userName = userName;
    };

    setPicUrl = (picUrl) => {
        this.picUrl = picUrl;
    };

}

export const userStore = new UserStore();
