import React from "react";

interface IconLinkProps {
  href: string;
  src: string;
  alt: string;
}

export const IconLink: React.FC<IconLinkProps> = ({ href, src, alt }) => {
  return (
    <a className="IconLink" href={href}>
      <img src={src} alt={alt} />
    </a>
  );
};
