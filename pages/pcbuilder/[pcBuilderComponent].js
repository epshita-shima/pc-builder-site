import RootLayout from "@/src/component/Layouts/RootLayout";
import { selectedComponent } from "@/src/component/redux/pcBuilderSlice";
import { Button, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const PCBuilderComponent = ({ category, pcBuilderData,categoryName }) => {
  const dispatch = useDispatch();
  const router=useRouter()


  const handleAddToBuild = (products) => {
    dispatch(
      selectedComponent({
        category:categoryName,
        component: products,
      })
    );
     router.push("/pcbuilder");
  };
  return (
    <Row gutter={[16, 24]}>
      {pcBuilderData?.map((products) => (
        <Col
          key={products.id}
          className="gutter-row"
          xs={24}
          sm={12}
          md={8}
          lg={6}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <Card
              hoverable
              style={{ flex: 1, display: "flex", flexDirection: "column" }}
              cover={
                <Image
                  src={products?.image_url}
                  width={500}
                  height={200}
                  alt="products image"
                  style={{ border: "1px solid lightgray", padding: "5px" }}
                ></Image>
              }
            >
              <Meta
                style={{
                  fontFamily: "italic",
                }}
                title={products?.productName}
              />
              <div
                className="line"
                style={{
                  height: "5px",
                  margin: "20px",
                  background: "#000",
                  margin: "20px 0",
                  width: "100%",
                }}
              ></div>
              <p
                style={{
                  fontFamily: "italic",
                  fontSize: "18px",
                  marginBottom: "4px",
                }}
              >
                Category: <span>{products?.category}</span>
              </p>
              <p
                style={{
                  fontFamily: "italic",
                  fontSize: "18px",
                  marginBottom: "4px",
                }}
              >
                Price: <span>{products?.price}</span>
              </p>
              <p
                style={{
                  fontFamily: "italic",
                  fontSize: "18px",
                  marginBottom: "4px",
                }}
              >
                Stock: <span>{products?.status}</span>
              </p>
              <p
                style={{
                  fontFamily: "italic",
                  fontSize: "18px",
                  marginBottom: "4px",
                }}
              >
                Rating: <span>{products?.rating}</span>
              </p>
              <Button
                style={{
                  fontSize: "15px",
                  marginTop: "20px",
                  backgroundColor: "black",
                  color: "white",
                  width: "100%",
                  fontWeight: "300",
                  letterSpacing: "3px",
                  padding: "2px 5px",
                  textAlign: "center",
                }}
                onClick={() => {
                  handleAddToBuild(products);
                }}
              >
                Add To Build
              </Button>
            </Card>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default PCBuilderComponent;

PCBuilderComponent.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const slug = params.pcBuilderComponent;
  const res = await fetch(`http://localhost:5000/data`);
  const data = await res.json();
  const categories = [...new Set(data.map((p) => p.category))];
  const slugToCategory = categories.reduce((acc, cat) => {
    acc[cat.toLowerCase().replace(/[^a-z0-9]/g, "")] = cat;
    return acc;
  }, {});
  const originalCategory = slugToCategory[slug];
  if (!originalCategory) {
    return { notFound: true };
  }
  const filtered = data.filter((p) => p.category === originalCategory);

  return {
    props: {
      categoryName: originalCategory,
      pcBuilderData: filtered,
    },
  };
};
