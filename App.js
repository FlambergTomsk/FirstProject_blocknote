
import React, { useState } from 'react';
import{ nanoid }from 'nanoid'




function App (){
	
	const initTasks =[ 
		{id: nanoid(6), letter: 'Первое задание'},
	];
	
	
	const ls = JSON.parse(localStorage.getItem('notes'));
	const [notes, setNotes] = useState(ls? ls: initTasks)	


	const [value, setValue] = useState('');
	const [editId, setEditId] = useState(null);


	function addItem(){

		setNotes([...notes, {id: nanoid(6), letter: value}]);
		setValue(' ');
	}

	function getValue (prop){
		return notes.reduce((res, note)=>note.id===editId ? note[prop]:res, '');
	}


	function changeItem (prop, event){
		setNotes(notes.map(note=>
			note.id===editId?{...note,
			[prop]:event.target.value}:note));
	}

	function clear (){
		localStorage.clear();
	}


	function delItem (id){
		setNotes (notes.filter(note=>note.id!==id));
	}

	function saveTaskNote (){
		localStorage.setItem("notes", JSON.stringify(notes));
	}




	function findTasks (event){

		setNotes(notes.filter(note=>note.letter.includes(event.target.value)));

	}

	const result = notes.map ((note)=>{
		return <span key ={note.id}>
                <div>{note.letter}</div>
				<span><button onClick = {()=>delItem(note.id)}>Delete product</button></span>
				<span><button onClick = {()=>setEditId(note.id)}>Edit product</button></span>
				</span>
	})





	return <div>
	<textarea cols = '50' rows ='20' placeholder = 'Новая запись' 


	 value = {editId? getValue('letter')  : value } 
	 onChange = {editId? event=>changeItem('letter', event) :(event)=>setValue(event.target.value)} 





	>
    </textarea>
	<br></br>
	<button onClick={()=>setEditId(null)}>Save</button>
	<button onClick={addItem}>Add Note</button>
	<button onClick={saveTaskNote}>Save TaskNote</button>
	<button onClick={clear}>Clear</button>
	<br></br>
	<br></br>

	<input id='target' onChange = {(event)=>findTasks(event)}/><button >Find note</button>

	<br></br>
	<br></br>
	<br></br>
	<div>{result}</div>
	</div>
}
export default App;