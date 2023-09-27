const ProductDetailPage = ({ products }) => {
  if (!products) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>{products.title}</h1>
      <p>{products.body}</p>
    </>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${productId}`
  );
  const data = await res.json();

  if (Object.keys(data).length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data,
    },
    revalidate: 15,
  };
}

const getAllProductId = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  return data;
};

export async function getStaticPaths() {
  const data = await getAllProductId();
  const ids = data.map((i) => i.id);

  const pathsWithParams = ids.map((id) => ({ params: { pid: `${id}` } }));
  return {
    paths: pathsWithParams,
    fallback: true,
  };
}

export default ProductDetailPage;
