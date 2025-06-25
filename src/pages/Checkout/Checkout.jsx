import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/Pricing/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router";

const stripePromise = loadStripe(
  "pk_test_51QNQPaFPmJRV10EiF2wKlV4YGSWADVqOEhOwXgZlwnjLMIx7ClMqUSSoCtPCMw9D9tjqYJsPYb7LXp4MOTEMdX7T00DJi0E0c5"
);
function Checkout() {
  const { id } = useParams();

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm id={id} />
    </Elements>
  );
}

export default Checkout;
