import React, { useState } from "react";
import Styles from './Chord.module.css'
import NOTES from '../Note'
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
    for (let third of quality.split('')) {
        const curNote = notes[notes.length - 1].note
        const curLetter = curNote.charAt(0)
        let curOctave = (curLetter === 'F' || curLetter === 'G') ? rootOctave + 1 : rootOctave
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
    const noteObjectList = notes.map((curNote) => {
        const tail = (curNote.note.length > 1) ? curNote.note.substring(1) : undefined
        return (
            <Note note={curNote.note} accidentals={tail} octave={curNote.octave} duration={curNote.duration} bassClef={true} chordPosition={notes.indexOf(curNote)} />
        )
    })
    return (
        <div className={Styles.chordContainer}>
            {noteObjectList}
        </div>
    )
}
// NOTES = ['Ab', 'A', 'A#', 'Bb', 'B', 'B#', 'Cb', 'C', 'C#', 'Db',
//     'D', 'D#', 'Eb', 'E', 'E#', 'Fb', 'F', 'F#', 'Gb', 'G', 'G#']

// STRUCTURES = ['5', '6', '64']
// SEVENTH_STRUCTURES = ['7', '65', '43', '42']

// CHORD_STACKS = dict()
// CHORD_STACKS['M'] = ['M', 'm', 'M']
// CHORD_STACKS['m'] = ['m', 'M', 'm']
// CHORD_STACKS['+'] = ['M', 'M', 'M']
// CHORD_STACKS['aug'] = ['M', 'M', 'm']
// CHORD_STACKS['o'] = ['m', 'm', 'm']
// CHORD_STACKS['ø'] = ['m', 'm', 'M']
// CHORD_STACKS['dim'] = ['m', 'm', 'm']
// CHORD_STACKS['half-dim'] = ['m', 'm', 'M']
// CHORD_STACKS['dom'] = ['M', 'm', 'm']


// class Chord():

//     def __init__(self, root, quality, structure):
// try:
// if quality not in CHORD_STACKS.keys():
//                 raise Exception("Invalid chord quality.")
// if structure not in STRUCTURES and structure not in SEVENTH_STRUCTURES:
//                 raise Exception("Invalid chord inversion.")
//         except Exception as E:
// raise
// return
// self.root = root
// self.quality = quality
// self.structure = structure
// if self.isSeventh:
//     self.size = 4
// else:
// self.size = 3
// self.notes = [root]
// curNote = self.notes[len(self.notes) - 1]
// if self.isSeventh():
//     for third in CHORD_STACKS[quality]:
//         if (third == 'M'):
//             nextNote = curNote.getMajorThird()
// if curNote.letter == 'G' or curNote.letter == 'F':
// self.notes.append(
//     Note(nextNote, curNote.octave + 1, curNote.duration, curNote.volume))
//                     else:
// self.notes.append(
//     Note(nextNote, curNote.octave, curNote.duration, curNote.volume))
//                 else:
// nextNote = curNote.getMinorThird()
// if curNote.letter == 'G' or curNote.letter == 'F':
// self.notes.append(
//     Note(nextNote, curNote.octave + 1, curNote.duration, curNote.volume))
//                     else:
// self.notes.append(
//     Note(nextNote, curNote.octave, curNote.duration, curNote.volume))
// curNote = self.notes[len(self.notes) - 1]
// inverted = False
// for i in range(SEVENTH_STRUCTURES.index(structure)):
//     inverted = True
// self.notes[0].octave += 1
// self.notes.append(self.notes.pop(0))
// if inverted:
//     for note in self.notes:
//         note.octave -= 1
// else:
// for third in (CHORD_STACKS[quality])[: 2]:
// if third == "M":
//     nextNote = curNote.getMajorThird()
// if curNote.letter == 'G' or curNote.letter == 'F':
// self.notes.append(
//     Note(nextNote, curNote.octave + 1, curNote.duration, curNote.volume))
//                     else:
// self.notes.append(
//     Note(nextNote, curNote.octave, curNote.duration, curNote.volume))
//                 else:
// nextNote = curNote.getMinorThird()
// if curNote.letter == 'G' or curNote.letter == 'F':
// self.notes.append(
//     Note(nextNote, curNote.octave + 1, curNote.duration, curNote.volume))
//                     else:
// self.notes.append(
//     Note(nextNote, curNote.octave, curNote.duration, curNote.volume))
// curNote = self.notes[len(self.notes) - 1]
// inverted = False
// for i in range(STRUCTURES.index(structure)):
//     inverted = True
// self.notes[0].octave += 1
// self.notes.append(self.notes.pop(0))
// if inverted:
//     for note in self.notes:
//         note.octave -= 1

//     def isSeventh(self):
// if self.structure in SEVENTH_STRUCTURES:
//     return True
// return False


// try:
// noteBase = input('Note: ')
// root = Note(noteBase, 4, 1 / 4, 6)
// quality = input('Quality: ')
// inversion = input('Inversion: ')
// chord = Chord(root, quality, inversion)
// for note in chord.notes:
//     print(note.note + " " + (str)(note.octave))
// except Exception as E:
// print(E)

export default Chord