import React, { useEffect, useState } from "react";
import useSound from 'use-sound'
import { PlayFunction } from "use-sound/dist/types";
import { getChordNotes } from "../Chord/Chord";
import Styles from './AudioPlayer.module.css'

interface AudioPlayerProps {
    notes: any[] | undefined
    chords: any[] | undefined
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
    const { notes, chords, shouldAllowPlay } = props
    const [playing, setPlaying] = useState(false)

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

    const [Ab3, Ab3Stop] = useSound('/Audio/Ab3.mp3')
    const [A3, A3Stop] = useSound('/Audio/A3.mp3')
    const [Bb3, Bb3Stop] = useSound('/Audio/Bb3.mp3')
    const [B3, B3Stop] = useSound('/Audio/B3.mp3')
    const [C3, C3Stop] = useSound('/Audio/C3.mp3')
    const [Db3, Db3Stop] = useSound('/Audio/Db3.mp3')
    const [D3, D3Stop] = useSound('/Audio/D3.mp3')
    const [Eb3, Eb3Stop] = useSound('/Audio/Eb3.mp3')
    const [E3, E3Stop] = useSound('/Audio/E3.mp3')
    const [F3, F3Stop] = useSound('/Audio/F3.mp3')
    const [Gb3, Gb3Stop] = useSound('/Audio/Gb3.mp3')
    const [G3, G3Stop] = useSound('/Audio/G3.mp3')

    const [Ab4, Ab4Stop] = useSound('/Audio/Ab4.mp3')
    const [A4, A4Stop] = useSound('/Audio/A4.mp3')
    const [Bb4, Bb4Stop] = useSound('/Audio/Bb4.mp3')
    const [B4, B4Stop] = useSound('/Audio/B4.mp3')
    const [C4, C4Stop] = useSound('/Audio/C4.mp3')
    const [Db4, Db4Stop] = useSound('/Audio/Db4.mp3')
    const [D4, D4Stop] = useSound('/Audio/D4.mp3')
    const [Eb4, Eb4Stop] = useSound('/Audio/Eb4.mp3')
    const [E4, E4Stop] = useSound('/Audio/E4.mp3')
    const [F4, F4Stop] = useSound('/Audio/F4.mp3')
    const [Gb4, Gb4Stop] = useSound('/Audio/Gb4.mp3')
    const [G4, G4Stop] = useSound('/Audio/G4.mp3')

    const [Ab5, Ab5Stop] = useSound('/Audio/Ab5.mp3')
    const [A5, A5Stop] = useSound('/Audio/A5.mp3')
    const [Bb5, Bb5Stop] = useSound('/Audio/Bb5.mp3')
    const [B5, B5Stop] = useSound('/Audio/B5.mp3')
    const [C5, C5Stop] = useSound('/Audio/C5.mp3')
    const [Db5, Db5Stop] = useSound('/Audio/Db5.mp3')
    const [D5, D5Stop] = useSound('/Audio/D5.mp3')
    const [Eb5, Eb5Stop] = useSound('/Audio/Eb5.mp3')
    const [E5, E5Stop] = useSound('/Audio/E5.mp3')
    const [F5, F5Stop] = useSound('/Audio/F5.mp3')
    const [Gb5, Gb5Stop] = useSound('/Audio/Gb5.mp3')
    const [G5, G5Stop] = useSound('/Audio/G5.mp3')

    const [Ab6, Ab6Stop] = useSound('/Audio/Ab6.mp3')
    const [A6, A6Stop] = useSound('/Audio/A6.mp3')
    const [Bb6, Bb6Stop] = useSound('/Audio/Bb6.mp3')
    const [B6, B6Stop] = useSound('/Audio/B6.mp3')
    const [C6, C6Stop] = useSound('/Audio/C6.mp3')
    const [Db6, Db6Stop] = useSound('/Audio/Db6.mp3')
    const [D6, D6Stop] = useSound('/Audio/D6.mp3')
    const [Eb6, Eb6Stop] = useSound('/Audio/Eb6.mp3')
    const [E6, E6Stop] = useSound('/Audio/E6.mp3')
    const [F6, F6Stop] = useSound('/Audio/F6.mp3')
    const [Gb6, Gb6Stop] = useSound('/Audio/Gb6.mp3')
    const [G6, G6Stop] = useSound('/Audio/G6.mp3')

    const [Ab7, Ab7Stop] = useSound('/Audio/Ab7.mp3')
    const [A7, A7Stop] = useSound('/Audio/A7.mp3')
    const [Bb7, Bb7Stop] = useSound('/Audio/Bb7.mp3')
    const [B7, B7Stop] = useSound('/Audio/B7.mp3')
    const [C7, C7Stop] = useSound('/Audio/C7.mp3')
    const [Db7, Db7Stop] = useSound('/Audio/Db7.mp3')
    const [D7, D7Stop] = useSound('/Audio/D7.mp3')
    const [Eb7, Eb7Stop] = useSound('/Audio/Eb7.mp3')
    const [E7, E7Stop] = useSound('/Audio/E7.mp3')
    const [F7, F7Stop] = useSound('/Audio/F7.mp3')
    const [Gb7, Gb7Stop] = useSound('/Audio/Gb7.mp3')
    const [G7, G7Stop] = useSound('/Audio/G7.mp3')
    // const PlayableNotes = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G']
    const PlayNotes: any[] =
        [
            [Ab2, Ab2Stop], [A2, A2Stop], [Bb2, Bb2Stop], [B2, B2Stop], [C2, C2Stop], [Db2, Db2Stop], [D2, D2Stop], [Eb2, Eb2Stop], [E2, E2Stop], [F2, F2Stop], [Gb2, Gb2Stop], [G2, G2Stop],
            [Ab3, Ab3Stop], [A3, A3Stop], [Bb3, Bb3Stop], [B3, B3Stop], [C3, C3Stop], [Db3, Db3Stop], [D3, D3Stop], [Eb3, Eb3Stop], [E3, E3Stop], [F3, F3Stop], [Gb3, Gb3Stop], [G3, G3Stop],
            [Ab4, Ab4Stop], [A4, A4Stop], [Bb4, Bb4Stop], [B4, B4Stop], [C4, C4Stop], [Db4, Db4Stop], [D4, D4Stop], [Eb4, Eb4Stop], [E4, E4Stop], [F4, F4Stop], [Gb4, Gb4Stop], [G4, G4Stop],
            [Ab5, Ab5Stop], [A5, A5Stop], [Bb5, Bb5Stop], [B5, B5Stop], [C5, C5Stop], [Db5, Db5Stop], [D5, D5Stop], [Eb5, Eb5Stop], [E5, E5Stop], [F5, F5Stop], [Gb5, Gb5Stop], [G5, G5Stop],
            [Ab6, Ab6Stop], [A6, A6Stop], [Bb6, Bb6Stop], [B6, B6Stop], [C6, C6Stop], [Db6, Db6Stop], [D6, D6Stop], [Eb6, Eb6Stop], [E6, E6Stop], [F6, F6Stop], [Gb6, Gb6Stop], [G6, G6Stop],
            [Ab7, Ab7Stop], [A7, A7Stop], [Bb7, Bb7Stop], [B7, B7Stop], [C7, C7Stop], [Db7, Db7Stop], [D7, D7Stop], [Eb7, Eb7Stop], [E7, E7Stop], [F7, F7Stop], [Gb7, Gb7Stop], [G7, G7Stop]
        ]

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

    return (
        <div className={Styles.sound} onClick={() => {
            if (!notes || !chords) {
                return
            }
            if (playing) {
                setPlaying(false)
                return
            }
            setPlaying(true)
            let currentDelayMs = 0
            notes.map((set, index) => {
                console.log(index)
                const chordNotes = getChordNotes(chords[index].root, chords[index].octave, chords[index].duration, 1, chords[index].quality, '')
                console.log(chordNotes)
                chordNotes.map((note) => {
                    const noteAudio = getAudioFunction(note.note, note.octave)
                    window.setTimeout(() => {
                        noteAudio[0]()
                    }, currentDelayMs)
                    window.setTimeout(() => {
                        noteAudio[1].stop()
                    }, currentDelayMs + note.duration * 4000)
                })
                set.map((note: any) => {
                    const noteAudio = getAudioFunction(note.root, note.octave)
                    window.setTimeout(() => {
                        noteAudio[0]()
                    }, currentDelayMs)
                    window.setTimeout(() => {
                        noteAudio[1].stop()
                    }, currentDelayMs + note.duration * 4000)
                    currentDelayMs = currentDelayMs + note.duration * 4000
                })
            })
        }}>
            <p className={shouldAllowPlay ? Styles.soundButton : Styles.soundButtonDisabled}>
                {playing ? '🔊' : '🔇'}
            </p>
        </div>
    )
}

export default AudioPlayer
