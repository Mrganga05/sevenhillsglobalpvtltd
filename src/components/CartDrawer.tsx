import { X, Trash2, ShoppingCart, MessageCircle, Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getFallbackImage } from "../utils/productImages";
import { DEFAULT_PRODUCT_IMAGE } from "../constants/defaultImage";

export const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, items, removeItem, updateQuantity, clearCart } = useCart();

    if (!isCartOpen) return null;

    const generateWhatsAppLink = () => {
        let msg = "Hello Seven Hills Global, I would like to request a quote for the following items:\n\n";
        items.forEach((item, index) => {
            msg += `${index + 1}. ${item.product.name} - Qty: ${item.quantity}\n`;
        });
        return `https://wa.me/918500336668?text=${encodeURIComponent(msg)}`;
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-card border-l border-white/10 shadow-2xl z-[100] flex flex-col animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-background/50">
                    <div className="flex items-center gap-3">
                        <ShoppingCart className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-bold">Your Quote Cart</h2>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground opacity-70">
                            <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-lg font-bold mb-2">Your cart is empty</p>
                            <p className="text-sm">Add some products to request a global export quote.</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="mt-8 bg-primary/20 text-primary px-6 py-2 rounded-full font-bold text-sm hover:bg-primary/30 transition-colors"
                            >
                                Continue Browsing
                            </button>
                        </div>
                    ) : (
                        items.map((item) => {
                            const image = item.product.image_url || getFallbackImage(item.product.name) || DEFAULT_PRODUCT_IMAGE;
                            return (
                                <div key={item.product.id} className="flex gap-4 bg-background/50 border border-white/5 p-3 rounded-xl relative group">
                                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                        <img src={image} alt={item.product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <h3 className="font-bold text-sm sm:text-base line-clamp-1">{item.product.name}</h3>
                                            <p className="text-xs text-muted-foreground">{item.product.origin || 'India'}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-2 bg-black/20 rounded-lg border border-white/5 px-2 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.product.id)}
                                                className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                                                title="Remove Item"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer Actions */}
                {items.length > 0 && (
                    <div className="p-4 sm:p-6 border-t border-white/10 bg-background/80 backdrop-blur-md">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-muted-foreground">Total Items</span>
                            <span className="font-bold text-lg">{items.reduce((acc, curr) => acc + curr.quantity, 0)}</span>
                        </div>
                        <div className="space-y-3">
                            <a
                                href={generateWhatsAppLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsCartOpen(false)}
                                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-[#25D366]/20"
                            >
                                <MessageCircle className="w-5 h-5" /> Request Quote via WhatsApp
                            </a>
                            <button
                                onClick={clearCart}
                                className="w-full text-sm font-bold text-muted-foreground hover:text-white py-2 transition-colors"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
