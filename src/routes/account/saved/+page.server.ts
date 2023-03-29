import type { PageServerLoad } from "./$types";
import { PUBLIC_API_URL } from "$env/static/public";
import axios from "axios";

export const load = (async ({ cookies }) => {
    const token = cookies.get("jwt");
    if (token === undefined) return { account: null };

    const res = await axios.request({
        method: "GET",
        url: PUBLIC_API_URL + "/flights/saved",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.status == 200) {
        return {
            saved: res.data,
        };
    }
}) satisfies PageServerLoad;
