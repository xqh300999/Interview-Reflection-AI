import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "答辩错题本",
  description: "把真实问答整理成可以反思、重答和长期复习的问题资产。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
