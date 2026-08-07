import api from "./axios";

export async function getWritingStreak() {
    const response = await api.get("/users/streaks");

    return response.data.streak;
}

export async function getCalendar() {
    const response = await api.get("/users/calendar");

    return response.data.calendar;
}
