import { auth } from "@clerk/nextjs/server";

export default async function TestPage() {
    const { getToken } = await auth();
    const token = await getToken();

    console.log(token);

    const res = await fetch("http://localhost:8000/test", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await res.json();
    console.log(data);

    return (
        <div>
            <h1>Test Page</h1>
        </div>
    )

}
