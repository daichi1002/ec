import OrderCompleteDetail from "@/components/OrderCompleteDetail";
import { Suspense } from "react";

export default function SuccessPage() {
  return (
    <Suspense>
      <OrderCompleteDetail />
    </Suspense>
  );
}
