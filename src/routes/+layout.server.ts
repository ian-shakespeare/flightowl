import { PUBLIC_API_URL } from "$env/static/public";
import type { LayoutServerLoad } from "./$types";
import axios from "axios";

export const load = (async ({ cookies }) => {
    const token = cookies.get("jwt");
    let status = 401;
    let account = null;

    if (!token) return { account, status };

    await axios
        .request({
            method: "GET",
            url: PUBLIC_API_URL + "/user",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            status = res.status;
            account = res.data;
        })
        .catch((err) => {
            status = err.status;
            console.error(err);
        });

    if (status === 401) cookies.delete("jwt");
    return { account, globalSigninStatus: status };
}) satisfies LayoutServerLoad;

export const ssr = true;
