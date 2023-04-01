import axios from "axios";
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { API_URL } from "$env/static/private";

type Response = {
    token: string;
};

export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");

        if (!email) fail(400, { email, incorrect: true });
        if (!password) fail(400, { password, incorrect: true });

        let status = 0;
        let response: Response = { token: "" };

        await axios
            .post(
                API_URL + "/login",
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
            expires: new Date(Date.now() + 168 * 3600 * 1000),
        });
        return { success: true, token: response.token };
    },
    logout: async ({ cookies }) => {
        cookies.delete("jwt");
        throw redirect(301, "/");
    },
} satisfies Actions;
