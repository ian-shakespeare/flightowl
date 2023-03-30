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
        if (PUBLIC_ACCOUNT_CREATION_DISABLED === "true") {
            fail(401);
            return;
        }
        const data = await request.formData();
        const fname = data.get("fname");
        const lname = data.get("lname");
        const email = data.get("email");
        const password = data.get("password");
        const confirmPassword = data.get("password-confirm");

        if (!email) {
            fail(400, { email, incorrect: true });
            return;
        }
        if (!password || !confirmPassword || password !== confirmPassword) {
            fail(400, { password, incorrect: true });
            return;
        }

        let status = 0;
        let response: Response = { token: "" };

        await axios
            .post(
                PUBLIC_API_URL + "/register",
                {
                    firstName: fname,
                    lastName: lname,
                    email: email,
                    password: password,
                    sex: "unselected",
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
