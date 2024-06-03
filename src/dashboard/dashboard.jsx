import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';

const Dashboard = () => {
    const userContext = useContext(UserContext);
    let { user, setuser } = userContext;
    let [orders, setorders] = useState([]);
    let [completedOrders, setcompletedOrders] = useState([]);
    let [inProgressOrders, setinProgressOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/orders?userId=' + user.info.id).then(async r => {
            if (r.ok) {
                const res = await r.json();
                setorders(res);
                setcompletedOrders(res.filter((i) => i.paymentCompleted));
                setinProgressOrders(res.filter((i) => !i.paymentCompleted));
            }
        })
    }, [user.info.id]);


    return (
        <React.Fragment>
            {
                orders.length ? <div className='row mx-0 mt-2'>
                    {
                        completedOrders.length ? <div className='col-lg-6'>
                            <div className='card'>
                                <div className='card-header'>Previous Orders</div>
                                <div className='card-body'>
                                    <ul>
                                        {completedOrders.map((item, ind) => <li key={ind}>{item.id}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div> : ''
                    }
                    {

                        inProgressOrders.length ? <div className='col-lg-6'>
                            <div className='card'>
                                <div className='card-header'>Card Items</div>
                                <div className='card-body'>
                                    <ul>
                                        {inProgressOrders.map((item, i) => <li key={i}>{item.id}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div> : ''
                    }
                </div> : ''
            }
        </React.Fragment>
    );
}

export default Dashboard;
