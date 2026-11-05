import React from 'react';
import Footer from './footer';

const Footers = () => {
    const data = [
        {
            id: 1,
            clase: "footer_nav",
            desc1: "Facebook",
            desc2: "Instagram",
            desc3: "Linkedin",
        },
    ];

    return (
        <>
        {data.map(({ id, clase, desc1, desc2, desc3 }) => {
            return (
                <Footer 
                    key={id}
                    clase={clase} 
                    desc1={desc1} 
                    desc2={desc2} 
                    desc3={desc3} 
                />
            );
        })}
        </>
    );
}

export default Footers;