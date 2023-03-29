import axios from "axios";
import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import {
    PUBLIC_API_URL,
    PUBLIC_ACCOUNT_CREATION_DISABLED,
} from "$env/static/public";

type Response = {
    token: string;
};

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");

        if (!email) fail(400, { email, incorrect: true });
        if (!password) fail(400, { password, incorrect: true });

        let status = 0;
        let response: Response = { token: "" };

        await axios
            .post(
                PUBLIC_API_URL + "/login",
                {
                    email: email,
                    password: password,
                },
                { withCredentials: true }
            )
            .then((res) => {
                status = res.status;
                response = res.data;
            })
            .catch((err) => {
                status = err.status;
                console.error(err);
            });

        if (status !== 201) fail(status);

        cookies.set("jwt", response.token, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return { success: true, token: response.token };
    },
} satisfies Actions;
