import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <p>Aby przejść dalej, wpisz kod licencyjny</p>
      <Link href="/create-licence">
        <button>Stwórz licencję</button>
      </Link>
      <Link href="/auth">
        <button>Podaj kod licencji</button>
      </Link>
    </div>
  );
}