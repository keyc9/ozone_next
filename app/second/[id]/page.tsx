import Link from "next/link";

export default async function ID({ params }: any) {
  const {id} = await params;

  return (
    <div>
      <br />
      <div>{id}</div> <br />
      <Link href="/second">home</Link>
    </div>
  );
}