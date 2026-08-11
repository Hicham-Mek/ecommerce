import React from 'react';
import EmptyState from '../components/common/EmptyState';

const Checkout = () => {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <EmptyState 
        title="Checkout Flow" 
        description="The checkout flow is currently handled directly from the cart for Cash on Delivery. This dedicated checkout page is under construction."
      />
    </div>
  );
};

export default Checkout;
