import type { RequestHandler } from "./$types";
import axios from "axios";
import { API_URL } from "$env/static/private";
import type { FlightOffer } from "$lib/interfaces";
import { json } from "@sveltejs/kit";

export const GET = (async ({ cookies, url }) => {
    const token = cookies.get("jwt");
    const offerId = Number(url.searchParams.get("offerId"));
    let status = 401;
    let newOffer: FlightOffer | undefined;
    await axios
        .post(
            API_URL + "/flights/check",
            { offerId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((res) => {
            status = res.status;
            newOffer = res.data;
        })
        .catch((err) => {
            status = err.response.status;
            console.error(err);
        });

    return json(newOffer, { status });
}) satisfies RequestHandler;

export const POST = (async ({ cookies, request }) => {
    const token = cookies.get("jwt");
    const body = await request.json();
    let status = 401;
    await axios
        .post(API_URL + "/flights/saved", body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            status = res.status;
        })
        .catch((err) => {
            console.error(err);
            status = err.response.status;
        });

    return new Response(null, { status });
}) satisfies RequestHandler;
