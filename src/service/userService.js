
export const handleAuth = async ({ form, navigate }) => {

    try {

        const response = await fetch(`http://localhost:4000/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            const data = await response.json();
            // const { user } = data;
            const index = data.data.user.employee_id;
            navigate(`/dashboard/${index}`, {
                state: { userData: data.data.user },
            });
        } else {
            console.error("Authentication failed");
        }
    } catch (error) {
        console.error(error);
    } finally {

    }
};


export const handleRegister = async ({ form }) => {
    try {
        console.log("Registration data:", form);

        const response = await fetch("http://localhost:4000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            console.log("Registration successful");
        } else {
            console.error("Registration failed");
        }
    } catch (error) {
        console.error("Error during registration:", error);
    }
};