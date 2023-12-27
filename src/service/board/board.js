export const getAllBoard = async (projectId, setAllBoard) => {
    try {
        const response = await fetch(`http://localhost:4000/projects/${projectId}/board`, {
            method: "GET",
            headers: { "Content-Type": "application/json", },
        }
        )
        if (response.ok) {
            const data = await response.json()
            setAllBoard(data)
        }

    }
    catch (err) {

    }
}