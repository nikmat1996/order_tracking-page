import { useParams } from "react-router-dom"
import { useOrders } from "../pages/ThemeOne"
import { useEffect, useRef } from "react"
function OrderDetails() {

    const { orders } = useOrders()
    const { orderId }  = useParams()
    console.log(orderId)
    const order = orders.find(order => order.order_id === orderId)
    return (
        order 
        ? 
        <section className="orderDetails_section">
            <h1 className="orderDetails_heading">Order : {orderId}</h1>
            <h2 className="orderDetails_heading2">Status : {order.status}</h2>
            <Bar status={order.status}/>
            <div className="flex">
                <div className="orderDetails_messageWrap">
                    <h2>Shipping Details</h2>
                    {
                        [...order.updates].reverse().map((day) => {
                            return (
                                <div className="message_container">
                                    <h3>{day.date}</h3>
                                    {[...day.messages].reverse().map(message => (
                                        <div className="eachMessage"><span>{message.time}</span>{message.message}</div>
                                    ))}
                                
                                </div>
                            )
                        })
                    }
                </div>
                <div className="orderDetails_packageWrap">
                    <h2>Current Location</h2>
                    <div className="message_container">{order.updates.slice(-1)[0].messages.slice(-1)[0].message}</div>
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15743.333748717068!2d76.5556893076662!3d9.436002848632652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06274dbf92896f%3A0x19497c8f40174a63!2sPADMA%20CAFE!5e0!3m2!1sen!2sin!4v1696055401844!5m2!1sen!2sin" width="600" height="450"   loading="lazy" ></iframe> */}
                    <h2>Package Contents</h2>
                    <div className="message_container">{order.package_contents.map(packageDet => (
                        <div className="packageWrap">
                            <img src={packageDet.url} />
                            <p><span>{packageDet.quantity} * </span>{packageDet.name}</p>
                        </div>
                    ))}</div>
                    <h2>Carrier</h2>
                    <div className="message_container">
                        <div className="packageWrap">
                            <img src={order.carrier.url} />
                            <p>{order.carrier.name} <br />
                            {order.carrier.carrier_id}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
        :
        <h1 className="invalidMessage">Invalid Order</h1>
    )
}

export default OrderDetails

const Icon = () => (
    <svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1480"  width="20" height="20" ><path d="M358.4 921.6a51.0464 51.0464 0 0 1-36.1984-15.0016l-307.2-307.2a51.2 51.2 0 0 1 72.3968-72.3968l268.0832 268.0832 578.4576-674.816a51.2 51.2 0 0 1 77.7216 66.56l-614.4 716.8a51.2512 51.2512 0 0 1-36.9152 17.92L358.4 921.6z" p-id="1481" fill="#ffffff"></path></svg>
)

const Bar = ({status}: { status: string}) => {
    console.log(status)
    const cache: Record<string, number> = {
        "Ordered": 0,
        "Order Ready": 1,
        "In Transit": 2,
        "Out for Delivery": 3,
        "Delivered": 4
    }
    const myRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        addGreen(cache[status])
    }, [status])
    

    

    function addGreen(num : number) {
        console.log(num)
        for(let i = 0; i <= 8; i++ ){
            if(i <= 2*num)
                myRef.current?.children[i].classList.add("reached")
            else
                myRef.current?.children[i].classList.remove("reached")

        }
    }
    return (
        <div ref={myRef} className="orderDetails_barWrap">
            <div className="round roundOne"><Icon /></div>
            <div className="rod"></div>
            <div className="round roundTwo"><Icon /></div>
            <div className="rod"></div>
            <div className="round roundThree"><Icon /></div>
            <div className="rod"></div>
            <div className="round roundFour"><Icon /></div>
            <div className="rod"></div>
            <div className="round roundFive"><Icon /></div>
        </div>
    )
}