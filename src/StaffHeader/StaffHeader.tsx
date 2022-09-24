import React from "react";
import Styles from './StaffHeader.module.css'

interface StaffHeaderProps {
    key?: string
    timeSignature?: string
}

const StaffHeader: React.FC<StaffHeaderProps> = (props) => {
    const { key, timeSignature } = props
    return (
        <div className={Styles.container}>
            <img className={Styles.trebleImg} src={'trebleclef.png'} />
            <img className={Styles.bassImg} src={'bassclef.png'} />
        </div>
    )
}

export default StaffHeader