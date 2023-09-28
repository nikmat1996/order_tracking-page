import { useEffect, useState } from "react";

const data = [
  {
    url: "https://cdn.shopify.com/s/files/1/0829/5805/7771/products/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1694504920",
    name: 'The Complete Snowboard',
    price: '$98.00'
  },
  {
    url: "//cdn.shopify.com/s/files/1/0829/5805/7771/products/Main_0a4e9096-021a-4c1e-8750-24b233166a12.jpg?v=1694504920",
    name: 'The Multi-location Snowboard',
    price: '$102.00'
  },{
    url: "//cdn.shopify.com/s/files/1/0829/5805/7771/products/Main_b13ad453-477c-4ed1-9b43-81f3345adfd6.jpg?v=1694504923",
    name: 'The Collection Snowboard: Liquid',
    price: '$105.00'
  },{
    url: "//cdn.shopify.com/s/files/1/0829/5805/7771/products/Main_9129b69a-0c7b-4f66-b6cf-c4222f18028a.jpg?v=1694504921",
    name: 'The Multi-managed Snowboard',
    price: '$88.00'
  },{
    url: "	https://cdn.shopify.com/s/files/1/0829/5805/7771/products/snowboard_sky.png?v=1694504920",
    name: 'The Compare at Price Snowboard',
    price: '$110.00'
  },{
    url: "https://cdn.shopify.com/s/files/1/0829/5805/7771/products/Main_0a40b01b-5021-48c1-80d1-aa8ab4876d3d.jpg?v=1694504920",
    name: 'The Collection Snowboard: Hydrogen',
    price: '$84.00'
  }
]
const ThemeOne = () => {
  return (
    <div className="themeOne themePage">
      <section></section>
      <section></section>
      <ThemeOneUpsell />
    </div>
  )
}

export default ThemeOne

const ThemeOneUpsell = () => {

  const [pos, setPos] = useState(0);

  useEffect(() => {
    const animation = setInterval(
      () => setPos((curVal) => curVal < 2 ? curVal + 1 : 0)
      , 2000)
  
    return () => {
      clearInterval(animation)
    }
  }, [])
  
  
  const CARD_STYLE = {
    transform: `translateX(calc(${pos} *-100%))`
  }
  return (
    <section className="t1Upsell">
      <h2>You may also like...</h2>
      <div className="t1Upsell--slideWrap">
        {
          data.map(item => <div key={item.url} style={CARD_STYLE}><Card {...item} /></div>)
        }
      </div>
    </section>
  )
}

type CardProps = {
  url: string,
  name: string,
  price: string
}

const Card = ({url, name, price}: CardProps) => {
  return (
    <div className="UpsellCard">
      <div>
        <img src={url} />
      </div>
      <p>{name}</p>
      <p>{price}</p>
    </div>
  )
}
