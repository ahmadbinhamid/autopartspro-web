import * as React from "react";
import { buttonClassName, type ButtonSize, type ButtonVariant } from "@/components/ui/button-styles";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", ...props },
  ref,
) {
  return <button ref={ref} className={buttonClassName({ variant, size, className })} {...props} />;
});

export type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

// A same-page anchor rendered with button styling — every CTA on this site
// links to an in-page section (#pricing, #features, the signup form) or the
// dashboard's own /login, never a client-routed page, so a plain <a> covers
// every case here without pulling in a router.
export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { className, variant = "primary", size = "md", ...props },
  ref,
) {
  return <a ref={ref} className={buttonClassName({ variant, size, className })} {...props} />;
});
