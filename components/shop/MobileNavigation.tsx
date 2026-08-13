"use client";

import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { scrollToPageTop, storefrontNavigation } from "./NavigationLinks";
import styles from "./storefront.module.css";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function closeOnOutsidePointer(event: PointerEvent) {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className={styles.mobileMenu} ref={containerRef}>
      <button
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        className={styles.mobileMenuButton}
        onClick={() => setOpen((current) => !current)}
        ref={buttonRef}
        type="button"
      >
        {open ? <X aria-hidden="true" size={24} strokeWidth={1.5} /> : <Menu aria-hidden="true" size={24} strokeWidth={1.5} />}
      </button>

      {open ? (
        <div className={styles.mobileMenuPanel} id="mobile-navigation">
          <nav aria-label="モバイルナビゲーション">
            {storefrontNavigation.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                onClick={(event) => {
                  scrollToPageTop(event);
                  setOpen(false);
                }}
              >
                {item.label}
                <ChevronRight aria-hidden="true" size={16} />
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
