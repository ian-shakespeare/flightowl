import type { PageServerLoad } from "./$types";
import { PUBLIC_API_URL } from "$env/static/public";
import axios from "axios";
import type { FlightOffer } from "$lib/interfaces";

export const load = (async ({ cookies, url }) => {
    const token = cookies.get("jwt");
    let flights: FlightOffer[] = [];
    let status = 401;

    if (!token) return { account: null, flights, status };

    const body = {
        originLocationCode: url.searchParams.get("origin"),
        destinationLocationCode: url.searchParams.get("destination"),
        departureDate: url.searchParams.get("date"),
        adults: 1,
    };
    await axios
        .request({
            method: "POST",
            url: PUBLIC_API_URL + "/flights",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: body,
        })
        .then((res) => {
            flights = res.data;
            status = res.status;
        })
        .catch((err) => {
            console.error(err);
            status = err.response.status;
        });

    status = status === 401 ? 4010 : status;
    return { flights, status };
}) satisfies PageServerLoad;

export const ssr = true;
