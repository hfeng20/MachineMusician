import React, { useEffect, useState } from "react";
import Note from "../Note";
import Chord from "../Chord";
import Styles from './MachineMusician.module.css'
import { CHORD_STACKS, getChordNotes, SEVENTH_CHORD_STACKS } from "../Chord/Chord";
import { LETTERS } from "../Note/Note";
import StaffHeader from "../StaffHeader/StaffHeader";
import Measure from "../Measure/Measure";
import Staff from "../Staff/Staff";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

export const MAJOR_SCALE_FORM = [2, 2, 1, 2, 2, 2]

export const MINOR_SCALE_FORM = [2, 1, 2, 2, 1, 3]

export const MAJOR_KEYS = ['C', 'C#', 'D', 'Db', 'E', 'Eb', 'F', 'F#', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'Cb']

export const MINOR_KEYS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']

//TODO sanity check

export const POSSIBLE_NOTES = [
    ['A'],
    ['A#', 'Bb'],
    ['B', 'Cb'],
    ['C', 'B#'],
    ['C#', 'Db'],
    ['D'],
    ['D#', 'Eb'],
    ['E', 'Fb'],
    ['F', 'E#'],
    ['F#', 'Gb'],
    ['G'],
    ['G#', 'Ab'],
]



export const MAJOR_PROGRESSION_MAP = [
    { value: 0, quality: CHORD_STACKS.Major, inversions: [], paths: [1, 2, 3, 4, 5, 6] },
    { value: 1, quality: CHORD_STACKS.Minor, inversions: [], paths: [4, 6] },
    { value: 2, quality: CHORD_STACKS.Minor, inversions: [], paths: [3, 5] },
    { value: 3, quality: CHORD_STACKS.Major, inversions: [], paths: [0, 1, 4, 6] },
    { value: 4, quality: SEVENTH_CHORD_STACKS.Dominant, inversions: [], paths: [0, 5, 6] },
    { value: 5, quality: CHORD_STACKS.Minor, inversions: [], paths: [3] },
    { value: 6, quality: CHORD_STACKS.Diminished, inversions: [], paths: [0] },
]

export const MINOR_PROGRESSION_MAP = [
    { value: 0, quality: CHORD_STACKS.Minor, inversions: [], paths: [1, 2, 3, 4, 5, 6] },
    { value: 1, quality: CHORD_STACKS.Diminished, inversions: [], paths: [4, 6] },
    { value: 2, quality: CHORD_STACKS.Major, inversions: [], paths: [3, 5] },
    { value: 3, quality: CHORD_STACKS.Minor, inversions: [], paths: [1, 4, 6] },
    { value: 4, quality: CHORD_STACKS.Major, inversions: [], paths: [0, 5, 6] },
    { value: 5, quality: CHORD_STACKS.Major, inversions: [], paths: [1, 3] },
    { value: 6, quality: CHORD_STACKS.Diminished, inversions: [], paths: [0] },
]

const MachineMusician: React.FC = () => {
    const [scale, setScale] = useState<any[]>([])
    const [numMeasures, setNumMeasures] = useState(0)
    const [key, setKey] = useState('')
    const [timeSig, setTimeSig] = useState(4)
    const [quality, setQuality] = useState('')
    const [chordProgression, setChordProgression] = useState<any[]>()
    const [melody, setMelody] = useState<any[]>()
    const [melodyElements, setMelodyElements] = useState<any[]>([])
    const [chords, setChords] = useState<any[]>([])
    const [chordsNotes, setChordsNotes] = useState<any[]>()
    const [shouldGenerate, setShouldGenerate] = useState(false)
    const [shouldAllowGenerate, setShouldAllowGenerate] = useState(false)

    useEffect(() => {
        if (sanityCheck()) {
            setShouldAllowGenerate(true)
        } else {
            setShouldAllowGenerate(false)
            return
        }
        if (key === '' || quality === '') {
            return
        }
        let newScale = [key]
        let index = 0
        POSSIBLE_NOTES.forEach((combination) => {
            if (combination.includes(key)) {
                index = POSSIBLE_NOTES.indexOf(combination)
            }
        })
        if (quality === 'M') {
            MAJOR_SCALE_FORM.forEach((jump) => {
                const targetLetter = LETTERS[(LETTERS.indexOf(newScale[newScale.length - 1].substring(0, 1)) + 1) % LETTERS.length]
                const options = POSSIBLE_NOTES[(index + jump) % POSSIBLE_NOTES.length]
                index = index + jump
                options.forEach((option) => {
                    if (option.substring(0, 1) === targetLetter) {
                        newScale.push(option)
                    }
                })
            })
        } else {
            MINOR_SCALE_FORM.forEach((jump) => {
                const targetLetter = LETTERS[(LETTERS.indexOf(newScale[newScale.length - 1].substring(0, 1)) + 1) % LETTERS.length]
                const options = POSSIBLE_NOTES[(index + jump) % POSSIBLE_NOTES.length]
                index = index + jump
                options.forEach((option) => {
                    if (option.substring(0, 1) === targetLetter) {
                        newScale.push(option)
                    }
                })
            })
        }
        setScale(newScale)
    }, [quality, key])

    useEffect(() => {
        if (!shouldGenerate || (scale.length < 1 || key === '') || quality === '') {
            return
        }
        setChordProgression(generateChordProgression())
        setShouldGenerate(false)
    }, [shouldGenerate])

    useEffect(() => {
        if (!chordProgression) return
        let currentIndex = 0
        const newChords = chordProgression.map((chord) => {
            currentIndex = currentIndex + 1
            return (<Chord
                root={scale[chord.value]}
                rootOctave={LETTERS.indexOf(scale[chord.value].substring(0, 1)) >= LETTERS.indexOf('F') ? 2 : 3}
                rootDuration={(chord.value === 0 && currentIndex === chordProgression.length) ? 1 : 1 / 4}
                rootVolume={1}
                quality={chord.quality}
                structure={'5'}
            />)
        })
        setChordsNotes(chordProgression.map((chord, index) => {
            return {
                root: scale[chord.value],
                octave: LETTERS.indexOf(scale[chord.value].substring(0, 1)) >= LETTERS.indexOf('F') ? 2 : 3,
                duration: (chord.value === 0 && index === chordProgression.length - 1) ? 1 : 1 / 4,
                volume: 1,
                quality: chord.quality,
                structure: '5',
            }
        }))
        setNumMeasures(Math.ceil(newChords.length / timeSig))
        setChords(newChords)
        setMelody(generateMelody())
    }, [chordProgression])

    useEffect(() => {
        if (!melody) return
        let index = 0
        const newMelody = melody.map((set) => {
            return set.map((note: any) => {
                index = index + 1
                if (note.duration !== 1 / 8) {
                }
                return (
                    <Note
                        note={note.root}
                        octave={note.octave}
                        duration={note.duration}
                    />
                )
            })
        })
        setMelodyElements(newMelody)
    }, [melody])

    const sanityCheck = (): boolean => {
        if (!quality || quality === '' || !key || key === '') {
            return false
        }
        if (quality === 'M') {
            return MAJOR_KEYS.includes(key)
        } return MINOR_KEYS.includes(key)
    }

    const generateMelody = (): any[] => {
        let newMelody: any[] = []
        if (!chordProgression || chordProgression.length < 1) {
            return []
        }
        chordProgression.map((chord, index) => {
            if (index === 0) {
                newMelody = [...newMelody, [{ root: scale[chord.value], octave: 5, duration: 1 / 8 }]]
                return
            } if (index === chordProgression.length - 1) {
                newMelody = [...newMelody, [{ root: scale[chord.value], octave: 5, duration: 1 / 8 }]]
                return
            }
            const previousNote = newMelody[newMelody.length - 1][newMelody[newMelody.length - 1].length - 1]
            const curIndex = LETTERS.indexOf(previousNote.root.substring(0, 1))
            const possibleNotes = getChordNotes(scale[chord.value], previousNote.octave, 1 / 8, 1, chord.quality, '').map((note) => {
                return note.note
            })
            let minDistance = 12
            let minDistanceNote = { root: 'Z', octave: 5, duration: 1 / 8 }
            possibleNotes.forEach((note) => {
                if (Math.abs(LETTERS.indexOf(note.substring(0, 1)) - curIndex) < minDistance && note !== previousNote.root) {
                    minDistance = LETTERS.indexOf(note.substring(0, 1)) - curIndex
                    minDistanceNote = { root: note, octave: previousNote.octave, duration: 1 / 8 }
                }
            })
            newMelody = [...newMelody, [minDistanceNote]]
        })
        newMelody = newMelody.map((set, index) => {
            if (index === newMelody.length - 1) {
                return [{ ...set[0], duration: 1 }]
            }
            let curIndex = scale.indexOf(set[0].root)
            let nextIndex = scale.indexOf(newMelody[index + 1][0].root)
            if (curIndex - nextIndex > 5) {
                nextIndex += scale.length
            } else if (nextIndex - curIndex > 5) {
                curIndex += scale.length
            }
            if (Math.abs(curIndex - nextIndex) < 2) {
                if (curIndex - nextIndex < 0) {
                    return [...set, {
                        root: scale[(curIndex + 2) % scale.length],
                        octave: LETTERS.indexOf(set[0].root.substring(0, 1)) - LETTERS.indexOf(scale[(curIndex + 2) % scale.length].substring(0, 1)) > 4
                            ? set[0].octave + 1 :
                            LETTERS.indexOf(scale[(curIndex + 2) % scale.length].substring(0, 1)) - LETTERS.indexOf(set[0].root.substring(0, 1)) > 4
                                ? set[0].octave - 1 :
                                set[0].octave,
                        duration: 1 / 8
                    }]
                }
                return [...set, {
                    root: scale[(curIndex - 2 + scale.length) % scale.length],
                    octave: LETTERS.indexOf(set[0].root.substring(0, 1)) - LETTERS.indexOf(scale[(curIndex - 2 + scale.length) % scale.length].substring(0, 1)) > 4
                        ? set[0].octave + 1 :
                        LETTERS.indexOf(scale[(curIndex - 2 + scale.length) % scale.length].substring(0, 1)) - LETTERS.indexOf(set[0].root.substring(0, 1)) > 4
                            ? set[0].octave - 1 :
                            set[0].octave,
                    duration: 1 / 8
                }]
            } if (Math.abs(curIndex - nextIndex) > 4) {
                if (curIndex - nextIndex > 0) {
                    return [...set, { root: scale[(curIndex + 2) % scale.length], octave: set[0].octave, duration: 1 / 8 }]
                }
                return [...set, { root: scale[(curIndex - 2 + scale.length) % scale.length], octave: set[0].octave, duration: 1 / 8 }]
            }
            if (curIndex < nextIndex) {
                const middleIndex = ((curIndex + Math.floor(Math.random() * (nextIndex - curIndex + 1))) + 1) % scale.length
                return [...set, { root: scale[middleIndex], octave: set[0].octave, duration: 1 / 8 }]
            }
            const middleIndex = ((curIndex - Math.floor(Math.random() * (curIndex - nextIndex + 1)) + 1) + scale.length) % scale.length
            return [...set, { root: scale[middleIndex], octave: set[0].octave, duration: 1 / 8 }]
        })
        return newMelody
    }

    const generateChordProgression = (): number[] => {
        let progression: any[]
        if (quality === 'M') {
            progression = [MAJOR_PROGRESSION_MAP[0]]
            while (progression.length < 9) {
                do {
                    const possiblePaths = (progression[progression.length - 1]).paths
                    if (progression.length > 8 && possiblePaths.includes(0)) {
                        progression = [...progression, MAJOR_PROGRESSION_MAP[0]]
                    } else {
                        progression = [...progression, MAJOR_PROGRESSION_MAP[possiblePaths[Math.floor(Math.random() * possiblePaths.length)]]]
                    }
                } while (progression.length === 0 || progression[progression.length - 1].value !== 0)
            }
            if (progression.length % 4 === 1 && progression.length === 9) {
                progression = [...progression, MAJOR_PROGRESSION_MAP[3], MAJOR_PROGRESSION_MAP[1], MAJOR_PROGRESSION_MAP[4], MAJOR_PROGRESSION_MAP[0]]
            } else if (progression.length % 4 === 2) {
                progression = [...progression, MAJOR_PROGRESSION_MAP[1], MAJOR_PROGRESSION_MAP[4], MAJOR_PROGRESSION_MAP[0]]
            } else if (progression.length % 4 === 3) {
                progression = [...progression, MAJOR_PROGRESSION_MAP[4], MAJOR_PROGRESSION_MAP[0]]
            } else if (progression.length % 4 === 0) {
                progression = [...progression.slice(0, progression.length - 1), MAJOR_PROGRESSION_MAP[4], MAJOR_PROGRESSION_MAP[0]]
            }
        } else {
            progression = [MINOR_PROGRESSION_MAP[0]]
            while (progression.length < 8) {
                do {
                    const possiblePaths = (progression[progression.length - 1]).paths
                    progression = [...progression, MINOR_PROGRESSION_MAP[possiblePaths[Math.floor(Math.random() * possiblePaths.length)]]]
                } while (progression.length === 0 || progression[progression.length - 1].value !== 0)
            }
            if (progression.length % 4 === 1) {
                progression = [...progression, MINOR_PROGRESSION_MAP[3], MINOR_PROGRESSION_MAP[1], MINOR_PROGRESSION_MAP[4], MINOR_PROGRESSION_MAP[0]]
            } else if (progression.length % 4 === 2) {
                progression = [...progression, MINOR_PROGRESSION_MAP[1], MINOR_PROGRESSION_MAP[4], MINOR_PROGRESSION_MAP[0]]
            } else if (progression.length % 4 === 3) {
                progression = [...progression, MINOR_PROGRESSION_MAP[4], MINOR_PROGRESSION_MAP[0]]
            } else if (progression.length % 4 === 0) {
                progression = [...progression.slice(0, progression.length - 1), MINOR_PROGRESSION_MAP[4], MINOR_PROGRESSION_MAP[0]]
            }
        }
        return progression
    }
    return (
        <div>
            <div className={Styles.container}>
                <Staff melody={melodyElements} chords={chords} />
                <div className={Styles.inputContainer}>
                    <input
                        className={Styles.input}
                        placeholder='Key'
                        value={key}
                        onChange={(e) => {
                            setKey(e.target.value)
                        }}
                    />
                    <select className={Styles.select} value={quality} onChange={(e) => {
                        setQuality(e.target.value)

                    }}>
                        <option value=""></option>
                        <option value="M">Major</option>
                        <option value="m">Minor</option>
                    </select>
                    <button
                        className={Styles.button}
                        disabled={!shouldAllowGenerate}
                        onClick={() => {
                            setShouldGenerate(true)
                        }}
                    > Create music! </button>
                    <AudioPlayer notes={melody} chords={chordsNotes} shouldAllowPlay={melody !== undefined && melody.length !== 0} />
                </div>
            </div>
            <div className={Styles.mobileUsers}>
                <p className={Styles.oops}>Oops!</p>
                <p>Sorry, The Machine Musician is not available for mobile users. He sends his regards.</p>
            </div>
        </div>
    )
}

export default MachineMusician