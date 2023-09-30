import { NavLink, Outlet, redirect, useNavigate, useOutletContext } from "react-router-dom";
import ThemeOneUpsell from "../components/ThemeOneUpsell";
import OrComponent from "../components/OrComponent";
import { useState } from "react";

type PackageContent = {
  name: string;
  quantity: number;
  url: string;
};

type ShipmentMessage = {
  time: string;
  message: string;
};

type ShipmentUpdate = {
  date: string;
  messages: ShipmentMessage[];
};

type Carrier = {
  name: string,
  url: string,
  carrier_id: string
}

type Order = {
  order_id: string;
  status: string;
  package_contents: PackageContent[];
  carrier: Carrier;
  updates: ShipmentUpdate[];
};

type Orders = Order[];

type ContextType = { orders: Orders }

const orders = [
  {
    order_id: 'TK1231039',
    status: 'Delivered',
    package_contents: [
      {
        name: 'Selling Plans Ski Wax',
        quantity: 2,
        url: 'https://cdn.shopify.com/s/files/1/0829/5805/7771/products/snowboard_wax.png?v=1694504923'
      }, {
        name: 'The Collection Snowboard: Liquid',
        quantity: 3,
        url: 'https://cdn.shopify.com/s/files/1/0829/5805/7771/products/Main_b13ad453-477c-4ed1-9b43-81f3345adfd6.jpg?v=1694504923'
      }],
    carrier: {name: 'Fedex', carrier_id: '1023333000', url: 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAk1BMVEUAAABHL5FHL5FHL5FHL5FHL5FHL5H////4spCjl8j84tX+9fHz8vjzeD1HL5FSO5f72MjRy+Po5fFpVaX7z7r6xayXisH1lWb0i1mMfLrc2Orp5vL0gUt0YqzxZSL97OP2nnRdSJ7ybi91Y62Ab7OupM+BcLTFvtyYisH60b72n3SdXXX5u566sdb1kF/lzMyMfbpQ1ZH/AAAAB3RSTlMA0BAw4HDw7PHCHgAAAhRJREFUeF7t2tlO6zAQgOG0tIyz72v3Hc7+/k93nJkipw1qilpbR0fzXyDDBZ+GYCSUsWTj6SjQ1Gg6trCXSaCxyQsar4HWXqUyngSam4ytaaC9qTXSj4ysDrCzn9iuoyjkOIOnNjv2kTd4em/XyBE0dLxCZjqQ2SWyAy3tLhBbD2IzwggjjDwWI4wwwggjjMTE3UYXgez7UhX9DwgjaoRBRAD1KNLETRdInobUcVsDcNojuo8R8OpQfpLGCllH2Dt+dEDmRthqGKEWHhJY0c4kCSwkRPWNDplE1niau3cji45YkEFdIxF9661zNnw0hhBVaMc0bqLIPgIlKeID+xpyAoBDi6QIpB5O1EPcOSrKGEYWtqymY5uay5PmSSGVwFbQVbK77wl6vfbQFnx2T5zt2cjhQcTuIaqcjAq+jGzsjzZ3TqLglRD5EJLQQ7gcupHGQSF+hTkALhrdn1e29X+U6wEEUrqR4NU4EyLhz/hw87dLPXk/9/1M+rcQBJEJaYab94SM+bpzT6pouXRENIBAcfHIk8EbP3ehVIocQ4hyaBIalDpIs9kQEKbXyC8aQF0X3wXIt8LxK/gE8eK2BM4lRSqFtKAveLZkwtprYtnvSPWOh9XVX+GsrITL/zr8owgjjDDCCCOMMMIII0ZeMJt4VW7kpb+B9YU/RhcxjKyUGFmOMbLmY2RhycTqlZklMiPrcH8B/beOPcPt7jMAAAAASUVORK5CYII='},
    updates: [
      {
        date: 'Aug 9',
        messages: [
          {
            time: '05:39 am',
            message: 'Shipment information sent to FedEx '
          }
        ]
      }, {
        date: 'Aug 10',
        messages: [
          {
            time: '12:00 am',
            message: 'AUSTELL, GA, AUSTELL, GA, Picked up'
          }, {
            time: '03:20 pm',
            message: 'AUSTELL, GA, AUSTELL, GA, Arrived at FedEx location'
          },
        ]
      }, {
        date: 'Aug 11',
        messages: [
          {
            time: '10:11 am',
            message: 'AUSTELL, GA, AUSTELL, GA, Left FedEx origin facility'
          }, {
            time: '09:13 pm',
            message: 'CHAMPAIGN, IL, CHAMPAIGN, IL, In transit'
          },
        ]
      }, {
        date: 'Aug 12',
        messages: [
          {
            time: '09:52 am',
            message: 'CHAMPAIGN, IL, CHAMPAIGN, IL, In transit'
          }, {
            time: '03:04 pm',
            message: 'CHAMPAIGN, IL, CHAMPAIGN, IL, Arrived at FedEx location'
          }, {
            time: '11:21 pm',
            message: 'CHAMPAIGN, IL, CHAMPAIGN, IL, Departed FedEx location'
          },
        ]
      }, {
        date: 'Aug 13',
        messages: [
          {
            time: '07:27 am',
            message: 'NILES, THE, NILES, IL, At local FedEx facility'
          }, {
            time: '07:29 am',
            message: 'NILES, THE, NILES, IL, Arrived at FedEx location'
          }, {
            time: '07:33 am',
            message: 'NILES, THE, NILES, IL, On FedEx vehicle for delivery'
          }, {
            time: '01:36 pm',
            message: 'NILES, THE, NILES, IL, Delivery exception, Future delivery requested'
          }, {
            time: '07:26 pm',
            message: 'NILES, THE, NILES, IL, Arrived at FedEx location'
          },
        ]
      }, {
        date: 'Aug 14',
        messages: [
          {
            time: '05:21 am',
            message: 'NILES, THE, NILES, IL, At local FedEx facility'
          }, {
            time: '05:28 am',
            message: 'NILES, THE, NILES, IL, On FedEx vehicle for delivery'
          },
        ]
      }, {
        date: 'Aug 15',
        messages: [
          {
            time: '05:44 am',
            message: 'NILES, THE, NILES, IL, Arrived at FedEx location'
          }, {
            time: '06:02 am',
            message: 'NILES, THE, NILES, IL, On FedEx vehicle for delivery'
          },
        ]
      }, {
        date: 'Aug 16',
        messages: [
          {
            time: '04:38 am',
            message: 'NILES, THE, NILES, IL, At local FedEx facility'
          }, {
            time: '04:40 am',
            message: 'NILES, THE, NILES, IL, Arrived at FedEx location'
          }, {
            time: '04:44 am',
            message: 'NILES, THE, NILES, IL, On FedEx vehicle for delivery'
          }, {
            time: '11:51 am',
            message: 'Evanston, IL, Evanston, IL, Delivered, Left at front door. Signature Service not requested.'
          }
        ]
      }
    ]
  },{
    order_id: 'TK1231040',
    status: 'In Transit',
    package_contents: [
      {
        name: 'Selling Plans Ski Wax',
        quantity: 2,
        url: 'https://cdn.shopify.com/s/files/1/0829/5805/7771/products/snowboard_wax.png?v=1694504923'
      }, {
        name: 'The Collection Snowboard: Liquid',
        quantity: 3,
        url: 'https://cdn.shopify.com/s/files/1/0829/5805/7771/products/Main_b13ad453-477c-4ed1-9b43-81f3345adfd6.jpg?v=1694504923'
      }],
    carrier: {name: 'Fedex', carrier_id: '1023333000', url: 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAk1BMVEUAAABHL5FHL5FHL5FHL5FHL5FHL5H////4spCjl8j84tX+9fHz8vjzeD1HL5FSO5f72MjRy+Po5fFpVaX7z7r6xayXisH1lWb0i1mMfLrc2Orp5vL0gUt0YqzxZSL97OP2nnRdSJ7ybi91Y62Ab7OupM+BcLTFvtyYisH60b72n3SdXXX5u566sdb1kF/lzMyMfbpQ1ZH/AAAAB3RSTlMA0BAw4HDw7PHCHgAAAhRJREFUeF7t2tlO6zAQgOG0tIyz72v3Hc7+/k93nJkipw1qilpbR0fzXyDDBZ+GYCSUsWTj6SjQ1Gg6trCXSaCxyQsar4HWXqUyngSam4ytaaC9qTXSj4ysDrCzn9iuoyjkOIOnNjv2kTd4em/XyBE0dLxCZjqQ2SWyAy3tLhBbD2IzwggjjDwWI4wwwggjjMTE3UYXgez7UhX9DwgjaoRBRAD1KNLETRdInobUcVsDcNojuo8R8OpQfpLGCllH2Dt+dEDmRthqGKEWHhJY0c4kCSwkRPWNDplE1niau3cji45YkEFdIxF9661zNnw0hhBVaMc0bqLIPgIlKeID+xpyAoBDi6QIpB5O1EPcOSrKGEYWtqymY5uay5PmSSGVwFbQVbK77wl6vfbQFnx2T5zt2cjhQcTuIaqcjAq+jGzsjzZ3TqLglRD5EJLQQ7gcupHGQSF+hTkALhrdn1e29X+U6wEEUrqR4NU4EyLhz/hw87dLPXk/9/1M+rcQBJEJaYab94SM+bpzT6pouXRENIBAcfHIk8EbP3ehVIocQ4hyaBIalDpIs9kQEKbXyC8aQF0X3wXIt8LxK/gE8eK2BM4lRSqFtKAveLZkwtprYtnvSPWOh9XVX+GsrITL/zr8owgjjDDCCCOMMMIII0ZeMJt4VW7kpb+B9YU/RhcxjKyUGFmOMbLmY2RhycTqlZklMiPrcH8B/beOPcPt7jMAAAAASUVORK5CYII='},
    updates: [
      {
        date: 'Aug 9',
        messages: [
          {
            time: '05:39 am',
            message: 'Shipment information sent to FedEx '
          }
        ]
      }, {
        date: 'Aug 10',
        messages: [
          {
            time: '12:00 am',
            message: 'AUSTELL, GA, AUSTELL, GA, Picked up'
          }, {
            time: '03:20 pm',
            message: 'AUSTELL, GA, AUSTELL, GA, Arrived at FedEx location'
          },
        ]
      }, {
        date: 'Aug 11',
        messages: [
          {
            time: '10:11 am',
            message: 'AUSTELL, GA, AUSTELL, GA, Left FedEx origin facility'
          }, {
            time: '09:13 pm',
            message: 'CHAMPAIGN, IL, CHAMPAIGN, IL, In transit'
          },
        ]
      }, {
        date: 'Aug 12',
        messages: [
          {
            time: '09:52 am',
            message: 'CHAMPAIGN, IL, CHAMPAIGN, IL, In transit'
          }, {
            time: '03:04 pm',
            message: 'CHAMPAIGN, IL, CHAMPAIGN, IL, Arrived at FedEx location'
          }, {
            time: '11:21 pm',
            message: 'CHAMPAIGN, IL, CHAMPAIGN, IL, Departed FedEx location'
          },
        ]
      }, {
        date: 'Aug 13',
        messages: [
          {
            time: '07:27 am',
            message: 'NILES, THE, NILES, IL, At local FedEx facility'
          }, {
            time: '07:29 am',
            message: 'NILES, THE, NILES, IL, Arrived at FedEx location'
          }, {
            time: '07:33 am',
            message: 'NILES, THE, NILES, IL, On FedEx vehicle for delivery'
          }, {
            time: '01:36 pm',
            message: 'NILES, THE, NILES, IL, Delivery exception, Future delivery requested'
          }, {
            time: '07:26 pm',
            message: 'NILES, THE, NILES, IL, Arrived at FedEx location'
          },
        ]
      }, 
    ]
  },
]

const ThemeOne = () => {

  const [inputVal, setInputVal] = useState("");
  const navigate = useNavigate()

  function handleClick (){
    console.log("first")
    navigate(inputVal)
    setInputVal("")
  }
  
  const activeClassname = ({isActive}: {isActive: Boolean}) => isActive ? "recentOrders_active" : "";


  return (
    <div className="themeOne themePage">
      <section className="trackingSection">
        <h1>Track Your Order</h1>
        <div>
          <div>
            <h2>Recent Orders</h2>
            {orders.map(order => (
              <NavLink to={order.order_id} className={activeClassname}><div className="recentOrders">{order.order_id}</div></NavLink>
            ))}

          </div>
          <div className="trackingSection__input--wrap">
            <h2>Enter Tracking Number</h2>
            <input  name="tracking_no" id="tracking_no" placeholder="tracking number" onChange={(e) => setInputVal(e.target.value)} value={inputVal}/>
            <button type="button" onClick={handleClick}>Search</button>
          </div>
          <OrComponent />
        </div>
      </section>
      <Outlet context={{ orders }} />
      <ThemeOneUpsell />
    </div>
  )
}

export default ThemeOne

export function useOrders() {
  return useOutletContext<ContextType>();
}