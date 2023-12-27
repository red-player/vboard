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
                setTasks(null); // Fix the typo here
            }
        }
    } catch (err) {
        console.log(err);
    }
};
