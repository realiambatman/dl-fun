import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, CreditCard, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cartItems, getTotalPrice } = useCart();
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  
  // Format price with currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR' 
    }).format(price);
  };
  
  // Calculate order summary
  const subtotal = getTotalPrice();
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = Math.round(subtotal * 0.07 * 100) / 100;
  const total = subtotal + shipping + tax;
  
  const goToStep = (step: number) => {
    if (step <= activeStep + 1) {
      setActiveStep(step);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link to="/cart" className="flex items-center text-yellow-600 hover:text-yellow-700">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold mx-auto">Checkout</h1>
      </div>
      
      {/* Progress steps */}
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
        
        {[1, 2, 3].map((step) => (
          <button 
            key={step}
            className={`relative z-10 flex flex-col items-center ${
              step <= activeStep ? 'cursor-pointer' : 'cursor-not-allowed'
            }`}
            onClick={() => goToStep(step)}
            disabled={step > activeStep + 1}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step < activeStep ? 'bg-green-500 text-white' : 
              step === activeStep ? 'bg-yellow-500 text-navy-900' : 
              'bg-gray-200 text-gray-500'
            }`}>
              {step}
            </div>
            <span className={`mt-2 font-medium ${
              step === activeStep ? 'text-navy-900' : 'text-gray-500'
            }`}>
              {step === 1 ? 'Shipping' : step === 2 ? 'Payment' : 'Review'}
            </span>
          </button>
        ))}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main checkout form */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            {/* Step 1: Shipping */}
            {activeStep === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name*
                    </label>
                    <input 
                      type="text" 
                      id="firstName" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name*
                    </label>
                    <input 
                      type="text" 
                      id="lastName" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address*
                  </label>
                  <input 
                    type="text" 
                    id="address" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
                    required
                  />
                  <input 
                    type="text" 
                    id="addressLine2" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <input 
                      type="text" 
                      id="city" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province*
                    </label>
                    <input 
                      type="text" 
                      id="state" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP/Postal Code*
                    </label>
                    <input 
                      type="text" 
                      id="zip" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country*
                  </label>
                  <select 
                    id="country" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
                
                <div className="flex items-center mb-6">
                  <input 
                    type="checkbox" 
                    id="saveAddress" 
                    className="mr-2 accent-yellow-500"
                  />
                  <label htmlFor="saveAddress" className="text-sm text-gray-700">
                    Save this address for future orders
                  </label>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    onClick={() => setActiveStep(2)}
                    className="btn btn-primary"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Payment */}
            {activeStep === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <input 
                      type="radio" 
                      id="credit-card" 
                      name="payment-method"
                      checked={paymentMethod === 'credit-card'}
                      onChange={() => setPaymentMethod('credit-card')}
                      className="mr-2 accent-yellow-500"
                    />
                    <label htmlFor="credit-card" className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-gray-700" />
                      <span>Credit / Debit Card</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <input 
                      type="radio" 
                      id="paypal" 
                      name="payment-method"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                      className="mr-2 accent-yellow-500"
                    />
                    <label htmlFor="paypal">PayPal</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="apple-pay" 
                      name="payment-method"
                      checked={paymentMethod === 'apple-pay'}
                      onChange={() => setPaymentMethod('apple-pay')}
                      className="mr-2 accent-yellow-500"
                    />
                    <label htmlFor="apple-pay">Apple Pay</label>
                  </div>
                </div>
                
                {paymentMethod === 'credit-card' && (
                  <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="mb-4">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card*
                      </label>
                      <input 
                        type="text" 
                        id="cardName" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number*
                      </label>
                      <input 
                        type="text" 
                        id="cardNumber" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="XXXX XXXX XXXX XXXX"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date*
                        </label>
                        <input 
                          type="text" 
                          id="expiry" 
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV*
                        </label>
                        <input 
                          type="text" 
                          id="cvv" 
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <button 
                    onClick={() => setActiveStep(1)}
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setActiveStep(3)}
                    className="btn btn-primary"
                  >
                    Continue to Review
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Review */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Review Your Order</h2>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <p className="text-gray-700">
                    John Doe<br />
                    123 Main Street<br />
                    Apt 4B<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p className="text-gray-700 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-gray-700" />
                    Credit Card ending in 1234
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Items ({cartItems.length})</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-200">
                        {cartItems.map((item) => (
                          <tr key={item.id}>
                            <td className="py-4 px-6">
                              <div className="flex items-center">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-12 h-12 object-cover rounded-md mr-4"
                                />
                                <div>
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-right font-medium">
                              {formatPrice(item.price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    onClick={() => setActiveStep(2)}
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                  <button 
                    className="btn btn-primary"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatPrice(tax)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold text-xl">{formatPrice(total)}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center text-sm text-gray-600 mb-2">
              <Lock className="h-4 w-4 mr-1" />
              Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;