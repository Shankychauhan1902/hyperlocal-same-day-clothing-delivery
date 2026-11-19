import { useMemo, useState } from "react";
import { products, categories } from "./data/products.js";
import ProductDetail from "./components/customer/ProductDetail.jsx";
import CartDrawer from "./components/customer/CartDrawer.jsx";
import CheckoutPage from "./components/customer/CheckoutPage.jsx";
import CustomerCatalog from "./components/customer/CustomerCatalog.jsx";
import CustomerHeader from "./components/customer/CustomerHeader.jsx";
import HeroSection from "./components/customer/HeroSection.jsx";
import BenefitsStrip from "./components/customer/BenefitsStrip.jsx";
import CustomerFooter from "./components/customer/CustomerFooter.jsx";
export default function App() {
  const [category, setCategory] = useState("Everything");
  const [size, setSize] = useState("Any size");
  const [pincode, setPincode] = useState("");
  const [service, setService] = useState("");
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [orderPreview, setOrderPreview] = useState(false);
  const [paymentMode, setPaymentMode] = useState("prepaid_upi");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });
  const [formMessage, setFormMessage] = useState("");

  const shown = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "Everything" || p.category === category) &&
          (size === "Any size" || p.sizes.includes(size)) &&
          (!query ||
            `${p.name} ${p.shop} ${p.category}`
              .toLowerCase()
              .includes(query.toLowerCase())),
      ),
    [category, size, query],
  );
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const deliveryFee = 49;
  const total = subtotal + deliveryFee;
  const canCheckout = subtotal >= 799;

  function checkZone(e) {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setService("Enter a valid 6-digit pincode.");
      return;
    }
    setService(
      `Khora Colony is our pilot area. We’ll confirm service for ${pincode} before checkout.`,
    );
  }
  function addToBag(product, chosen) {
    if (!chosen) return;
    setCart((current) => {
      const existing = current.find(
        (item) => item.product.id === product.id && item.size === chosen,
      );
      return existing
        ? current.map((item) =>
            item === existing ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...current, { product, size: chosen, quantity: 1 }];
    });
    setDetail(null);
    setCartOpen(true);
  }
  function changeQuantity(productId, chosen, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.product.id === productId && item.size === chosen
            ? { ...item, quantity: item.quantity + amount }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }
  function startCheckout() {
    if (!canCheckout) return;
    setCartOpen(false);
    setCheckout(true);
    setFormMessage("");
  }
  function reviewOrder(e) {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !/^\d{10}$/.test(form.phone) ||
      !form.address.trim() ||
      !/^\d{6}$/.test(form.pincode)
    ) {
      setFormMessage(
        "Please enter your name, 10-digit mobile number, complete address, and 6-digit pincode.",
      );
      return;
    }
    setFormMessage("");
    setOrderPreview(true);
  }
  function closeCheckout() {
    setCheckout(false);
    setOrderPreview(false);
  }

  if (checkout)
    return (
      <CheckoutPage
        cart={cart}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        total={total}
        paymentMode={paymentMode}
        setPaymentMode={setPaymentMode}
        form={form}
        setForm={setForm}
        message={formMessage}
        onSubmit={reviewOrder}
        onBack={closeCheckout}
        preview={orderPreview}
      />
    );

  return (
    <>
      <CustomerHeader bagCount={cart.reduce((count, item) => count + item.quantity, 0)} onOpenBag={() => setCartOpen(true)} />
      <main id="top">
        <HeroSection pincode={pincode} onPincodeChange={setPincode} onCheckZone={checkZone} service={service} />
        <BenefitsStrip />
        <CustomerCatalog
          products={shown}
          categories={categories}
          category={category}
          onCategoryChange={setCategory}
          query={query}
          onQueryChange={setQuery}
          size={size}
          onSizeChange={setSize}
          onProductSelect={(product) => {
            setDetail(product);
            setSelectedSize("");
          }}
        />
        <CustomerFooter />
      </main>
      {detail && (
        <ProductDetail
          product={detail}
          chosen={selectedSize}
          setChosen={setSelectedSize}
          onClose={() => setDetail(null)}
          onAdd={() => addToBag(detail, selectedSize)}
        />
      )}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
          canCheckout={canCheckout}
          onClose={() => setCartOpen(false)}
          onChange={changeQuantity}
          onCheckout={startCheckout}
        />
      )}
    </>
  );
}




