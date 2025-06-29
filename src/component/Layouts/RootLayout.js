import { Button, Dropdown, Layout, Menu } from "antd";
import React from "react";
import style from "../../../styles/pcBuilder.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";
const { Header, Content, Footer } = Layout;
const categories = [
  "CPU / Processor",
  "Motherboard",
  "RAM",
  "Power Supply Unit",
  "Storage Device",
  "Monitor",
  "Others",
];

const RootLayout = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const handleCategoryClick = (e) => {
    const selectedCategory = e.key;
    const slug = selectedCategory.toLowerCase().replace(/[^a-z0-9]/g, "");
    router.push(`/products/${slug}`);
  };
  const handleReload = () => {
    router.push("/");
  };
  const linkDestination = session?.user ? "/pcbuilder" : "/login";
  const categoryMenu = (
    <Menu
      onClick={handleCategoryClick}
      items={categories.flatMap((cat, index) => {
        const items = [
          {
            key: cat,
            label: cat,
          },
        ];

        if (index < categories.length - 1) {
          items.push({ type: "divider" });
        }
        return items;
      })}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          position: "fixed",
          zIndex: "9999",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontWeight: "bold",
            fontFamily: "italic",
            fontSize: 20,
          }}
          onClick={() => {
            handleReload();
          }}
        >
          TechLand
        </div>
        <div>
          <Dropdown overlay={categoryMenu} trigger={["click"]}>
            <Button
              style={{
                backgroundColor: "transparent",
                color: "white",
                fontFamily: "italic",
                border: "none",
                fontSize: "18px",
              }}
            >
              Category
            </Button>
          </Dropdown>
          <Button className={style.pcBuilderButton}>
            <Link href={linkDestination}>PC Builder</Link>
          </Button>
        </div>
      </Header>
      <Content style={{ padding: "24px", marginTop: "50px" }}>
        {children}
      </Content>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
        }}
      >
        Techland ©{new Date().getFullYear()} develop by Shima
      </Footer>
    </Layout>
  );
};

export default RootLayout;
