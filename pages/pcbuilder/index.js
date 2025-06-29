import RootLayout from "@/src/component/Layouts/RootLayout";
import {
  removeComponent,
  resetBuilder,
} from "@/src/component/redux/pcBuilderSlice";
import { generatePDFReport } from "@/src/component/Report/generatePDFReport";
import {
  faDownload,
  faGear,
  faPrint,
  faRefresh,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Divider, Row, Space } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

const BuildPC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedComponents = useSelector(
    (state) => state.pcBuilder.selectedComponents
  );

  const totalSelectedItem = Object.values(selectedComponents).filter(
    (items) => Array.isArray(items) && items.length > 0
  ).length;

  const categories = [
    "CPU / Processor",
    "Motherboard",
    "RAM",
    "Power Supply Unit",
    "Storage Device",
    "Monitor",
  ];

  const getCategoryIcon = (category) => {
    if (category.includes("CPU"))
      return <FontAwesomeIcon icon={faGear} style={{ fontSize: 30 }} />;
    if (category.includes("Motherboard"))
      return <FontAwesomeIcon icon={faGear} style={{ fontSize: 30 }} />;
    if (category.includes("RAM"))
      return <FontAwesomeIcon icon={faGear} style={{ fontSize: 30 }} />;
    if (category.includes("Power"))
      return <FontAwesomeIcon icon={faGear} style={{ fontSize: 30 }} />;
    if (category.includes("Storage"))
      return <FontAwesomeIcon icon={faGear} style={{ fontSize: 30 }} />;
    if (category.includes("Monitor"))
      return <FontAwesomeIcon icon={faGear} style={{ fontSize: 30 }} />;
  };

  const handleCategoryClick = (e) => {
    const selectedCategory = e;
    const slug = selectedCategory.toLowerCase().replace(/[^a-z0-9]/g, "");
    router.push(`/pcbuilder/${slug}`);
  };

  const totalCost = useSelector((state) => {
    const components = state.pcBuilder.selectedComponents;
    let total = 0;

    for (let category in components) {
      const items = components[category];

      if (Array.isArray(items)) {
        items.forEach((item) => {
          total += parseFloat(item.price) || 0;
        });
      } else if (items && items.price) {
        total += parseFloat(items.price) || 0;
      }
    }
    return total;
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
      <Row
        justify="space-between"
        align="middle"
        style={{
          backgroundColor: "white",
          padding: "16px",
        }}
      >
        <Col>
          <Space>
            <Button
              style={{
                backgroundColor: "transparent",
                border: "1px solid black",
                fontWeight: "bold",
              }}
            >
              Total TK {totalCost.toFixed(2)}
            </Button>
          </Space>
        </Col>
        <Col align="center">
          <h2 style={{ margin: 0, fontWeight: "bold", fontSize: "20px" }}>
            PC Builder
          </h2>
          <p>Select Your Components</p>
        </Col>

        <Col>
          <Space>
            <Button
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "50px",
                width: "80px",
                textAlign: "center",
                backgroundColor: "white",
                border: "1px solid #ddd",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // soft elegant shadow
                borderRadius: "8px",
              }}
              onClick={() => {
                generatePDFReport(selectedComponents);
              }}
            >
              <FontAwesomeIcon icon={faDownload} style={{ fontSize: "22px" }} />
              <span style={{ fontSize: "12px" }}>Download</span>
            </Button>

            <Button
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "50px",
                width: "80px",
                textAlign: "center",
                backgroundColor: "white",
                border: "1px solid #ddd",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              }}
            >
              <FontAwesomeIcon
                icon={faPrint}
                style={{
                  fontSize: "22px",
                  marginTop: "2px",
                  fontWeight: "bold",
                }}
              />
              <span style={{ fontSize: "12px" }}>Print</span>
            </Button>
          </Space>
        </Col>
      </Row>

      <Row
        style={{
          backgroundColor: "gray",
          padding: "8px",
          marginTop: "16px",
        }}
      >
        <Col span={24}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingRight: "25px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <p
                style={{
                  margin: 0,
                  fontWeight: "bold",
                  fontSize: "18px",
                  color: "white",
                }}
              >
                Your Build PC
              </p>
              <button
                style={{
                  fontWeight: "bold",
                  fontSize: "15px",
                  backgroundColor:
                    totalSelectedItem > 4 ? "black" : "lightgray",
                  padding: "6px",
                  border: "1px solid gray",
                  color: "white",
                  borderRadius: "5px",
                  cursor: totalSelectedItem > 4 ? "pointer" : "not-allowed",
                  opacity: totalSelectedItem > 4 ? 1 : 0.6,
                  letterSpacing:'0.3px'
                }}
                disabled={totalSelectedItem <= 4}
                onClick={() => {
                  swal("Done", "Your PC has been built successfully!", "success");
                }}
              >
                Complete Build
              </button>
            </div>

            <div>
              <FontAwesomeIcon
                style={{ fontSize: "24px", color: "white" }}
                icon={faRefresh}
                onClick={() => dispatch(resetBuilder())}
              />
            </div>
          </div>
        </Col>
      </Row>

      {categories.map((category, index) => {
        const selectedItem = selectedComponents[category];
        console.log(selectedItem);
        return (
          <div key={index} style={{ marginBottom: 0 }}>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: 0 }}
            >
              <Col span={24}>
                <Card
                  hoverable
                  bodyStyle={{ padding: "18px 16px" }} // less padding inside card
                  style={{
                    border: "1px solid #eee",
                    borderRadius: 0,
                    marginBottom: 0,
                  }}
                >
                  <Row justify="space-between" align="middle">
                    <Col>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        {getCategoryIcon(category)}
                        <h3 style={{ margin: 0 }}>{category}</h3>
                      </div>
                    </Col>
                    <Col>
                      <Button
                        style={{ background: "black", color: "white" }}
                        onClick={() => handleCategoryClick(category)}
                      >
                        Select
                      </Button>
                    </Col>
                  </Row>
                  {selectedItem?.length > 0 &&
                    selectedItem.map((item, index) => {
                      return (
                        <div key={index}>
                          <div
                            style={{
                              marginTop: "12px",
                              padding: "10px",
                              backgroundColor: "#f9f9f9",
                              border: "1px solid #ddd",
                              borderRadius: "6px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "12px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <Image
                                src={item.image_url}
                                alt={item.productName}
                                width={50}
                                height={50}
                                style={{
                                  borderRadius: "4px",
                                  border: "1px solid #ccc",
                                }}
                              />
                              <p style={{ margin: 0 }}>
                                <strong>{item.productName}</strong>
                              </p>
                            </div>

                            <Button
                              type="text"
                              danger
                              onClick={() =>
                                dispatch(
                                  removeComponent({
                                    category,
                                    id: item.id,
                                  })
                                )
                              }
                              style={{ backgroundColor: "transparent" }}
                            >
                              <FontAwesomeIcon
                                style={{ fontSize: "23px" }}
                                icon={faXmarkCircle}
                              ></FontAwesomeIcon>
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                </Card>
              </Col>
            </Row>
            {index !== categories.length - 1 && (
              <Divider style={{ margin: 0, borderColor: "black" }} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BuildPC;

BuildPC.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
