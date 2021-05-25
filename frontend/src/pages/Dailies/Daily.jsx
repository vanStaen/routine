import { useState, useEffect, useCallback } from "react";

import { getStreak } from "./getStreak";
import { streakStore } from "../../store/streakStore";
import { Activity } from "../../component/Activity/Activity";
import { Spinner } from "../../component/Spinner/Spinner";
import getYesterdayDate from "../../helpers/getYesterdayDate";
import getTomorrowDate from "../../helpers/getTomorrowDate";

export const Daily = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const dayFromToday = props.dayFromToday;
    const year = props.daily.year;
    const month = props.daily.month;
    const day = props.daily.day;

    const fetchStreak = useCallback(async () => {
        // should fetch both Yesterday, Today and Tomorrow. 
        const dateYesterday = getYesterdayDate(year, month, day);
        const datetomorrow = getTomorrowDate(year, month, day);

        // check if today is in store already
        if (!streakStore.dailyStreaks.has(dayFromToday)) {
            // if not, fetch and store
            try {
                const fetchedStreak = await getStreak(year, month, day);
                streakStore.setDailyStreaks(fetchedStreak, dayFromToday);
                console.log("added", fetchedStreak, dayFromToday);
            } catch (error) {
                console.log(error.message);
            }
        }
        // check if yesterday is in store already
        if (!streakStore.dailyStreaks.has(dayFromToday + 1)) {
            // if not, fetch and store
            try {
                const fetchedStreak = await getStreak(dateYesterday[0], dateYesterday[1], dateYesterday[2]);
                streakStore.setDailyStreaks(fetchedStreak, dayFromToday + 1);
                console.log("added", fetchedStreak, dayFromToday + 1);
            } catch (error) {
                console.log(error.message);
            }
        }
        // check if yesterday is in store already
        if (!streakStore.dailyStreaks.has(dayFromToday - 1) && dayFromToday > 0) {
            // if not, fetch and store
            try {
                const fetchedStreak = await getStreak(datetomorrow[0], datetomorrow[1], datetomorrow[2]);
                streakStore.setDailyStreaks(fetchedStreak, dayFromToday - 1);
                console.log("added", fetchedStreak, dayFromToday - 1);
            } catch (error) {
                console.log(error.message);
            }
        }
        setIsLoading(false);
    }, [year, day, month, dayFromToday]);

    useEffect(() => {
        fetchStreak();
    }, [fetchStreak])


    return isLoading ? <Spinner /> :
        props.activities.map((activity) => {
            return (
                <Activity
                    activity={activity}
                    count={props.daily[activity.name] | 0}
                    key={activity.name}
                    dayFromToday={dayFromToday}
                    id={props.daily.id}
                />
            );
        });

} 