import RootLayout from "@/src/component/Layouts/RootLayout";
import AllProducts from "@/src/component/UI/AllProducts";

export default function Home({ allProducts }) {
  return (
    <div>
      <AllProducts allProducts={allProducts}></AllProducts>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/data");
  const data = await res.json();
  return {
    props: {
      allProducts: data,
    },
  };
};
