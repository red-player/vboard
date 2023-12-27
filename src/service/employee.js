export const getAllEmployee = async (setAllEmployee) => {
    try {
        const response = await fetch(`http://localhost:4000/employees`, {

            method: "GET",
            headers: { "Content-Type": "application/json", }
        }
        )
        if (response.ok) {
            const data = await response.json()
            setAllEmployee(data)
        }
    } catch (err) {

    }
}

export const getEmployee = async (employeeId, SetData) => {
    try {
        const response = await fetch(`http://localhost:4000/employees/${employeeId}`, {

            method: "GET",
            headers: { "Content-Type": "application/json", }
        }
        )
        if (response.ok) {
            const data = await response.json()
            SetData(data)
        }
    } catch (err) {

    }
}