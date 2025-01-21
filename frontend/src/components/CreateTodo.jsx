import axios from "axios"
import { useState } from "react"

export function CreateTodo(){
    const [title,setTitle] = useState('')
    const [description,setDescription]= useState('')

    async function submitHandler(e){
        e.preventDefault()
        try {
            await axios.post('http://localhost:3000/todo',{
                title,
                description
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <input className="p-10 mb-6" type="text" onChange={(e)=>setTitle(e.target.value)} placeholder="title" /> <br />
            <input type="text" onChange={(e)=>setDescription(e.target.value)} placeholder="description" /> <br />
            <button onClick={submitHandler}>Add a Todo</button>
        </div>
    )
}