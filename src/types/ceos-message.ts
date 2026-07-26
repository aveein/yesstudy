/**
 * Content shapes for `/about/ceos-message/` (Elementor page `5973`).
 * Populated by `scripts/extract-ceos-message.mjs` into `src/data/ceos-message.json`.
 */

/** A stretch of prose. `bold` reproduces the source's inline `<strong>`. */
export interface TextRun {
  text: string;
  bold: boolean;
}

export interface CeoBannerData {
  title: string;
  subtitle: string;
  /** `["Home", "/ CEO’s Message"]` — the separator is part of the second item upstream. */
  breadcrumb: string[];
}

export interface CeoBlockImage {
  src: string;
  alt: string;
  width: number | null;
  height: number | null;
}

export type CeoBlockLayout = "image-left" | "image-right" | "quote";

export interface CeoMessageBlockData {
  /** Elementor container id, kept for traceability back to the capture. */
  id: string;
  layout: CeoBlockLayout;
  background: "white" | "sky";
  /** Declared `--width` percentages at >=768px, `[first, second]` in DOM order. */
  columns: [number, number] | null;
  /** Column gap in px. */
  gap: number | null;
  /** Vertical margin on the section, in px (block 1 only). */
  marginY: number;
  /** Vertical padding on the centred content column, in px. */
  paddingY: number;
  image: CeoBlockImage | null;
  paragraphs: TextRun[][];
}

export interface CeosMessagePage {
  banner: CeoBannerData;
  blocks: CeoMessageBlockData[];
}
