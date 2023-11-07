import React from 'react';
import './VisionSection.css'
import Title from "../Title/Title"

const VisionSection = () => {
    return (
        <section className='vision'>
            <div className='vision__box'>
                <Title 
                    titleText="Visão"
                    color='white'
                    potatoClass='vision__title'
                    />
                <p className="vision__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi minus eos doloremque fugiat officiis esse perferendis dolores, ducimus voluptate corrupti dolorem dolorum veritatis laboriosam ipsam quae recusandae hic eius ratione?Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, nam fugiat! Quas, saepe nisi! Ipsum eveniet laboriosam fugit sit? Suscipit ullam fugit laboriosam saepe placeat officiis iure, excepturi fugiat modi!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, expedita? Accusamus debitis reiciendis voluptas dolorum, pariatur aspernatur, suscipit similique perspiciatis fugiat asperiores iusto soluta rerum nesciunt quasi eum atque recusandae!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut veniam est eos! Nisi quo cupiditate quaerat. Dolorum recusandae doloribus non commodi quisquam sed, earum saepe blanditiis! Blanditiis similique id nesciunt.</p>
            </div>
        </section >
    );
};

export default VisionSection;