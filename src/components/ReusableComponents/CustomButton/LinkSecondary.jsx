import Link from "next/link";
import React,{useState} from "react";

const LinkSecondary = (props) => {
  const { href, text, width, height, icon } = props;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Link
        href={href}
        className={`arial-bold tw-flex tw-border-2 tw-rounded-md tw-items-center tw-justify-center tw-gap-2`}
        style={{
          width: width,
          height: height,
          borderColor: isHovered ? "black" : "#BBBABF",
          color: isHovered ? "black" : "#BBBABF"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {icon ? (
          <div
            className={`tw-flex tw-justify-between tw-items-center tw-w-full`}
          >
            {text}
            {icon && <span style={{ marginLeft: "3px" }}>{icon}</span>}
          </div>
        ) : (
          <div
            className={`tw-flex tw-items-center tw-w-full tw-text-center tw-justify-center`}
          >
            {text}
          </div>
        )}
      </Link>
    </>
  );
};

export default LinkSecondary;
