import type { NextPage } from 'next'
import MachineMusician from '../src/MachineMusician/MachineMusician'
import Note from '../src/Note'
import { getMajorThird } from '../src/Note/Note'

const Home: NextPage = () => {
  return (
    <MachineMusician />
  )
}

export default Home
