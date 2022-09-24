import React, { useEffect, useState } from "react";
import Note from "../Note";
import Chord from "../Chord";
import Styles from './MachineMusician.module.css'
import { CHORD_STACKS, SEVENTH_CHORD_STACKS } from "../Chord/Chord";

export const MAJOR_PROGRESSION = [
    { value: 0, inversions: [], paths: [1, 2, 3, 4, 5, 6] },
    { value: 1, inversions: [], paths: [4, 6] },
    { value: 2, inversions: [], paths: [3, 5] },
    { value: 3, inversions: [], paths: [0, 1, 4, 6] },
    { value: 4, inversions: [], paths: [0, 5, 6] },
    { value: 5, inversions: [], paths: [3] },
    { value: 6, inversions: [], paths: [0] },
]

const MachineMusician: React.FC = () => {
    const [key, setKey] = useState('')
    const [quality, setQuality] = useState('')
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
                <div className={Styles.notesContainer}>
                    <Chord root='A' rootDuration={1} rootOctave={3} rootVolume={1} quality={SEVENTH_CHORD_STACKS.Dominant} structure='' />
                    <Note note='A' octave={4} duration={1} bassClef={true} />
                    <Note note='Gb' octave={4} duration={1} />
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
                <button className={Styles.button}> Create music! </button>
            </div>
        </div>
    )
}

export default MachineMusician