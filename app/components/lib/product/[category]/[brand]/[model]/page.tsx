type ProductPageProps = {
  params: Promise<{
    category: string;
    brand: string;
    model: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const values = await params;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px",
        background: "#101b26",
        color: "white",
      }}
    >
      <h1>Product route is working</h1>

      <pre>
        {JSON.stringify(values, null, 2)}
      </pre>
    </main>
  );
}