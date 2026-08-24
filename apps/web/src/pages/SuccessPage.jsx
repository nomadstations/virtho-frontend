import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { ROUTES } from '@/constants';

const SuccessPage = () => {
  return (
    <>
      <Helmet>
        <title>Order Successful - Virtho Foundation</title>
      </Helmet>
      
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-20 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-lg border border-gray-100 text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-gray-600 mb-8 text-lg">Your order has been placed successfully. You will receive an email confirmation shortly.</p>
          <div className="flex flex-col gap-4">
            <Link to={ROUTES.MARKETPLACE}>
              <Button className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg">
                Continue Shopping
              </Button>
            </Link>
            <Link to={ROUTES.HOME}>
              <Button variant="outline" className="w-full h-12 text-gray-600 font-semibold border-gray-200">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;