
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VecchioAccediRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/entra"); }, [router]);
  return null;
}
