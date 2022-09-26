import React, { useEffect, useState } from "react";
import Note from "../Note";
import Chord from "../Chord";
import Styles from './MachineMusician.module.css'
import { CHORD_STACKS, SEVENTH_CHORD_STACKS } from "../Chord/Chord";
import { LETTERS } from "../Note/Note";
import StaffHeader from "../StaffHeader/StaffHeader";
import MeasureLine from "../MeasureLine/MeasureLine";

export const MAJOR_SCALE_FORM = [2, 2, 1, 2, 2, 2]

export const MINOR_SCALE_FORM = [2, 1, 2, 2, 1, 3]

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
    const [chords, setChords] = useState<any[]>()
    const [shouldGenerateChordProgression, setShouldGenerateChordProgression] = useState(false)

    useEffect(() => {
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
        console.log(newScale)
        setScale(newScale)
    }, [quality, key])

    useEffect(() => {
        if (!shouldGenerateChordProgression || (scale.length < 1 || key === '') || quality === '') {

            return
        }
        setChordProgression(generateChordProgression())
        setShouldGenerateChordProgression(false)
    }, [shouldGenerateChordProgression])

    useEffect(() => {
        let newChords: any[] = []
        if (!chordProgression) return
        let currentIndex = 0
        chordProgression.forEach((chord) => {
            if (currentIndex % 4 === 0 && currentIndex !== 0) {
                newChords.push((<MeasureLine />))
            }
            newChords.push([(<Chord
                root={scale[chord.value]}
                rootOctave={LETTERS.indexOf(scale[chord.value].substring(0, 1)) >= LETTERS.indexOf('F') ? 2 : 3}
                rootDuration={(chord.value === 0 && currentIndex === chordProgression.length - 1) ? 1 : 1 / 4}
                rootVolume={1}
                quality={chord.quality}
                structure={'5'}
            />)])
            currentIndex = currentIndex + 1
        })
        setNumMeasures(Math.ceil(newChords.length / timeSig))
        setChords(newChords)
    }, [chordProgression])

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
        <div className={Styles.container}>
            <div className={Styles.staff}>
                <div className={Styles.staffLine} />
                <div className={Styles.staffLine} />
                <div className={Styles.staffLine} />
                <div className={Styles.staffLineLast} />

                <div className={Styles.centerSpace} />
                <div className={Styles.centerSpace} />
                <div className={Styles.centerSpace} />
                <div className={Styles.centerSpace} />
                <div className={Styles.centerSpace} />

                <div className={Styles.staffLine} />
                <div className={Styles.staffLine} />
                <div className={Styles.staffLine} />
                <div className={Styles.staffLineLast} />
                <div className={Styles.chordsContainer}>
                    <StaffHeader />
                    {chords}
                </div>
            </div>
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
                    onClick={() => {
                        setShouldGenerateChordProgression(true)
                    }}
                > Create music! </button>
            </div>
        </div>
    )
}

export default MachineMusician