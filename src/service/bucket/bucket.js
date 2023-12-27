export const getBuckets = async (boardId, setBuckets) => {
    try {
        const response = await fetch(`http://localhost:4000/board/${boardId}/bucket`, {

            method: "GET",
            headers: { "Content-Type": "application/json", }
        }
        )
        if (response.ok) {
            const data = await response.json()

            if (!data.isDeleted) {
                setBuckets(data)
            } else {
                setBuckets(null)
            }
        }


    } catch (err) {
        console.log(err)
    }
}