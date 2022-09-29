import React from "react";
import Styles from './Staff.module.css'
import StaffHeader from "../StaffHeader/StaffHeader";
import Measure from "../Measure/Measure";

interface StaffProps {
    melody: any[]
    chords: any[]
    key?: string
    timeSignature?: string
}

const Staff: React.FC<StaffProps> = (props) => {
    const { melody, chords, key, timeSignature } = props
    // if (melody.length !== chords.length && melody !== undefined && chords !== undefined) return (<div>Something went wrong!</div>)
    let curChords: any[] = []
    let curMelody: any[] = []
    let measures: any[] = []
    chords.map((chord, index) => {
        curChords = [...curChords, chord]
        curMelody = [...curMelody, melody[index]]
        if ((index + 1) % 4 === 0 || index === chords.length - 1) {
            measures = [...measures, (<Measure melody={curMelody} chords={curChords} first={index === 3} last={index === chords.length - 1} />)]
            curChords = []
            curMelody = []
        }
    })
    return (
        <div className={Styles.container}>
            <StaffHeader key={key} timeSignature={timeSignature} />
            {measures.length < 1 ? <Measure melody={[]} chords={[]} last={true} /> : measures}
        </div>
    )
}

export default Staff