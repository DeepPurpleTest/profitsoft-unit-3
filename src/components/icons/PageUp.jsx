import useTheme from "../../misc/hooks/useTheme";
import SvgIcon from "../SvgIcon";
import React from "react";

const PageUp = ({
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
                d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"
                fill={actualColor}
            />
        </SvgIcon>
    );
};

export default PageUp;