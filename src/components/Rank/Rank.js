import React, { Fragment } from "react";

const Rank = ({ username, entries }) => {
    return (
        <>
            <div className="white f3">
                {`${username}, your current entries number is...`}
            </div>
            <div className="white f2">
                {entries}
            </div>
        </>

    );
}

export default Rank;