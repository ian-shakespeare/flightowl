import axios from "axios";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { API_URL, ACCOUNT_CREATION_DISABLED } from "$env/static/private";

type Response = {
    token: string;
};

export const load = (async () => {
    return { registrationDisabled: ACCOUNT_CREATION_DISABLED === "true" };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ cookies, request }) => {
        if (ACCOUNT_CREATION_DISABLED === "true") {
            return fail(401, { registrationDisabled: true });
        }
        const data = await request.formData();
        const fname = data.get("fname");
        const lname = data.get("lname");
        const email = data.get("email");
        const password = data.get("password");
        const confirmPassword = data.get("password-confirm");

        if (!email || !fname || !lname || !password || !confirmPassword) {
            return fail(400, { missing: true });
        }
        if (password !== confirmPassword) {
            return fail(400, { password, incorrect: true });
        }

        let status = 0;
        let response: Response = { token: "" };

        await axios
            .post(
                API_URL + "/register",
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
