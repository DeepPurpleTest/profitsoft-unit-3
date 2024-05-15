import useTheme from "../../misc/hooks/useTheme";
import SvgIcon from "../SvgIcon";
import React from "react";

const PageDown = ({
                  color = 'page',
                  size = 32,
              }) => {
    const { theme } = useTheme();
    const actualColor = theme.icon.color[color] || color;
    return (
        <SvgIcon
            style={{
                height: `${size}px`,
                width: `${size}px`,
            }}
            viewBox="0 0 24 24"
        >
            <path
                d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"
                fill={actualColor}
            />
        </SvgIcon>
    );
};

export default PageDown;