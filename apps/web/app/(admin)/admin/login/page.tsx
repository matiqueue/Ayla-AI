"use client";
import { useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
  <div>
    <div>Stronka do logowania admina</div>
    <form action="/api/admin-login" method="post">
      <h1> Podaj login: </h1><input type="text" name="login"/>
      <h1> Podaj hasło: </h1><input type="password" name="password"/>
      <button type="submit">Zaloguj się</button>
    </form>
    {error && <p style={{ color: "red" }}>Niepoprawny login lub hasło</p>}
  </div>
  )
}