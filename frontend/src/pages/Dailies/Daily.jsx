import { useState, useEffect, useCallback } from "react";
import { Tooltip } from "antd";

import { getStreak } from "./getStreak";
import { streakStore } from "../../store/streakStore";
import { Activity } from "../../component/Activity/Activity";
import { getYesterdayDate } from "../../helpers/getYesterdayDate";
import { getTomorrowDate } from "../../helpers/getTomorrowDate";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { CountDown } from "../../component/CountDown/CountDown";
import { getObstacleForDate } from "../../component/Menu/ObstacleButton/getObstacle"

import Snowflake from '../../component/Menu/ObstacleButton/snowflake.png'

export const Daily = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [wasFrozen, setWasFrozen] = useState(null);
    const dayFromToday = props.index;
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
            } catch (error) {
                console.log(error.message);
            }
        }
        setIsLoading(false);
    }, [year, day, month, dayFromToday]);


    const fetchObstacleForDate = useCallback(async () => {
        const getObs = await getObstacleForDate(year, month, day);
        if (getObs.data.length > 0) {
            setWasFrozen(getObs.data[0].type);
        }
    }, [day, month, year]);

    useEffect(() => {
        fetchStreak();
        fetchObstacleForDate();
    }, [fetchStreak, fetchObstacleForDate])

    const activities = props.activities.map((activity) => {
        return (
            <Activity
                activity={activity}
                count={props.daily[activity.name] | 0}
                key={activity.name}
                dayFromToday={dayFromToday}
                id={props.daily.id}
                isLoading={isLoading}
            />
        );
    });


    return <div className="Dailies__full" id={`daily${props.index}`} key={`daily${props.index}`}>
        <div className={`dailies__date ${wasFrozen && "blue"}`}>
            {props.index === 0 && <CountDown />}
            {props.index === 1 && `Yesterday`}
            {props.index > 1 && `${props.daily.day}.${props.daily.month}.${props.daily.year}`}
            {wasFrozen &&
                <div className="snowflake__container">
                    <Tooltip placement="right" title={capitalizeFirstLetter(wasFrozen)}>
                        <img
                            src={Snowflake}
                            alt='travel'
                            className='snowflake'
                        />
                    </Tooltip>
                </div>}
        </div>
        <div className="dailies__main">
            {activities}
        </div>
    </div>;
} 