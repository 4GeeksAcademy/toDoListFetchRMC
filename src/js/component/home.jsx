
import React from "react";
import { useState } from "react";



//create your first component
const Home = () => {
	const [tareas, setTareas] = useState([])
	const [inputValue, setInputValue] = useState('')
	const handleChange = (e) => {
		setInputValue(e.target.value)
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		setTareas([...tareas, inputValue])
		setInputValue('')
	}
	const handleBorrar = (index) => {
		const newTareas = [...tareas]
		newTareas.splice(index, 1)
		setTareas(newTareas)
	}
	const handleKeyPress = (e) => {
		if (e.keyCode === 13 || e.which === 13) {
			handleSubmit()
		}
	}
	const placeHolder = 
		inputValue>=tareas ? "No one to kill" : "Let's kill!";
	return (
		<div>
			<div className="card">
				<img src="https://m.media-amazon.com/images/I/81+JKoSTQgL.jpg" alt="..." />
				<div className="card-img-overlay">
					<form onSubmit={handleSubmit} className="container-fluid img-overlay text-center " style={{ width: "30%" }}>
						<input type='text' value={inputValue} onChange={handleChange}
							onKeyUp={handleKeyPress} placeholder={placeHolder} style={{width : "130%"}}
						/>
					</form>
					<dl>
						{tareas.map((tarea, index) => (
							<dt className="" key={index}>
								<div className="kill row" style={{width:"80%"}}>
									<h2 className="col">{tarea}</h2>
									<button className="hide col" onClick={() => handleBorrar(index)} >DIE MDFKR!</button>
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
