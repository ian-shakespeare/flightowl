import axios from "axios";
import {
    PUBLIC_API_URL,
    PUBLIC_ACCOUNT_CREATION_DISABLED,
} from "$env/static/public";
import type { FlightOffer } from "$lib/interfaces";
import { browser } from "$app/environment";

export const getUsers = async () => {
    const res = await axios
        .get(PUBLIC_API_URL + "/users", { withCredentials: true })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return null;
        });

    if (res === null) return;

    switch (res.status) {
        case 200:
            console.log("success!");
            break;
        case 401:
            alert("please log in again");
            break;
        default:
            console.error(res.status);
            break;
    }
};

export const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirm: string,
    sex: string
) => {
    if (PUBLIC_ACCOUNT_CREATION_DISABLED === "true") {
        alert("Sorry, but account creation is disabled");
        return;
    }

    if (!firstName || !lastName || !email || !password || !passwordConfirm) {
        alert("Please fill in all fields");
        return;
    }

    if (password !== passwordConfirm) {
        alert("Passwords do not match");
        return;
    }

    const res = await axios
        .post(
            PUBLIC_API_URL + "/users",
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                sex: sex,
            },
            { withCredentials: true }
        )
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });

    if (res === null) return;

    switch (res.status) {
        case 201:
            console.log("OK");
            if (browser) {
                location.reload();
            }
            break;
        default:
            console.error(res.status);
            break;
    }
};

export const saveFlight = async (flightBody: FlightOffer) => {
    const res = await axios.post(
        PUBLIC_API_URL + "/flights",
        { data: flightBody },
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        }
    );

    if (res === null) return;

    switch (res.status) {
        case 201:
            console.log("flight saved");
            break;
        default:
            console.log(res);
    }
};

export const getUpdatedFlight = async (
    offerId: number
): Promise<FlightOffer | undefined> => {
    const res = await axios
        .post(
            PUBLIC_API_URL + "/flights/check",
            { offerId: offerId },
            { withCredentials: true }
        )
        .then((res) => res)
        .catch((err) => console.error(err));

    switch (res?.status) {
        case 200:
            return res.data;
        default:
            return;
    }
};
