"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCart,
  removeItem,
  changeQuantity,
} from '@/components/redax/cartSlice';

const ShoppingCart = () => {
  const dispatch = useDispatch();

  const { items, status } = useSelector(state => state.cart);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // שליפת סל קניות מהשרת רק אם משתמש מחובר
  useEffect(() => {
    if ( isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [isAuthenticated, dispatch]);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleBuyNow = () => {
    const message = encodeURIComponent(
      `היי הגעתי דרך האתר ואני מעוניין/ת לקנות את המוצרים הבאים:\n` +
      items.map(p => `- ${p.name} x${p.quantity}`).join('\n') +
      `\n\nסה״כ: ${totalPrice} ₪`
    );

    window.open(
      `https://wa.me/972539342613?text=${message}`,
      '_blank'
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative" >


        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          סל הקניות שלי 🛒
        </h2>

        {/* Loading */}
        {status === 'loading' && (
          <p className="text-center text-gray-500">
            טוען סל קניות...
          </p>
        )}

        {/* Empty cart */}
        {status === 'idle' && items.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-semibold">
              הסל שלך ריק
            </p>
            <p className="text-sm mt-1">
              הוסף מוצרים והם יופיעו כאן
            </p>
          </div>
        )}

        {/* Cart items */}
        {items.length > 0 && (
          <>
            <ul className="space-y-3 max-h-80 overflow-y-auto">
              {items.map(item => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border rounded-xl p-3"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.price} ₪
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        dispatch(changeQuantity({ id: item.id, delta: -1 }))
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      −
                    </button>

                    <span className="w-6 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        dispatch(changeQuantity({ id: item.id, delta: 1 }))
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Summary */}
            <div className="mt-4 border-t pt-4 flex justify-between font-semibold">
              <span>סה״כ לתשלום</span>
              <span>{totalPrice} ₪</span>
            </div>

            {/* Buy */}
            <button
              onClick={handleBuyNow}
              className="mt-5 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold"
            >
              קנה עכשיו
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
