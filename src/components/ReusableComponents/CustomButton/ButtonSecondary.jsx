import React, {useState} from "react";
import {Button} from 'antd';

const ButtonSecondary = (props) => {
    const {
        onClick,
        text,
        width,
        height,
        size,
        icon
    } = props;

    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <Button
                onClick={onClick}
                className={`arial-bold tw-flex tw-border-2 tw-rounded-md tw-items-center tw-justify-center tw-gap-2 tw-text-[12px] sm:tw-text-[12px] md:tw-text-[14px] lg:tw-text-[16px] xl:tw-text-[16px] 2xl:tw-text-[18px] tw-px-3 tw-py-2`}
                style={{
                    width: width,
                    height: height,
                    // fontSize: size,
                    borderColor: isHovered ? "black" : "#BBBABF",
                    color: isHovered ? "black" : "#BBBABF",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {
                    icon ?
                        <div className={`tw-flex tw-items-center tw-justify-center tw-gap-2`}>
                            {text}
                            {icon && <span className="tw-flex tw-items-center">{icon}</span>}
                        </div>
                        :
                        <div className={`tw-flex tw-flex-row tw-items-center`}>
                            {text}
                        </div>
                }

            </Button>
        </>
    );
};

export default ButtonSecondary;
