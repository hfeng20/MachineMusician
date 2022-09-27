import React from "react";
import Styles from './StaffHeader.module.css'

interface StaffHeaderProps {
    key?: string
    timeSignature?: string
}

const StaffHeader: React.FC<StaffHeaderProps> = (props) => {
    const { key, timeSignature } = props
    return (
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
            <div className={Styles.superContainer}>
                <div className={Styles.container}>
                    <img className={Styles.trebleImg} src={'trebleclef.png'} />
                    <img className={Styles.bassImg} src={'bassclef.png'} />
                </div>
                <div className={Styles.container}>
                    <img className={Styles.trebleTimeSig} src={'timesig.png'} />
                    <img className={Styles.bassTimeSig} src={'timesig.png'} />
                </div>
            </div>
        </div>
    )
}

export default StaffHeader