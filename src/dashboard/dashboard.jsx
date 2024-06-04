import React, { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import Order from '../Order/Order';

const Dashboard = () => {
    const userContext = useContext(UserContext);
    let { user, setuser } = userContext;
    let [orders, setorders] = useState([]);
    let [completedOrders, setcompletedOrders] = useState([]);
    let [inProgressOrders, setinProgressOrders] = useState([]);

    const loadProducts = useCallback(() => fetch('http://localhost:5000/orders?userId=' + (user.info?.id || 1)).then(async r => {
        if (r.ok) {
            const res = await r.json();
            setorders(res);
            setcompletedOrders(res.filter((i) => i.paymentCompleted));
            setinProgressOrders(res.filter((i) => !i.paymentCompleted));
        }
    }), [user.info])
    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const onOrderDelete = (item) => {
        const productToUpdate = JSON.parse(JSON.stringify(item));
        productToUpdate.paymentCompleted = true;
        fetch('http://localhost:5000/orders?orderId=' + productToUpdate.orderId, {
            method: 'PUT',
            body: JSON.stringify(productToUpdate),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(r => {
            if (r.ok) {
                loadProducts();
            }
        })
    }
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
                                        {completedOrders.map((item, ind) => <li key={ind}><Order id={item.id}></Order></li>)}
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
                                        {inProgressOrders.map((item, i) => <li key={i}><Order id={item.id} onOrderDelete={() => onOrderDelete(item)}></Order></li>)}
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
