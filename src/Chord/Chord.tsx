import React, { useState } from "react";
import Styles from './Chord.module.css'
import NOTES from '../Note'
import { POSSIBLE_NOTES } from "../MachineMusician/MachineMusician";
import Note, { getMajorThird, getMinorThird } from "../Note/Note";

interface ChordProps {
    root: string,
    rootOctave: number,
    rootDuration: number,
    rootVolume: number,
    quality: string,
    structure: string,
}

export const STRUCTURES = ['5', '6', '64']
export const SEVENTH_STRUCTURES = ['7', '65', '43', '42']

export enum CHORD_STACKS {
    Major = 'Mm',
    Minor = 'mM',
    Augmented = 'MM',
    Diminished = 'mm',
}

export enum SEVENTH_CHORD_STACKS {
    Major = 'MmM',
    Minor = 'mMm',
    Augmented = 'MMM',
    HalfAugmented = 'MMm',
    Diminished = 'mmm',
    HalfDiminished = 'mmM',
    Dominant = 'Mmm'
}

const Chord: React.FC<ChordProps> = (props) => {
    const { root, rootOctave, rootDuration, rootVolume, quality, structure } = props
    let notes = [{ note: root, octave: rootOctave, duration: rootDuration, volume: rootVolume }]
    const isSeventh = (SEVENTH_STRUCTURES.includes(structure))
    let curOctave = rootOctave
    for (let third of quality.split('')) {
        const curNote = notes[notes.length - 1].note
        const curLetter = curNote.charAt(0)
        if ((curLetter === 'F' || curLetter === 'G')) {
            curOctave = curOctave + 1
        }
        let nextNote = 'Z'
        switch (third) {
            case 'M':
                nextNote = getMajorThird(curNote)
                break
            case 'm':
                nextNote = getMinorThird(curNote)
                break
        }
        notes = [...notes, { note: nextNote, octave: curOctave, duration: rootDuration, volume: rootVolume }]
    }
    const numMoves = isSeventh ? SEVENTH_STRUCTURES.indexOf(structure) : STRUCTURES.indexOf(structure)
    let shifts = 0
    while (shifts < numMoves) {
        let moveNote = notes[0]
        notes = [...notes.slice(1), { ...moveNote, octave: moveNote.octave + 1 }]
        shifts += 1
    }
    console.log(notes)
    const noteObjectList = notes.map((curNote) => {
        const index = notes.indexOf(curNote)
        const tail = (curNote.note.length > 1) ? curNote.note.substring(1) : undefined
        let possibleNotesIndex = 0
        let offSet = false
        POSSIBLE_NOTES.forEach((set) => {
            if (set.includes(curNote.note)) {
                possibleNotesIndex = POSSIBLE_NOTES.indexOf(set)
            }
        })
        if (((POSSIBLE_NOTES[(possibleNotesIndex - 2 + POSSIBLE_NOTES.length) % POSSIBLE_NOTES.length].includes(notes[(index - 1 + notes.length) % notes.length].note))
            && ((notes[(index - 1 + notes.length) % notes.length].octave === curNote.octave) && !((notes[(index - 1 + notes.length) % notes.length].note.substring(0, 1) === 'G' && curNote.note.substring(0, 1) === 'A'))))
            || ((notes[(index - 1 + notes.length) % notes.length].note.substring(0, 1) === 'G' && curNote.note.substring(0, 1) === 'A' && curNote.octave === (notes[(index - 1 + notes.length) % notes.length].octave) + 1))) {
            offSet = true
            console.log('TRUE')
        }
        return (
            <Note key={curNote.note} note={curNote.note} accidentals={tail} octave={curNote.octave} duration={curNote.duration} bassClef={true} chordPosition={index} noteOffset={offSet} />
        )
    })
    return (
        <div className={Styles.chordContainer}>
            {noteObjectList}
        </div>
    )
}

export default Chord