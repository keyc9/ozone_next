import Link from "next/link";

export default function Second() {
  return (
<div>
  hi second <br />
  <Link href="/">home</Link> <br />
  <Link href="/second/1">Page 1</Link> <br />
  <Link href="/second/2">Page 2</Link> <br />
</div>
  );
}