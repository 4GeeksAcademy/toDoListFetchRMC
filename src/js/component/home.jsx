
import React from "react";
import { useState, useEffect } from "react";

const Home = () => {
	const [usuario, setUsuario] = useState('')
	const [tareas, setTareas] = useState([])
	const [inputValue, setInputValue] = useState('')
	const handleChange = (e) => {
		setInputValue(e.target.value)
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		setTareas([...tareas, inputValue])
		setInputValue('')
		if (inputValue.length < 1) {
			alert("Escribe el nombre completo")
			return
		}
		let payload = {
			label: inputValue,
			is_done: false
		}

		try {
			let response = await fetch(`https://playground.4geeks.com/todo/todos/${usuario}`, {
				method: "POST",
				body: JSON.stringify(payload),
				headers: {
					"Content-Type": "application/json"
				}
			}
			)
			if (!response.ok) {
				throw new Error("mamaste")
			}
			let data = await response.json()
			setTareas([...tareas, data])
		} catch (error) {
			console.log(error)
		}
	}
	const handleBorrar = async (id) => {
		try {
			let response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE"
			}
			)
			if (!response.ok) {
				throw new Error("mamaste")
			}
			let listaFinal = tareas.filter((item) => item.id != id)
			setTareas(listaFinal)
		} catch (error) {
			console.log(error)
		}
	}
	const handleKeyPress = (e) => {
		if (e.keyCode === 13 || e.which === 13) {
			handleSubmit()
		}
	}
	const handleKeyPress2 = (e) => {
		if (e.keyCode === 13 || e.which === 13) {
			getUserTasks()
		}
	}
	const [placeHolder, setPlaceHolder] = useState(inputValue >= tareas ? "No one to kill" : "Let's kill!")

	const getUserTasks = async () => {
		try {
			let response = await fetch(`https://playground.4geeks.com/todo/users/${usuario}`)
			if (!response.ok) {
				throw new Error("mamaste")
			}
			let data = await response.json()
			setTareas(data.todos)

		} catch (error) {
			console.error(error)
		}

	}

	useEffect(() => {
		getUserTasks()

	}, [])

	return (
		<div>
			<div className="card">
				<img src="https://m.media-amazon.com/images/I/81+JKoSTQgL.jpg" alt="..." />
				<div className="card-img-overlay">
					<input className="container-fluid img-overlay text-center" style={{ width: "30%" }} placeholder="Ingrese su usuario" onChange={(e) => setUsuario(e.target.value)} onKeyDown={handleKeyPress2} />

					<form onSubmit={handleSubmit} className="container-fluid img-overlay text-center " style={{ width: "30%" }}>
						<input type='text' value={inputValue} onChange={handleChange}
							onKeyUp={handleKeyPress} placeholder={placeHolder} style={{ width: "130%" }}
						/>
					</form>
					<dl>
						{tareas && tareas.map((item, index) => (
							<dt className="" key={index}>
								<div className="kill row" style={{ width: "80%" }}>
									<h2 className="col">{item.label}</h2>
									<button className="hide col" onClick={() => handleBorrar(item.id)} >DIE MDFKR!</button>
								</div>
							</dt>
						))}
					</dl>
				</div>
			</div>
		</div>
	)
}

export default Home;
