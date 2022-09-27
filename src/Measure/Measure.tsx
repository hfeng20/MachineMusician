import React from "react"
import Note from "../Note"
import Styles from './Measure.module.css'

interface MeasureProps {
    melody: any[]
    chords: any[]
    first?: boolean
    last?: boolean
}

const Measure: React.FC<MeasureProps> = (props) => {
    const { melody, chords, first, last } = props
    const style = first ? Styles.first : last ? Styles.last : ''
    return (
        <div>
            <div className={`${Styles.staff}`}>
                <div className={`${Styles.staffLine} ${style}`} />
                <div className={`${Styles.staffLine} ${style}`} />
                <div className={`${Styles.staffLine} ${style}`} />
                <div className={`${Styles.staffLineLast} ${style}`} />

                <div className={`${Styles.centerSpace} ${style}`} />
                <div className={`${Styles.centerSpace} ${style}`} />
                <div className={`${Styles.centerSpace} ${style}`} />
                <div className={`${Styles.centerSpace} ${style}`} />
                <div className={`${Styles.centerSpace} ${style}`} />

                <div className={`${Styles.staffLine} ${style}`} />
                <div className={`${Styles.staffLine} ${style}`} />
                <div className={`${Styles.staffLine} ${style}`} />
                <div className={`${Styles.staffLineLast} ${style}`} />
            </div>
            <div className={Styles.notesContainer}>
                <div className={Styles.chordsContainer}>
                    {chords}
                </div>
                <div className={Styles.melodyContainer} >
                    {melody}
                    {/* <Note note='A' octave={5} duration={1 / 4} />
                    <Note note='B' octave={5} duration={1 / 4} /> */}
                </div>
            </div>
        </div >
    )
}

export default Measure