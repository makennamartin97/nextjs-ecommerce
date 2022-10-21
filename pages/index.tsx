import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Stripe from 'stripe'
import { PERMANENT_REDIRECT_STATUS } from 'next/dist/shared/lib/constants'
import Card from '../components/Card'
import Navbar from "../components/Navbar";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
    apiVersion:'2022-08-01',
  });

  const response = await stripe.prices.list({
    limit:10,
    expand:['data.product']
  })

  const prices = response.data.filter(price =>{
    return price.active;
  })

  return {
    props:{
      prices
    }
  }
}

type Props = {
  prices:Stripe.Price[]
}




const Home: NextPage<Props> = ({prices}) => {
  return (
    <main className="bg-gray-100 min-h-screen">
      <Navbar/>
      <div className="max-w-5xl mx-auto py-8">
        <div className="flex items-center justify-between border-b pb-3">
            <h1 className="font-semibold tracking-wide leading-10 text-xl lg:text-3xl">
                Shop Now
            </h1>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
        {prices.map(p=>(
          <Card price={p} key={p.id}/>
        ))}
        </div>
      </div>
      
    </main>
  )
}

export default Home
