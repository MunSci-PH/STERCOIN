export default function Page({ params }: { params: { slug: string } }) {
  return <div>Grade {params.slug}</div>;
}
