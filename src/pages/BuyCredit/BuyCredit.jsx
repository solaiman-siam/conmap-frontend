import React from 'react'
import Container from "../../Shared/Container";
import Creditcards from '../../Components/Reusablecomponents/BuyCredit/Creditcards';

const BuyCredit = () => {
  return (
    <section className='py-[100px]'>
      <Container className='px-[130px]'>
            <h3 className='text-[#333] text-[48px] font-nunito font-semibold text-center'>Buy Credit</h3>
            <h5 className='text-[24px] font-nunito font-normal text-center text-[#252525] pt-1 pb-10'>Choose a Package</h5>
            <div className="grid grid-cols-3 gap-x-9">
                <Creditcards price='$10 Credit' bonus="Standard package with no bonus"/>
                <Creditcards price='$100 Credit' bonus="+$5 Bonus"/>
                <Creditcards price='$1000 Credit' bonus="+$15 Bonus"/>
            </div>
      </Container>
    </section>
  )
}

export default BuyCredit
