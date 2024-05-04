import { create } from 'zustand';
import { CartService } from '@/services/CartService';
import { CartStoreType } from '@/config/types/CartTypes';
import { StoreLocalStorage } from '@/config/storeLocalStorage';
import { debounce } from '@/lib/utils';

export const useCartStore = create<CartStoreType>((set) => ({
    cartItems: [],
    cartId: StoreLocalStorage.getStoredCartId(),

    addItemToCart: async (userId, cartItem) => {
        try {
            const data = await CartService.addItemToCart(userId, cartItem);
            set((state) => {
                // Ensure unique cart items by cartItemId
                const newCartItems = state.cartItems.some(item => item.cartItemId === data.cartItemId)
                    ? state.cartItems.map(item => item.cartItemId === data.cartItemId ? { ...item, ...data } : item)
                    : [...state.cartItems, data];

                // Update local storage and state
                StoreLocalStorage.setStoredCartId(data.cart.cartId);
                return { cartItems: newCartItems, cartId: data.cart.cartId };
            });
        } catch (error) {
            console.error('Failed to add item to cart:', error);
        }
    },

    updateCartItem: debounce(async (userId, cartId, cartItemId, updateData) => {
        try {
            const data = await CartService.updateCartItem(userId, cartId, cartItemId, updateData);
            set((state) => {
                const updatedCartItems = state.cartItems.map(item =>
                    item.cartItemId === cartItemId ? { ...item, ...data } : item
                );
                StoreLocalStorage.setStoredCartItems(updatedCartItems);
                return { cartItems: updatedCartItems };
            });
        } catch (error) {
            console.error('Failed to update cart item:', error);
        }
    }, 500),

    fetchCartItems: async (userId, cartId) => {
        try {
            const data = await CartService.findAllItemsInCart(userId, cartId);
            set({ cartItems: data, cartId });
        } catch (error) {
            console.error('Failed to fetch cart items:', error);
        }
    },


    removeCartItem: async (userId, cartId, cartItemId) => {
        try {
            await CartService.removeItemFromCart(userId, cartId, cartItemId);
            set((state) => ({
                cartItems: state.cartItems.filter(item => item.cartItemId !== cartItemId)
            }));
        } catch (error) {
            console.error('Failed to remove cart item:', error);
        }
    },
    clearCart: async () => {
        try {
            set({ cartItems: [], cartId: null });
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    }
}));

export default useCartStore;
