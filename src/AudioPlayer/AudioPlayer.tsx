import React, { useEffect, useState } from "react";
import useSound from 'use-sound'
import { PlayFunction } from "use-sound/dist/types";
import Styles from './AudioPlayer.module.css'

interface AudioPlayerProps {
    notes: any[]
    shouldAllowPlay: boolean
}

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

const AudioPlayer: React.FC<AudioPlayerProps> = (props) => {
    const [Ab2, Ab2Stop] = useSound('/Audio/Ab2.mp3')
    const [A2, A2Stop] = useSound('/Audio/A2.mp3')
    const [Bb2, Bb2Stop] = useSound('/Audio/Bb2.mp3')
    const [B2, B2Stop] = useSound('/Audio/B2.mp3')
    const [C2, C2Stop] = useSound('/Audio/C2.mp3')
    const [Db2, Db2Stop] = useSound('/Audio/Db2.mp3')
    const [D2, D2Stop] = useSound('/Audio/D2.mp3')
    const [Eb2, Eb2Stop] = useSound('/Audio/Eb2.mp3')
    const [E2, E2Stop] = useSound('/Audio/E2.mp3')
    const [F2, F2Stop] = useSound('/Audio/F2.mp3')
    const [Gb2, Gb2Stop] = useSound('/Audio/Gb2.mp3')
    const [G2, G2Stop] = useSound('/Audio/G2.mp3')
    // const PlayableNotes = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G']
    const PlayNotes: any[] = [[Ab2, Ab2Stop], [A2, A2Stop], [Bb2, Bb2Stop], [B2, B2Stop], [C2, C2Stop], [Db2, Db2Stop], [D2, D2Stop], [Eb2, Eb2Stop], [E2, E2Stop], [F2, F2Stop], [Gb2, Gb2Stop], [G2, G2Stop]]
    const { notes } = props
    const [playing, setPlaying] = useState(false)
    useEffect(() => {
        if (!notes || notes.length === 0) {
            return
        }

    }, [notes])

    useEffect(() => {
        if (!playing) {
            clearTimeouts()
            return
        }
    }, [playing])

    const clearTimeouts = () => {
        const highestId = window.setTimeout(() => {
            for (let i = highestId; i >= 0; i--) {
                window.clearInterval(i);
            }
        }, 0);
    }

    const getAudioFunction = (note: string, octave: number) => {
        switch (note) {
            case 'Ab' || 'G#':
                return PlayNotes[0 + ((octave - 2) * 12)]
            case 'A':
                return PlayNotes[1 + ((octave - 2) * 12)]
            case 'A#' || 'Bb':
                return PlayNotes[2 + ((octave - 2) * 12)]
            case 'B' || 'Cb':
                return PlayNotes[3 + ((octave - 2) * 12)]
            case 'C' || 'B#':
                return PlayNotes[4 + ((octave - 2) * 12)]
            case 'C#' || 'Db':
                return PlayNotes[5 + ((octave - 2) * 12)]
            case 'D':
                return PlayNotes[6 + ((octave - 2) * 12)]
            case 'D#' || 'Eb':
                return PlayNotes[7 + ((octave - 2) * 12)]
            case 'E' || 'Fb':
                return PlayNotes[8 + ((octave - 2) * 12)]
            case 'F' || 'Eb':
                return PlayNotes[9 + ((octave - 2) * 12)]
            case 'F#' || 'Gb':
                return PlayNotes[10 + ((octave - 2) * 12)]
            case 'G':
                return PlayNotes[11 + ((octave - 2) * 12)]
        }
    }

    const [play, { stop }] = useSound('Gb7.mp3')

    return (
        <button className={Styles.testDiv} onClick={() => {
            if (playing) {
                setPlaying(!playing)
                return
            }
            notes.map((note) => {
                const noteAudio = getAudioFunction(note.note, 2)
                // window.setTimeout(() => {
                //     noteAudio[1].stop()
                // }, 1000)
                noteAudio[0]()
            })
        }}> Click for Sound </button>
    )
}

export default AudioPlayer
