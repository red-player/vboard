export const getAllProjects = async (setAllProjects) => {
    try {
        const response = await fetch(`http://localhost:4000/projects`, {

            method: "GET",
            headers: { "Content-Type": "application/json", }
        }
        )
        if (response.ok) {
            const data = await response.json()
            setAllProjects(data)
        }
    } catch (err) {
        console.log(err)
    }
}

export const getProjects = async (projectId, setProjects) => {
    try {
        const response = await fetch(`http://localhost:4000/projects/${projectId}`, {

            method: "GET",
            headers: { "Content-Type": "application/json", },

        }
        )
        if (response.ok) {
            const data = await response.json()
            setProjects(data)
        }
    } catch (err) {
        console.log(err)
    }
}

export const getEProjects = async (employeeId, setEProjects) => {
    try {
        const response = await fetch(`http://localhost:4000/employees/${employeeId}/projects`, {

            method: "GET",
            headers: { "Content-Type": "application/json", },

        }
        )
        if (response.ok) {
            const data = await response.json()
            setEProjects(data)
        }
    } catch (err) {
        console.log(err)
    }
}