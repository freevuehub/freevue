import { ImageResponse } from "@vercel/og";
import { COLOR_LIST, SECONDARY_COLOR } from "~/contant";

export const config = {
  runtime: "edge",
};
const font = fetch(new URL("../../assets/BMDOHYEON.ttf", import.meta.url)).then(
  (res) => res.arrayBuffer()
);
const [primary, secodary] = COLOR_LIST[new Date().getFullYear()];
const primaryRGB = `rgb(${primary.join(",")})`;
const SECONDARY_RGB = `rgb(${(secodary || SECONDARY_COLOR(primary)).join(
  ","
)})`;
const COLOR = {
  WHITE: "#ffffff",
  TEXT: "",
  BACKGROUND: "#f5f5f5",
};
const og = async (props: any) => {
  const fontData = await font;
  const image = props.nextUrl.searchParams.get("image");
  const title = props.nextUrl.searchParams.get("title");
  const desc = props.nextUrl.searchParams.get("desc");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          paddingTop: "60px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: primaryRGB,
          // backgroundImage: "url('http://localhost:3000/background.jpg')",
        }}
      >
        {image && (
          <img
            style={{
              width: "20rem",
              borderRadius: "100%",
              display: "flex",
              position: "absolute",
              left: "1rem",
              top: "1rem",
              transform: "rotate(-10deg)",
              opacity: 0.7,
            }}
            src={image}
            alt=""
          />
        )}
        <div
          style={{
            paddingLeft: "5rem",
            paddingBottom: "5rem",
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            background: "rgba(2, 2, 2, 0.2)",
          }}
        >
          <img
            style={{
              width: "27rem",
              display: "flex",
              position: "absolute",
              right: "-4rem",
              top: "-5rem",
              transform: "rotate(25deg)",
            }}
            src="https://og.freevue.dev/api/logo?size=100&style=border"
            alt=""
          />
          {title && (
            <h1
              style={{
                width: "70%",
                marginTop: "auto",
                lineHeight: "64px",
                color: COLOR.WHITE,
                fontSize: "60px",
                textAlign: "left",
                wordBreak: "keep-all",
              }}
            >
              {title}
            </h1>
          )}
          {desc && (
            <p
              style={{
                color: COLOR.WHITE,
                opacity: 0.7,
                fontSize: "20px",
                lineHeight: "20px",
              }}
            >
              {desc}
            </p>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "EliceDigitalBaeum-Bd",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
};

export default og;
