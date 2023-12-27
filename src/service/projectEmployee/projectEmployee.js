export const getProjectEmployee = async (projectId, setProEmployee) => {
    try {
        const response = await fetch(`http://localhost:4000/projects/${projectId}/members`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json", }
            }
        )
        if (response.ok) {
            const data = await response.json()
            setProEmployee(data)
        }
    }

    catch (err) {

    }
}