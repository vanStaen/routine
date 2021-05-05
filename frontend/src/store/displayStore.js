import { action, makeObservable, observable } from "mobx";

export class DisplayStore {

    showPage = "daily";

    constructor() {
        makeObservable(this, {
            showPage: observable,
            setShowPage: action,
        });
    }

    setShowPage = (showPage) => {
        this.showPage = showPage;
    };

}

export const displayStore = new DisplayStore();
