"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ja">
      <body className="flex min-h-screen items-center justify-center bg-[#f7f3ea] px-5 text-[#292720]">
        <main className="max-w-lg text-center">
          <p className="font-semibold tracking-[0.2em] text-[#8f201c] uppercase">MOOR SPICE</p>
          <h1 className="font-display mt-4 text-4xl font-normal">エラーが発生しました</h1>
          <p className="mt-4 text-sm text-[#6f695d]">現在リクエストを完了できません。入力された情報がこのメッセージに表示されることはありません。</p>
          <button type="button" onClick={reset} className="mt-7 rounded bg-[#8f201c] px-6 py-3 text-sm font-bold text-white">もう一度試す</button>
        </main>
      </body>
    </html>
  );
}
