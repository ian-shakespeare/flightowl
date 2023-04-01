import type { PageServerLoad } from "./$types";
import { API_URL } from "$env/static/private";
import axios from "axios";
import type { SavedFlightOffer } from "$lib/interfaces";

export const load = (async ({ cookies }) => {
    const token = cookies.get("jwt");
    let saved: SavedFlightOffer[] = [];
    let status = 401;

    if (!token) return { account: null, saved, status };

    await axios
        .request({
            method: "GET",
            url: API_URL + "/flights/saved",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            console.log(res.data[0]);
            saved = res.data;
            status = res.status;
        })
        .catch((err) => {
            console.error(err);
            status = err.response?.status ?? 500;
        });
    status = status === 401 ? 4010 : status;
    return { saved, status };
}) satisfies PageServerLoad;
