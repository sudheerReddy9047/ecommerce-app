import React from 'react';

const Order = (props) => {
    console.log('Order rendered')
    return (
        <div className='d-flex justify-content-between'>
            <div>{props.id} </div> 
            <button className='btn btn-danger btn-sm' onClick={props.onOrderDelete}>Delete</button>
        </div>
    );
}

export default Order;
