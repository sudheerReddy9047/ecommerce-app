import React, { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import Order from '../Order/Order';

const Dashboard = () => {
    const userContext = useContext(UserContext);
    let { user, setuser } = userContext;
    let [orders, setorders] = useState([]);

    const loadProducts = useCallback(() => fetch('http://localhost:5000/orders?userId=' + (user.info?.id || 1)).then(async r => {
        if (r.ok) {
            const res = await r.json();
            setorders(res);
        }
    }), [user.info])
    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const onOrderDelete = useCallback(async (id, userId, productId, quantity) => {
        const item = { id, userId, productId, quantity }
        const productToUpdate = JSON.parse(JSON.stringify(item));
        productToUpdate.paymentCompleted = true;
        fetch('http://localhost:5000/orders/' + productToUpdate.id, {
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
    }, [loadProducts])
    return (
        <React.Fragment>
            {
                orders.length ? <div className='row mx-0 mt-2'>
                    {
                        orders.filter(r => r.paymentCompleted).length ? <div className='col-lg-6'>
                            <div className='card'>
                                <div className='card-header'>Previous Orders</div>
                                <div className='card-body'>
                                    <ul>
                                        {orders.filter(r => r.paymentCompleted).map((item, ind) => <li key={item.id}><Order id={item.id} userId={item.userId}
                                            productId={item.productId} quantity={item.quantity}></Order></li>)}
                                    </ul>
                                </div>
                            </div>
                        </div> : ''
                    }
                    {

                        orders.filter(r => !r.paymentCompleted).length ? <div className='col-lg-6'>
                            <div className='card'>
                                <div className='card-header'>Card Items</div>
                                <div className='card-body'>
                                    <ul>
                                        {orders.filter(r => !r.paymentCompleted).map((item, i) => <li key={item.id}><Order id={item.id} userId={item.userId}
                                            productId={item.productId} quantity={item.quantity} onOrderDelete={onOrderDelete}></Order></li>)}
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
