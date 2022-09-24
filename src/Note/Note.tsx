import React from "react";
import Styles from './Note.module.css'

export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
export const NOTES = ['Ab', 'A', 'A#', 'Bb', 'B', 'B#', 'Cb', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'Fb', 'E#', 'F', 'F#', 'Gb', 'G', 'G#']

export enum MAJOR_THIRDS {
    'A' = 'C#',
    'B' = 'D#',
    'C' = 'E',
    'D' = 'F#',
    'E' = 'G#',
    'F' = 'A',
    'G' = 'B'
}

export enum MINOR_THIRDS {
    A = 'C',
    B = 'D',
    C = 'Eb',
    D = 'F',
    E = 'G',
    F = 'Ab',
    G = 'Bb',
}

interface NoteProps {
    note: string,
    accidentals?: string,
    octave: number,
    duration: number,
    bassClef?: boolean,
    chordPosition?: number,
}

export const flatAccidentalComponent = (
    <div>
        <p className={Styles.accidentalText}>b</p>
    </div>
)

export const sharpAccidentalComponent = (
    <div>
        <p className={Styles.accidentalText}>#</p>
    </div>
)

const getStyle = (noteLetter: string, bassClef: boolean, octave: number, chordPosition?: number): number => {
    let shifts = 0
    switch (noteLetter) {
        case 'A':
            if (bassClef) {
                switch (octave) {
                    case 2:
                        shifts = -2.5
                        break
                    case 3:
                        shifts = 1
                        break
                    case 4:
                        shifts = 4.5
                        break
                }
            }
            else {
                switch (octave) {
                    case 4:
                        shifts = 7.5
                        break
                    case 5:
                        shifts = 11
                        break
                    case 6:
                        shifts = 14.5
                        break
                }
            }
            break
        case 'B':
            if (bassClef) {
                switch (octave) {
                    case 2:
                        shifts = -2
                        break
                    case 3:
                        shifts = 1.5
                        break
                    case 4:
                        shifts = 5
                        break
                }
            }
            else {
                switch (octave) {
                    case 4:
                        shifts = 8
                        break
                    case 5:
                        shifts = 11.5
                        break
                    case 6:
                        shifts = 15
                        break
                }
            }
            break
        case 'C':
            if (bassClef) {
                switch (octave) {
                    case 2:
                        shifts = -1.5
                        break
                    case 3:
                        shifts = 2
                        break
                    case 4:
                        shifts = 5.5
                        break
                }
            }
            else {
                switch (octave) {
                    case 4:
                        shifts = 8.5
                        break
                    case 5:
                        shifts = 12
                        break
                    case 6:
                        shifts = 15.5
                        break
                }
            }
            break
        case 'D':
            if (bassClef) {
                switch (octave) {
                    case 2:
                        shifts = -3
                        break
                    case 3:
                        shifts = 2.5
                        break
                    case 4:
                        shifts = 6
                        break
                }
            }
            else {
                switch (octave) {
                    case 4:
                        shifts = 9
                        break
                    case 5:
                        shifts = 12.5
                        break
                    case 6:
                        shifts = 16
                        break
                }
            }
            break
        case 'E':
            if (bassClef) {
                switch (octave) {
                    case 2:
                        shifts = -2.5
                        break
                    case 3:
                        shifts = 3
                        break
                    case 4:
                        shifts = 6.5
                        break
                }
            }
            else {
                switch (octave) {
                    case 4:
                        shifts = 9.5
                        break
                    case 5:
                        shifts = 13
                        break
                    case 6:
                        shifts = 16.5
                        break
                }
            }
            break
        case 'F':
            if (bassClef) {
                switch (octave) {
                    case 2:
                        shifts = 0
                        break
                    case 3:
                        shifts = 3.5
                        break
                    case 4:
                        shifts = 6
                        break
                }
            }
            else {
                switch (octave) {
                    case 4:
                        shifts = 10
                        break
                    case 5:
                        shifts = 13.5
                        break
                    case 6:
                        shifts = 17
                        break
                }
            }
            break
        case 'G':
            if (bassClef) {
                switch (octave) {
                    case 2:
                        shifts = 0.5
                        break
                    case 3:
                        shifts = 4
                        break
                    case 4:
                        shifts = 7.5
                        break
                }
            }
            else {
                switch (octave) {
                    case 4:
                        shifts = 10.5
                        break
                    case 5:
                        shifts = 14
                        break
                    case 6:
                        shifts = 17.5
                        break
                }
            }
            break
    }
    if (chordPosition) {
        shifts += chordPosition
    }
    return shifts
}

export const getMinorThird = (note: string): string => {
    const notesCharacters = note.split('')
    const letter = notesCharacters[0]
    let newNote = ''
    switch (letter) {
        case 'A':
            newNote = 'C'
            break
        case 'B':
            newNote = 'D'
            break
        case 'C':
            newNote = 'Eb'
            break
        case 'D':
            newNote = 'F'
            break
        case 'E':
            newNote = 'G'
            break
        case 'F':
            newNote = 'Ab'
            break
        case 'G':
            newNote = 'Bb'
            break
    }
    const tail = note.length > 1 ? notesCharacters.slice(1, notesCharacters.length) : []
    if (tail.length > 0) {
        tail.forEach((character) => {
            if (character === '#') {
                if (newNote.includes('b')) {
                    newNote = newNote.substring(0, newNote.length - 1)
                }
                else {
                    newNote = newNote + '#'
                }
            }
            else if (character === 'b') {
                if (newNote.includes('#')) {
                    newNote = newNote.substring(0, newNote.length - 1)
                }
                else {
                    newNote = newNote + 'b'
                }
            }
        })
    }
    return newNote
}

export const getMajorThird = (note: string): string => {
    const notesCharacters = note.split('')
    const letter = notesCharacters[0]
    let newNote = ''
    switch (letter) {
        case 'A':
            newNote = 'C#'
            break
        case 'B':
            newNote = 'D#'
            break
        case 'C':
            newNote = 'E'
            break
        case 'D':
            newNote = 'F#'
            break
        case 'E':
            newNote = 'G#'
            break
        case 'F':
            newNote = 'A'
            break
        case 'G':
            newNote = 'B'
            break
    }
    const tail = note.length > 1 ? notesCharacters.slice(1, notesCharacters.length) : []
    if (tail.length > 0) {
        tail.forEach((character) => {
            if (character === '#') {
                if (newNote.includes('b')) {
                    newNote = newNote.substring(0, newNote.length - 1)
                }
                else {
                    newNote = newNote + '#'
                }
            }
            else if (character === 'b') {
                if (newNote.includes('#')) {
                    newNote = newNote.substring(0, newNote.length - 1)
                }
                else {
                    newNote = newNote + 'b'
                }
            }
        })
    }
    return newNote
}

const Note: React.FC<NoteProps> = (props) => {
    const { note, octave, duration, bassClef, chordPosition } = props
    let error = false
    if (!note || note.length < 1) {
        return <div />
    }
    const notesCharacters = note.split('')
    if (!LETTERS.includes(notesCharacters[0])) {
        return <div />
    }
    const accidental = note.length > 1 ? notesCharacters[1] : ''
    const tail = note.length > 1 ? notesCharacters.slice(1, notesCharacters.length) : []

    if (note.length > 1) {
        tail.forEach((tailCharacter) => {
            if (tailCharacter !== accidental) {
                error = true
            }
        })
    }
    if (error) {
        return <div />
    }
    const letter = notesCharacters[0]
    const shifts = getStyle(letter, bassClef ? true : false, octave, chordPosition || undefined)
    const pixelShifts = shifts * (-15)
    let rawAccidentals = (note.length > 1) ? note.substring(1) : ''
    const accidentals = rawAccidentals.replaceAll('b', '♭').replaceAll('#', '♯')
    return (
        <div style={{ display: 'flex', flexDirection: 'row', translate: `0 ${pixelShifts}px`, marginRight: '20px', marginLeft: '20px' }}>
            {/* <p style={{ width: '3px', fontSize: '6px', translate: '0 -23px' }}>{accidentals}</p> */}
            <div className={`${Styles.quarter}`}>
                <p className={Styles.accidentalText}>{`${accidentals}`}</p>
            </div>
        </div>
    )
}

export default Note