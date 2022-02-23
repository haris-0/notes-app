const { default: chalk } = require('chalk')
const fs = require('fs')

//Adding a Note
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find ( (note) => note.title === title)

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New notes added'))
    } else {
        console.log(chalk.red.inverse('Title already exist'))
    }
}

//Removing a Note
const removeNote =  (title) =>{
    const notes = loadNotes()
    const NonMatchingNote = notes.filter ( (note) => note.title !== title )
    
    if (notes.length > NonMatchingNote.length){
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(NonMatchingNote)    
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

//List Note
const listNotes = () =>{
    const notes = loadNotes()
    console.log(chalk.green.inverse('Listing all notes'))
    notes.forEach( (note) => {
        console.log(note.title)
    })
}

//Reading Note
const readNote = (title) => {
    const notes = loadNotes()
    const findNote = notes.find( (note) => note.title === title)
    
    if(findNote) {
        console.log(chalk.inverse(findNote.title))
        console.log(findNote.body)
    } else {
        console.log(chalk.red.inverse('No note found'))
    }
}

//Saving note
const saveNotes = function (notes){
    const dataString = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataString)
}

//Loading Notes
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e){
        return []
    }
    
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}