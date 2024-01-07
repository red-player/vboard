export const getTask = async (bucketId, setTasks) => {
    try {
        const response = await fetch(`http://localhost:4000/bucket/${bucketId}/task`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            const data = await response.json();

            if (!data.isdeleted) {
                setTasks(data);
            } else {
                setTasks(null);
            }
        }
    } catch (err) {
        console.log(err);
    }
};


export const toptobottom = async (bucketId, taskId, index) => {

    try {
        const response = await fetch(`http://localhost:4000/bucket/${bucketId}/task/${taskId}/top`,

            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    index,
                }),
            })
        if (response.ok) {
            const data = await response.json()

        }
    }
    catch (err) {
        console.log(err)
    }

}

export const bottomtotop = async (bucketId, taskId, index) => {

    try {
        const response = await fetch(`http://localhost:4000/bucket/${bucketId}/task/${taskId}/bottom`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                index,
            }),
        })
        if (response.ok) {
            const data = await response.json()

        }
    }
    catch (err) {

    }
}