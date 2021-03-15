import css from "@styled-system/css";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from "@reach/listbox";
import "@reach/listbox/styles.css";
import Box, { BoxProps } from "components/Box";
import { ReactComponent as ArrorwSVG } from "./assets/arrow.svg";
import type { VersionsInfo } from "./types";

const root = process.env.NEXT_PUBLIC_ROOT_DIR;

const Versions = ({
  current,
  latest,
  available,
  ...props
}: VersionsInfo & BoxProps) => {
  const router = useRouter();
  const [currentItem, setCurrentItem] = useState<string>(current);

  const versions = useMemo(() => [...available].reverse(), [available]);

  const navigateToVersion = useCallback(
    (version: string) => {
      const isLatest = version === latest;
      const href = `${root}/${isLatest ? "" : `ver/${version}`}`;

      setCurrentItem(version);
      router.push(href);
    },
    [latest]
  );

  useEffect(() => {
    setCurrentItem(current);
  }, [current]);

  return (
    <Box {...props}>
      <StyledListboxInput value={currentItem} onChange={navigateToVersion}>
        <StyledListboxButton arrow={<StyledArrow />} />
        <StyledListboxPopover>
          <ListboxList>
            {versions.map((title) => (
              <StyledListboxOption key={title} value={title}>
                Version {title}
              </StyledListboxOption>
            ))}
          </ListboxList>
        </StyledListboxPopover>
      </StyledListboxInput>
    </Box>
  );
};

export default Versions;

const StyledListboxInput = styled(ListboxInput)(
  css({
    display: "inline-flex",
    height: ["32px", "36px"],
    border: "1px solid",
    borderColor: ["white", "transparent"],
    borderRadius: "default",
    "&:hover, &:active, &:focus": {
      borderColor: "white",
    },
  })
);

const StyledListboxButton = styled(ListboxButton)(
  css({
    display: "flex",
    alignItems: "center",
    fontSize: ["text-md", "text-sm"],
    fontWeight: "bold",
    lineHeight: "lg",
    color: "white",
    border: "none",
    px: 2,
    "&:focus": {
      outline: "none",
    },
    "& [data-reach-listbox-arrow]": {
      width: "16px",
      height: "16px",
      mt: "-5px",
      ml: 3,
    },
  })
);

const StyledListboxPopover = styled(ListboxPopover)(
  css({
    p: 0,
    border: "none",
    borderRadius: "sm",
    boxShadow: "0 4px 16px rgba(0,0,0,.24) !important",
    "&:focus-within": {
      outline: "none",
    },
  })
);

const StyledListboxOption = styled(ListboxOption)(
  css({
    fontSize: "text-md",
    fontWeight: "bold",
    lineHeight: "40px",
    px: 3,
    "&:hover, &:focus, &:active, &[aria-selected='true']": {
      color: "black",
      bg: "lightest-gray",
    },
    "&[data-current]": {
      bg: "lightest-gray",
      color: "dark-purple",
    },
    "&:first-child": {
      borderTopLeftRadius: "sm",
      borderTopRightRadius: "sm",
    },
    "&:last-child": {
      borderBottomLeftRadius: "sm",
      borderBottomRightRadius: "sm",
    },
  })
);

const StyledArrow = styled(ArrorwSVG)(
  css({
    width: "16px",
    height: "16px",
  })
);
